import { useQuery } from '@apollo/react-hooks'
import { getListings } from './queries.gql'
import * as R from 'ramda'

const { map } = R

export default function useListings ({
  envelope: {
    minLatitude,
    minLongitude,
    maxLatitude,
    maxLongitude
  },
  transactionType
}) {
  const { data, loading } = useQuery(getListings, {
    variables: {
      minLongitude,
      minLatitude,
      maxLongitude,
      maxLatitude
    }
  })

  const listings = map(
    listingEdge => listingEdge.node,
    data && data.listings && data.listings.edges || []
  )

  return {
    listings,
    loading
  } 
}