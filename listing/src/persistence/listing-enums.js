import knex from './db.js'

export function createAmenity (amenity) {
  const [{
    id
  }] = await knex.insert({
    id: amenity
  })
    .into('amenity')
    .returning(['id'])
  return id
}

export function createListingType (listingType) {
  const [{
    id
  }] = await knex.insert({
    id: listingType,
  })
    .into('listing_type')
    .returning(['id'])

  return id
}

export function createListingStatus (listingStatus) {
  const [{
    id
  }] = await knex.insert({
    id: listingStatus
  })
    .into('listing_status')
    .returning(['id'])
    
  return id
}

export function createTransactionType (transactionType) {
  const [{
    id
  }] = await knex.insert({
    id: transactionType
  })
    .into('transaction_type')
    .returning(['id'])

  return id
}

export function createListingFileType (fileType) {
  const [{
    id
  }] = await knex.insert({
    id: fileType
  })
    .into('file_type')
    .returning(['id'])

  return id
}