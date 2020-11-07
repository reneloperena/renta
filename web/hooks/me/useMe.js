import { useQuery } from '@apollo/react-hooks'
import { getMe } from './queries.gql'

export default function useConversation (conversationId) {
  const { data, loading } = useQuery(getMe, {})

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
  const me = data && data.me

  return {
    me,
    loading
  }
}
