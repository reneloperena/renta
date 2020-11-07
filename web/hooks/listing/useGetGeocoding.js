import { useQuery } from '@apollo/react-hooks'
import { getGeocoding as getGeocodingQuery } from './queries.gql'
import { globalApolloClient } from '../../lib/withApollo'
/**
 * Get the listing context
 *
 * @returns {Object} the listing React context
 */
export default function useGetGeocoding (address) {
  const { data, loading } = useQuery(getGeocodingQuery, {
    variables: {
      address
    }
  })

  const coordinates = data && data.getGeocoding

  return {
    address,
    coordinates,
    loading
  }
}

export function getGeocoding (address) {
  return new Promise((resolve, reject) => {
    useQuery(getGeocodingQuery, {
      variables: { address },
      onCompleted: data => resolve(data && data.getGeocoding),
      onError: error => reject(error)
    })
  })
}