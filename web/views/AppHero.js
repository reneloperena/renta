import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '../components/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Typography from '../components/Typography'
import AppHeroLayout from './AppHeroLayout'

const backgroundImage =
  '/fondo1.png'

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center'
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

function AppHero (props) {
  const { classes } = props

  return (
    <AppHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: 'none' }} src={backgroundImage} alt='increase priority' />
      <Typography color='inherit' align='center' variant='h2' marked='center'>
        Rentar una propiedad nunca fue tan fácil.
      </Typography>
      <Typography color='inherit' align='center' variant='h5' className={classes.h5}>
        En
      </Typography>
      <ButtonGroup variant='contained' color='secondary' aria-label='contained primary button group' className={classes.h5}>
        <Button
          href='/arrendatario'
        >Arrendatario
        </Button>
        <Button
          href='/arrendador'
        >Arrendador
        </Button>
      </ButtonGroup>
    </AppHeroLayout>
  )
}

AppHero.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AppHero)
