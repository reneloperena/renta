import { getConversation, getConversations, getMessages, sendMessage, getMessageFeed } from '../business-logic'
import { createEdges, createPageInfo } from '../utils/pagination'
import { ConnectionCursor, ConnectionLimitInt } from './scalars/connection'
import { DateTime } from './scalars/date-time'
import { asyncIteratorMap } from '../utils/async'

async function messagesResolver (parent, args, context, info) {
  const messages = await getMessages(parent.id, args, context.actor)
  const hasPreviousPage = false
  const hasNextPage = false
  const edges = createEdges(messages)

  return {
    edges,
    pageInfo: createPageInfo(edges, hasPreviousPage, hasNextPage)
  }
}

export default {
  Query: {
    conversation: (parent, args, context, info) => getConversation(args.id, context.actor),
    conversations: (parent, args, context, info) => getConversations(context.actor)
  },
  Conversation: {
    messages: messagesResolver
  },
  Message: {
    sender: (parent, args, context, info) => ({ id: parent.sender })
  },
  Mutation: {
    sendMessage: (parent, args, context, info) => sendMessage(args.conversationId, args.message, context.actor)
  },
  /* Subscription: {
    messageAdded: {
      subscribe: (parent, args, context, info) => asyncIteratorMap(message => ({ messageAdded: { node: message, cursor: message.id } }), getMessageFeed(args.conversationId))
    }
  }, */
  ConnectionCursor,
  ConnectionLimitInt,
  DateTime
}
