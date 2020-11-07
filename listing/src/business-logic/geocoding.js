import { Client } from '@googlemaps/google-maps-services-js'
 
const client = new Client()
export async function getGeocoding(address, actor) {
  try {
  const result = await client.geocode({ params: {
    address,
    components: 'country:mx',
    key: process.env.GOOGLE_MAPS_API_KEY
  }})
  const { lat, lng } = result.data.results[0].geometry.location
  return {
    latitude : lat,
    longitude : lng
  }
} catch (err) {
  throw Error('Place not found')
}
}