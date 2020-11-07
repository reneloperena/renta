import { ApolloServer } from 'apollo-server'
import { ApolloGateway } from '@apollo/gateway'
import config from '../config'
const gateway = new ApolloGateway({
  serviceList: [
    { name: 'listing', url: 'http://localhost:3005'},
    { name: 'user', url: 'http://localhost:3004'},
    { name: 'chat', url: 'http://localhost:3003'}
  ]
})

const server = new ApolloServer({
  gateway,
  subscriptions: false
})

server.listen({
  port: config.PORT
}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
})