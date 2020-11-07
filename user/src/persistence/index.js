import knex from './db.js'
import * as R from 'ramda'

const { map, sortBy, compose, toLower, prop } = R

export async function getUserById (userId) {
  const [ user ] = await knex('user')
    .where({ id: userId })

  return user
}
