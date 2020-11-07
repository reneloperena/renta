import { 
  createAddress as createAddressDB,
  getAddressById as getAddressByIdDB
} from '../persistence/address'

export function createAddress (address, actor) {
  // TODO: add some address validation and geo fetching
  return createAddressDB(address)
}

export function getAddressById (addressId, actor) {
  return getAddressByIdDB(addressId)
}