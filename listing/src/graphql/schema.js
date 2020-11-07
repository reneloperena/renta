import gql from 'graphql-tag'

export default gql`
  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: ConnectionCursor
    endCursor: ConnectionCursor
  }

  enum ListingType {
    APARTMENT
    HOUSE
  }

  enum ListingStatus {
    ACTIVE
    INACTIVE
  }

  enum TransactionType {
    BUY
    RENT
  }

  type Coordinates {
    latitude: Float!
    longitude: Float!
  }

  type ListingConnection {
    pageInfo: PageInfo!
    edges: [ListingEdge]
  }

  type ListingEdge {
    node: Listing!,
    cursor: ConnectionCursor!
  }

  type Address {
    line1: String!
    line2: String
    city: String!
    zipCode: Int!
    state: String!
    country: String!
    geo: Coordinates!
  }

  type ListingImage {
    small: String
    large: String
    default: String!
  }

  enum ListingFileType {
    FLOORPLAN
  }

  type ListingFile {
    file: String!
    type: ListingFileType! 
  }

  type Listing {
    id: ID!
    title: String!
    description: String!
    images: [ListingImage]!
    files: [ListingFile]!
    address: Address!
    numOfBedrooms: Int!
    numOfBaths: Int!
    propertySize: Int!
    price: Int!
    agent: User! @provides(fields: "id")
    listingType: ListingType!
    listingStatus: ListingStatus!
    transactionType: TransactionType!
  }

  extend type User @key(fields: "id") {
    id: ID! @external
    listings(first: Int, after: ConnectionCursor, last: Int, before: ConnectionCursor): ListingConnection!
    favorites(first: Int, after: ConnectionCursor, last: Int, before: ConnectionCursor): ListingConnection!
  }

  input EmailAgentListingInput {
    agentId: ID!
    message: String!
    listingId: ID!
  }

  input PriceFilter {
    min: Int!
    max: Int!
  }
  
  input BedroomsFilter {
    min: Int!
    max: Int!
  }

  
  input EnvelopeInput {
    maxLatitude: Float!
    minLatitude: Float!
    maxLongitude: Float!
    minLongitude: Float!
  }
  
  input ListingFilterInput {
    transactionType: TransactionType!
    listingType: ListingType
    bedrooms: BedroomsFilter
    price: PriceFilter
    envelope: EnvelopeInput
    address: String
  }

  scalar ConnectionCursor
  scalar ConnectionLimitInt
  scalar DateTime

  type Query {
    getGeocoding(address: String!): Coordinates!
    listings(filter: ListingFilterInput, first: Int, after: ConnectionCursor, last: Int, before: ConnectionCursor): ListingConnection!
  }
`


const dummy = ` 
  listing(id: ID!): Listing
  addToFavorite(id: ID!): Listing!
  emailAgentListing(input: EmailAgentListingInput!): Listing!
  host(id: ID!): User!
  me: User!
`