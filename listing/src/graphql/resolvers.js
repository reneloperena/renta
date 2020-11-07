import { getGeocoding } from '../business-logic/geocoding'
import { ConnectionCursor, ConnectionLimitInt } from './scalars/connection'
import { DateTime } from './scalars/date-time'
import { findListings } from '../business-logic/listing'
import { createEdges, createPageInfo } from '../utils/pagination'
import { getAddressById } from '../business-logic/address'

async function listingsResolver (parent, { first, last, after, before, filter}, context, info) {
  const messages = await findListings(filter, { first, last, after, before })
  const hasPreviousPage = false
  const hasNextPage = false
  const edges = createEdges(messages)

  return {
    edges,
    pageInfo: createPageInfo(edges, hasPreviousPage, hasNextPage)
  }
}


export default {
  Query: {
    getGeocoding: (parent, args, context, info) => getGeocoding(args.address, context.actor),
    listings: listingsResolver
  },
  Listing: {
    address: (parent, args, context, info) => getAddressById(parent.addressId, context.actor)
  },
  ConnectionCursor,
  ConnectionLimitInt,
  DateTime
}
