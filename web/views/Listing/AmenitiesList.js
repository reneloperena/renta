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

function AmenitiesList (props) {
  const { classes, amenities } = props

  return (
    <Grid
      container className={classes.container}
      direction='column'
      alignItems='center'
      justify='center'
    >
      <Grid item>
        <Typography color='inherit' align='center' variant='h4' component='h3' marked='center'>
        Amenidades
        </Typography>
      </Grid>
      <Grid
        container
        item
        direction='row'
        justify='center'
        alignItems='center'
      >
        {amenities.map((amenity, i) =>
          <Grid key={i} item xs={6}>
            <Typography color='inherit' align='center' variant='h5' component='p'>
              {amenity}
            </Typography>
          </Grid>)}
      </Grid>
    </Grid>
  )
}

AmenitiesList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AmenitiesList)
