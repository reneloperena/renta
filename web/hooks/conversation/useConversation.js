import { useQuery } from '@apollo/react-hooks'
import { getConversationById } from './queries.gql'
/*
import { messageAdded } from './subscriptions.gql'
import * as R from 'ramda'

const { path, lensPath, lensProp, compose, set, view, append } = R

const END_CURSOR_LENS = lensPath(['conversation', 'messages', 'pageInfo', 'endCursor'])
const EDGES_LENS = lensPath(['conversation', 'messages', 'edges'])
const EDGE_CURSOR_LENS = lensProp('cursor')

const appendNewMessageEdge = (newEdge, previous) => {
  console.log(`endCursor ${view(EDGE_CURSOR_LENS, newEdge)}`)
  console.log(`previousEdges ${view(EDGES_LENS, previous)}`)
  return compose(
    set(END_CURSOR_LENS, view(EDGE_CURSOR_LENS, newEdge)),
    set(EDGES_LENS, append(newEdge, view(EDGES_LENS, previous)))
  )(previous)
}
*/
/**
 * Get the listing context
 *
 * @returns {Object} the listing React context
 */
export default function useConversation (conversationId) {
  const { data, loading } = useQuery(getConversationById, {
    variables: {
      id: conversationId,
      last: 20,
      before: null
    }
  })

  /*
  const startSubscription = () => subscribeToMore({
    document: messageAdded,
    variables: {
      conversationId
    },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev
      const newMessageEdge = path(['data', 'messageAdded'], subscriptionData)
      return appendNewMessageEdge(newMessageEdge, prev)
    }
  })
  */
  const conversation = data && data.conversation

  return {
    conversation,
    loading
  }
}
