import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import useListing from '../../hooks/useListing'
import ListingSummary from './Summary'
import ImageCarousel from './ImageCarousel'
import AgentInfo from './AgentInfo'
import { Grid } from '@material-ui/core'
import AmenitiesList from './AmenitiesList'
const backgroundImage =
  '/fondo1.png'

const styles = (theme) => ({
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex'
  },
  button: {
    minWidth: 200
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10)
    }
  },
  more: {
    marginTop: theme.spacing(2)
  }
})

function Listing (props) {
  const { classes } = props
  const { listing, loading } = useListing()
  console.log(listing)
  return (
    <Grid container direction='column' alignItems='stretch' justify='center'>
      <Grid item>
        <ListingSummary listing={listing} />
      </Grid>
      <Grid item>
        <Grid container direction='row' alignItems='center' justify='center' spacing={2}>
          <Grid item>
            <ImageCarousel autoPlay={false} images={listing.images} />
          </Grid>
          <Grid item>
            <AgentInfo agent={listing.agent} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <AmenitiesList amenities={listing.amenities} />
      </Grid>
    </Grid>
  )
}

Listing.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Listing)
