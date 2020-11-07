import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import useListings from '../../hooks/listing/useListings'
import UIMap from './Map'
import Grid from '@material-ui/core/Grid'
import { Container } from '@material-ui/core'
import ListingCard from './ListingCard'
import ListingFilters from './Filters'
const styles = (theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  flexSection: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%'
  },
  flexColScroll: {
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%'
  }
})



function Listing (props) {
  const { classes } = props
  const [ envelope, setEnvelope ] = React.useState({})
  const router = useRouter()
  const { latitude, longitude, type } = router.query
  const { listings } = useListings({
    envelope: envelope,
    transactionType: 'RENT'
  })

  return (
    <Container className={classes.root}>
      <ListingFilters />
      <Grid container direction='row'>
        <Grid item xs={6} className={classes.flexColScroll}>
          { listings.map(listing => <ListingCard listing={listing} />) }
        </Grid>
        <Grid item xs={6} style={{ height: '60vh'}}>
          <UIMap
            latitude={latitude}
            longitude={longitude}
            changeBounds={setEnvelope}
            listings={listings || []}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

Listing.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Listing)

