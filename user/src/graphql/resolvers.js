import { getUserById, getMe } from '../business-logic'
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
    me: (parent, args, context, info) => getMe(context.actor)
  },
  User: {
    __resolveReference: (reference) => getUserById(reference.id)
  },
  ConnectionCursor,
  ConnectionLimitInt,
  DateTime
}
