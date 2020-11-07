import knex, { st } from './db.js'
import * as R from 'ramda'

const { map, sortBy, toLower, prop, compose, apply } = R
/*
interface MinMaxFilter {
  min: number;
  max: number;
}

interface EnvelopeFilter {
  minLatitude: number;
  maxLatitude: number;
  minLongitude: number;
  maxLongitude: number;
}

interface ListingFilter {
  transactionType: string;
  listingType: string;
  bedrooms: MinMaxFilter;
  price: MinMaxFilter;
  envelope: EnvelopeFilter;
  address: string;
}
*/
export async function createListing (listing) {
  const [{
    id,
    title,
    description,
    num_of_bedrooms: numOfBeds,
    num_of_baths: numOfBaths,
    num_of_half_baths: numOfHalfBaths,
    property_size: propertySize,
    price,
    agent_id: agentId,
    listing_type: listingType,
    listing_status: listingStatus,
    transaction_type: transactionType,
    address_id: addressId,
    created_at: createdAt
  }] = await knex('listing').insert ({
    title: listing.title,
    description: listing.description,
    num_of_bedrooms: listing.numOfBeds,
    num_of_baths: listing.numOfBaths,
    num_of_half_baths: listing.numOfHalfBaths,
    property_size: listing.propertySize,
    price: listing.price,
    agent_id: listing.agentId,
    address_id: listing.addressId,
    listing_type: listing.listingType,
    listing_status: listing.listingStatus,
    transaction_type: listing.transactionType
  })
    .returning([
      'id',
      'title',
      'description',
      'num_of_bedrooms',
      'num_of_baths',
      'num_of_half_baths',
      'property_size',
      'price',
      'agent_id',
      'address_id',
      'listing_type',
      'listing_status',
      'transaction_type',
      'created_at'
    ])
  
  return {
    id,
    title,
    description,
    numOfBeds,
    numOfBaths,
    numOfHalfBaths,
    propertySize,
    price,
    agentId,
    listingType,
    listingStatus,
    transactionType,
    addressId,
    createdAt
  }
} 

export function createListingAmenities (listingId, amenities = []) {
    const listingAmenities = knex('listing_amenities').insert(map(amenity => ({
      amenity_id: amenity,
      listing_id: listingId
    }), amenities))
    .returning(['user_id', 'listing_id'])

  return map(({ user_id: userId, listing_id: listingId }) => ({ userId, listingId }), listingAmenities)
}

export function getFavoriteListings (userId, { first, last, after, before }) {
  if (first && last) {
    throw Error('could not resolve query with "first" and "last" values')
  }
  if (after && before) {
    throw Error('could not resolve query with "after" and "before" cursors')
  }

  const limit = first || last || 20
  const order = (last || before) ? 'desc' : 'asc'
  const cursor = after || before || null

  const listings = knex('favorite_listings')
    .rightJoin('listing', 'listing.id', 'favorite_listings.listing_id')
    .where({
      user_id: userId
    })
    .andWhere('id', order === 'desc' ? '<' : '>', cursor)
    .orderBy('id', order)
    .limit(limit)

  return sortBy(
    compose(toLower, prop('id')),
    map(({
      id,
      title,
      description,
      num_of_bedrooms: numOfBeds,
      num_of_baths: numOfBaths,
      num_of_half_baths: numOfHalfBaths,
      property_size: propertySize,
      price,
      agent_id: agentId,
      listing_type: listingType,
      listing_status: listingStatus,
      transaction_type: transactionType,
      address_id: addressId,
      created_at: createdAt
    }) => ({ 
      id,
      title,
      description,
      numOfBeds,
      numOfBaths,
      numOfHalfBaths,
      propertySize,
      price,
      agentId,
      listingType,
      listingStatus,
      transactionType,
      addressId,
      createdAt
     }), listings)
  )
}

export async function createFavoriteListing(userId, listingId) {
  const [favoriteListing] = await knex('favorite_listings').insert({
    user_id: userId,
    listing_id: listingId
  })
    .returning(['user_id', 'listing_id'])

  return {
    userId: favoriteListing.userId,
    listingId: favoriteListing.listingId
  }
}

export async function getListingById (listingId, actor) {
  const [{
      id,
      title,
      description,
      num_of_bedrooms: numOfBeds,
      num_of_baths: numOfBaths,
      num_of_half_baths: numOfHalfBaths,
      property_size: propertySize,
      price,
      agent_id: agentId,
      listing_type: listingType,
      listing_status: listingStatus,
      transaction_type: transactionType,
      address_id: addressId,
      created_at: createdAt
  }] = await knex('listing')
    .where({ id: listingId })
  
  return {
    id,
    title,
    description,
    numOfBeds,
    numOfBaths,
    numOfHalfBaths,
    propertySize,
    price,
    agentId,
    listingType,
    listingStatus,
    transactionType,
    addressId,
    createdAt
  } 
}

export async function getListings (filters, { first, last, after, before }) {
  if (first && last) {
    throw Error('could not resolve query with "first" and "last" values')
  }
  if (after && before) {
    throw Error('could not resolve query with "after" and "before" cursors')
  }

  const limit = first || last || 20
  const order = (last || before) ? 'desc' : 'asc'
  const cursor = after || before || null
  /*(cursor ? knex('listing')
    .leftJoin('address', 'address.id', 'listing.address_id')
    .where(query)
    .andWhere('id', order === 'desc' ? '<' : '>', cursor)
    .orderBy('id', order)
    .limit(limit) : 
    */
  const listings = await applyFilters(knex('listing')
    .leftJoin('address', 'address.id', 'listing.address_id'), filters)
    .orderBy('listing.id', order)
    // .limit(limit)

  console.log(listings)
  return sortBy(
    compose(toLower, prop('id')),
    map(({
      id,
      title,
      description,
      num_of_bedrooms: numOfBeds,
      num_of_baths: numOfBaths,
      num_of_half_baths: numOfHalfBaths,
      property_size: propertySize,
      price,
      agent_id: agentId,
      listing_type: listingType,
      listing_status: listingStatus,
      transaction_type: transactionType,
      address_id: addressId,
      created_at: createdAt
    }) => ({ 
      id,
      title,
      description,
      numOfBeds,
      numOfBaths,
      numOfHalfBaths,
      propertySize,
      price,
      agentId,
      listingType,
      listingStatus,
      transactionType,
      addressId,
      createdAt
     }), listings)
  )

}

function applyFilters (knexQuery, filter) {
  console.log(filter.envelope)
  return [
    (q, filter) => filter.envelope ? q.whereRaw('geo::geometry && ST_MakeEnvelope(?,?,?,?,0)', [filter.envelope.minLongitude, filter.envelope.minLatitude, filter.envelope.maxLongitude, filter.envelope.maxLatitude]) : q
    // q.where(st.boundingBoxIntersects(st.geometry('geo'), st.makeEnvelope(filter.envelope.minLongitude, filter.envelope.maxLongitude, filter.envelope.minLatitude, filter.envelope.maxLatitude))) : q
  ].reduce((acc, filterFunction) => filterFunction(acc, filter), knexQuery)
}

// q.whereRaw('geo::geometry && ST_MakeEnvelope(?,?,?,?,0)', [filter.envelope.minLongitude, filter.envelope.maxLongitude, filter.envelope.minLatitude, filter.envelope.maxLatitude]) : q