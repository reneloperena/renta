import '../src/persistence/listing-enums'
import { createListingFileType, createListingStatus, createListingType, createTransactionType } from '../src/persistence/listing-enums'

async function seed () {
  await createListingType('APARTMENT')
  await createListingType('HOUSE')

  await createListingStatus('ACTIVE')
  await createListingStatus('INACTIVE')

  await createTransactionType('BUY')
  await createTransactionType('RENT')

  await createListingFileType('FLOORPLAN')
  await createListingFileType('IMAGE')
}