import { useRouter } from 'next/router'

const dummyListing = id => ({
  id,
  title: '68 Carter Drive',
  description: '',
  images: [
    {
      small: 'https://d2787ndpv5cwhz.cloudfront.net/9b98b6f61b730481d4f98aafe373f96f5a02845e/165x165.jpg',
      large: 'https://d2787ndpv5cwhz.cloudfront.net/9b98b6f61b730481d4f98aafe373f96f5a02845e/640x480.jpg'
    },
    {
      small: 'https://d2787ndpv5cwhz.cloudfront.net/1c00cf127dce36405467a2b4274947e2226d945e/165x165.jpg',
      large: 'https://d2787ndpv5cwhz.cloudfront.net/1c00cf127dce36405467a2b4274947e2226d945e/640x480.jpg'
    },
    {
      small: 'https://d2787ndpv5cwhz.cloudfront.net/600adfe187e74ba2c297effbed42f05531240f7f/165x165.jpg',
      large: 'https://d2787ndpv5cwhz.cloudfront.net/600adfe187e74ba2c297effbed42f05531240f7f/640x480.jpg'
    },
    {
      small: 'https://d2787ndpv5cwhz.cloudfront.net/964dda6fa18a61e2c8485f23cd969e051c592a81/165x165.jpg',
      large: 'https://d2787ndpv5cwhz.cloudfront.net/964dda6fa18a61e2c8485f23cd969e051c592a81/640x480.jpg'
    }
  ],
  address: {
    line1: '68 Carter Drive',
    country: 'USA',
    city: 'Framingham',
    state: 'MA',
    zipCode: '01701'
  },
  numOfBedrooms: '3',
  numOfBaths: '3',
  propertySize: '3,221',
  price: '$1,069,000',
  agent: {
    avatar: 'https://d2787ndpv5cwhz.cloudfront.net/0020fb051b1860bd2c6b5af620b74e2a04b64a3d/300x300.jpg',
    name: 'Kim Piculell',
    company: 'Compass',
    email: 'kim.piculell@compass.com',
    phone: '+1.617.480.3086'
  },
  floorPlans: [
    'https://d2787ndpv5cwhz.cloudfront.net/6fd199311de4fccde32c17ac86ac4fb5f16d1ac4/1500x1000.jpg',
    'https://d2787ndpv5cwhz.cloudfront.net/d7f900f823da8c71937cca3aac2cb30e2b76da18/1500x1000.jpg',
    'https://d2787ndpv5cwhz.cloudfront.net/b59fa1ddf8409a194a8d27e5385fe710306bb272/1500x1000.jpg'
  ],
  amenities: [
    'Washer / Dryer',
    'Forced Air',
    'Fence',
    'High Ceilings',
    'Central AC',
    'Deck',
    'Double Sink Bathroom',
    'Skylight'
  ],
  type: 'Sell'
})

/**
 * Get the listing context
 *
 * @returns {Object} the listing React context
 */
export default function useListing () {
  const { query } = useRouter()
  const loading = null
  const listing = dummyListing(query.listingId)

  return {
    listing,
    loading
  }
}
