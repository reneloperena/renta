const R = require('ramda')

const { map, head, pipe, last, prop } = R

const getHeadCursor = pipe(head, prop('cursor'))
const getLastCursor = pipe(last, prop('cursor'))

export function createEdges (values) {
  return map(
    value => ({
      node: value,
      cursor: value.id
    }),
    values
  )
}

export function createPageInfo (edges, hasPreviousPage, hasNextPage) {
  return {
    hasPreviousPage,
    hasNextPage,
    startCursor: getHeadCursor(edges),
    endCursor: getLastCursor(edges)
  }
}
