import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '../../components/Typography'
import ImageCarousel from './ImageCarousel'

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

function SummaryProperty ({ title, caption }) {
  return <Grid
    container
    direction='column'
  >
    <Grid item>
      <Typography variant='h5' component='p'>
        {title}
      </Typography>
    </Grid>
    <Grid item>
      <Typography variant='h5' component='p'>
        {caption}
      </Typography>
    </Grid>
  </Grid>
}

function ListingSummary (props) {
  const { classes, listing } = props

  return (
    <Container className={classes.container}>
      <Grid container direction='column'>
        <Grid item s>
          <Typography color='inherit' align='center' variant='h4' component='h1' marked='center'>
            {listing.title}
          </Typography>
        </Grid>
        <Grid item s>
          <Typography color='inherit' align='center' variant='h5' component='h2' marked='center'>
            {listing.address.city}, {listing.address.state} {listing.address.zipCode}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
      >
        <Grid item xs>
          <SummaryProperty title={listing.price} caption='Precio' />
        </Grid>
        <Grid item xs>
          <SummaryProperty title={listing.numOfBedrooms} caption='Recámaras' />
        </Grid>
        <Grid item xs>
          <SummaryProperty title={listing.numOfBaths} caption='Baños' />
        </Grid>
        <Grid item xs>
          <SummaryProperty title={listing.propertySize} caption='Sq. Ft.' />
        </Grid>
      </Grid>
    </Container>
  )
}

ListingSummary.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ListingSummary)
