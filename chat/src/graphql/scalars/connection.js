import { Kind, GraphQLScalarType } from 'graphql'

const toCursor = (value) => (value ? Buffer.from(String(value)).toString('base64') : null)
const fromCursor = (cursor) => (cursor ? Buffer.from(cursor, 'base64').toString('utf8') : null)

const MAX_LIMIT = 50

/**
 * @description Adjusts value to be between 1 and MAX_LIMIT, inclusive
 * @private
 * @param {Number|undefined} value value to check
 * @returns {Number|undefined} parsed value
 */
function parseValue (value) {
  if (value === undefined || isNaN(value)) return undefined
  if (typeof value !== 'number') return MAX_LIMIT
  return Math.min(Math.max(1, value), MAX_LIMIT)
}

export const ConnectionCursor = new GraphQLScalarType({
  description: `
    An opaque string that identifies a particular result within a connection,
    allowing you to request a subset of results before or after that result.
  `,
  name: 'ConnectionCursor',
  serialize: toCursor,
  parseLiteral (ast) {
    if (ast.kind === Kind.INT) return fromCursor(String(ast.value))
    if (ast.kind === Kind.STRING) return fromCursor(ast.value)
    return null
  },
  parseValue: fromCursor
})

export const ConnectionLimitInt = new GraphQLScalarType({
  description: `
    An integer between 1 and ${MAX_LIMIT}, inclusive. Values less than 1 become 1 and
    values greater than ${MAX_LIMIT} become ${MAX_LIMIT}.
  `,
  name: 'ConnectionLimitInt',
  serialize: (value) => value,
  parseLiteral (ast) {
    if (ast.kind !== Kind.INT) return MAX_LIMIT
    return parseValue(parseInt(ast.value, 10))
  },
  parseValue
})

export const typeDef = `
  scalar ConnectionCursor
  scalar ConnectionLimitInt
`

export const resolvers = {
  ConnectionCursor,
  ConnectionLimitInt
}
