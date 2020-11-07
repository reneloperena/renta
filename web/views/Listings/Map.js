import { map } from 'ramda'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MapMarker from './MapMarker'
import GoogleMapReact from 'google-map-react'

const useStyles = makeStyles(theme => ({

}))

export default function Map ({ listings, latitude, longitude, changeBounds }) {
  const classes = useStyles()

  const center = {
    lat: parseFloat(latitude),
    lng: parseFloat(longitude)
  }

  return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDlcgdUdbzFey4o_0xxmNAFwtkAtvlqn2k" }}
        defaultZoom={15}
        center={center}
        yesIWantToUseGoogleMapApiInternals
        onChange={({ bounds }) => changeBounds({
          minLongitude: bounds.sw.lng,
          minLatitude: bounds.sw.lat,
          maxLongitude: bounds.ne.lng,
          maxLatitude: bounds.ne.lat
        })}
      >
        {
          map(listing => <MapMarker
              key={listing.id}
              listing={listing}
              lat={listing.address.geo.latitude}
              lng={listing.address.geo.longitude}
            />, listings)
        }
      </GoogleMapReact> 
  )
}