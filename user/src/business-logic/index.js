import * as R from 'ramda'
import {
  getUserById as getUserByIdDB
} from '../persistence'

export function getMe(actor) {
  return getUserById(actor.id)
}

export function getUserById (userId, actor) {
  return getUserByIdDB(userId)
}
