import { Kind, GraphQLScalarType } from 'graphql'
import moment from 'moment'

export const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'ISO-8601 compliant date and time value',
  serialize: value => moment(value).toISOString(),
  parseValue: value => moment(value).toDate(),
  parseLiteral (ast) {
    if (ast.kind === Kind.STRING) {
      return moment(ast.value).toDate()
    }
    return null
  }
})
