import knex from './db.js'
import * as R from 'ramda'

const { map, sortBy, compose, toLower, prop } = R

export async function getConversationMembers (conversationId) {
  const members = await knex('member')
    .where({ conversation_id: conversationId })

  return map(({ user_id: userId }) => ({ userId }), members)
}

export async function getMessages (conversationId, { first, last, after, before }) {
  if (first && last) {
    throw Error('could not resolve query with "first" and "last" values')
  }
  if (after && before) {
    throw Error('could not resolve query with "after" and "before" cursors')
  }

  const limit = first || last || 20
  const order = (last || before) ? 'desc' : 'asc'
  const cursor = after || before || null

  const messages = await (cursor ? knex('message')
    .where({ conversation_id: conversationId })
    .andWhere('id', order === 'desc' ? '<' : '>', cursor)
    .orderBy('id', order)
    .limit(limit) : knex('message')
    .where({ conversation_id: conversationId })
    .orderBy('id', order)
    .limit(limit))

  return sortBy(
    compose(toLower, prop('id')),
    map(({ id, conversation_id: conversationId, body, content_type: contentType, sender, sent_at: sentAt }) => ({ id, conversationId, body, contentType, sender, sentAt }), messages)
  )
}

export async function getConversationById (conversationId) {
  const [conversation] = await knex('conversation')
    .where({ id: conversationId })

  return {
    id: conversation.id,
    metadata: conversation.metadata
  }
}

export async function getConversations (userId) {
  const conversations = await knex.select('*').from('member').rightJoin('conversation', 'conversation.id', 'member.conversation_id').where({
    user_id: userId
  })
  return map(({ metadata, conversation_id: id }) => ({ metadata, id }), conversations)
}

export async function saveMessage (message) {
  const [{
    id,
    conversation_id: conversationId,
    body,
    content_type: contentType,
    sender,
    sent_at: sentAt
  }] = await knex.insert({
    conversation_id: message.conversationId,
    body: message.body,
    content_type: message.contentType,
    sender: message.sender
  })
    .into('message')
    .returning(['id', 'conversation_id', 'body', 'content_type', 'sender', 'sent_at'])

  return {
    id,
    conversationId,
    body,
    contentType,
    sender,
    sentAt
  }
}
