import { PubSub } from 'apollo-server'
/*
 * This is currently not suitable for horizontal scaling of this microservice
 * we need to implement this PubSub interface with a persistence layer which will
 * allow us to publish the changes across the multiple nodes.
 * We could do this using RabbitMQ, Kafka, Redis, etc.
 * Read https://www.apollographql.com/docs/apollo-server/data/subscriptions/#pubsub-implementations
 * for a list of different implementations of this interface
 */

const MESSAGE_ADDED = 'MESSAGE_ADDED'
export const getMessageAddedTopic = conversationId => `${MESSAGE_ADDED}#${conversationId}`

const pubsub = new PubSub()

export default pubsub
