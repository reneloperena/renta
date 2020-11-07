import gql from 'graphql-tag'

export default gql`
  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: ConnectionCursor
    endCursor: ConnectionCursor
  }

  type MessageConnection {
    pageInfo: PageInfo!
    edges: [MessageEdge]
  }

  type MessageEdge {
    node: Message,
    cursor: ConnectionCursor!
  }

  type Message {
    body: String!
    contentType: String!
    sender: User! @provides(fields: "id")
    sentAt: DateTime!
  }

  type Conversation {
    id: ID!
    members: [User]! @provides(fields: "id")
    messages(first: Int, after: ConnectionCursor, last: Int, before: ConnectionCursor): MessageConnection!
  }

  input MessageInput {
    body: String!
    contentType: String!
  }

  type Query {
    conversation(id: ID!): Conversation
    conversations: [Conversation]!
  }

  type Mutation {
    sendMessage(conversationId: ID!, message: MessageInput!) : Message!
  }

  extend type User @key(fields: "id") {
    id: ID! @external
  }

  scalar ConnectionCursor
  scalar ConnectionLimitInt
  scalar DateTime
`

/*
  type Subscription {
    messageAdded(conversationId: ID!): MessageEdge
  }
  */
