import gql from 'graphql-tag'

export default gql`
  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: ConnectionCursor
    endCursor: ConnectionCursor
  }

  type User @key(fields: "id") {
    id: ID!
    name: String!
    email: String!
    avatar: String!
  }

  type Query {
    me: User
  }

  scalar ConnectionCursor
  scalar ConnectionLimitInt
  scalar DateTime
`
