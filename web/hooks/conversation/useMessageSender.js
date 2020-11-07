import { useMutation } from '@apollo/react-hooks'
import { sendMessage } from './mutations.gql'
/**
 * Get the listing context
 *
 * @returns {Object} the listing React context
 */
export default function useMessageSender ({ onError, onCompleted }) {
  const [sendMessageMutation] = useMutation(sendMessage, {
    onError,
    onCompleted
  })

  return sendMessageMutation
}
