import { createAddress } from '../business-logic/address'
import { getGeocoding } from './geocoding'
import {
  createListing as createListingDB,
  createListingAmenities as createListingAmenitiesDB,
  getListingById as getListingByIdDB,
  getListings as getListingsDB
} from '../persistence/listing'

export async function createListing (listing = {}, actor) {
  const address = listing.address
  const { id : addressId } = await createAddress(address, actor)

  const { id : listingId } = await createListingDB({ 
    ...address,
    addressId
   })

  await createListingAmenitiesDB(listingId, listing.amenities)

  return getListingByIdDB(listingId, actor)
}

export async function findListings (filter, pagination, actor) {
  if (!filter.envelope && !filter.address) {
    throw new Error('Cannot find listings without location')
  }

  const { bounds } = filter.envelope ?
    filter : (await getGeocoding(filter.address))
  
  // query database based on bounds and filters
  return getListingsDB(filter, pagination)
}