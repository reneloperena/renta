import * as R from 'ramda'
import {
  getConversations as getConversationsDB,
  getConversationById as getConversationByIdDB,
  getConversationMembers as getConversationMembersDB,
  getMessages as getMessagesDB,
  saveMessage
} from '../persistence'
import pubsub, { getMessageAddedTopic } from '../persistence/pubsub'

const { find, propEq, complement, isNil } = R
const isNotNil = complement(isNil)

export async function getConversations (actor) {
  const conversations = await getConversationsDB(actor.id)
  return conversations
}

export async function getConversation (conversationId, actor) {
  const conversation = await getConversationByIdDB(conversationId, actor.id)
  return conversation
}

export async function getMessages (conversationId, query, actor) {
  /*
  if (await isConversationMember(conversationId, actor) !== true) {
    throw new Error('actor is not a conversation member')
  }
  */
  const messages = await getMessagesDB(conversationId, query)

  return messages
}

export function getMessageFeed (conversationId) {
  return pubsub.asyncIterator([getMessageAddedTopic(conversationId)])
}

export async function isConversationMember (conversationId, actor) {
  const members = await getConversationMembersDB(conversationId)

  return isNotNil((find(propEq('userId', actor.id), members)))
}

export async function sendMessage (conversationId, message, actor) {
  /*
  if (await isConversationMember(conversationId, actor) !== true) {
    throw new Error('actor is not a conversation member')
  }
  */
  const sentMessage = await saveMessage({ conversationId, sender: actor.id, ...message })
  pubsub.publish(getMessageAddedTopic(conversationId), sentMessage)
  return sentMessage
}
