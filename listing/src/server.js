import { ApolloServer } from 'apollo-server'
import { buildFederatedSchema } from '@apollo/federation'
import typeDefs from './graphql/schema'
import resolvers from './graphql/resolvers'
import config from '../config'

const server = new ApolloServer({
  schema: buildFederatedSchema({
    typeDefs,
    resolvers
  }),
  context: ({ req }) => ({
    actor: { id: '1' }
  })
})

server.listen({ port: config.PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
