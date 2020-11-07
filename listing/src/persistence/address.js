import knex, { st } from './db'

export async function createNewAddress (address) {
  const [{
    id,
    line1,
    line2,
    city,
    zip_code: zipCode,
    state,
    country,
    geo
  }] = await knex('address').insert({
    line1: address.line1,
    line2: address.line2,
    city: address.city,
    zipCode: address.zipCode,
    state: address.state,
    country: address.country,
    geo: st.makePoint(address.geo.longitude, address.geo.latitude)
  })
    .returning([
      'id',
      'line1',
      'line2',
      'city',
      'zipCode',
      'state',
      'country',
      'geo'
    ])
  return {
    id,
    line1,
    line2,
    city,
    zipCode,
    state,
    country,
    geo
  }
}

export async function getAddressById (addressId) {
  const [address] = await knex('address')
    .where({ id: addressId })

  console.log(address)
  return {
    ...address,
    geo: {
      longitude: address.geo.x,
      latitude: address.geo.y
    },
    zipCode: address.zip_code
  }
}