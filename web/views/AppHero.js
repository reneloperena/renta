import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '../components/Typography'
import AppHeroLayout from './AppHeroLayout'
import { 
  ToggleButton,
  ToggleButtonGroup,
} from '@material-ui/lab'
import {
  TextField,
  Grid,
  Paper
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import Router from 'next/router'
import { getGeocoding } from '../hooks/listing/useGetGeocoding'
const backgroundImage = '/fondo1.png'

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center'
  },
  toggle: {
  },
  button: {
    minWidth: 200
  },
  searchBar: {
    padding: 6,
    minWidth: 400
  },
  block: {
    display: 'block',
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
  const [option, setOption] = React.useState('compra')
  const [input, setInput] = React.useState('')


  const keyPress = async e => {
    if(e.keyCode == 13){
      const { latitude, longitude } = await getGeocoding(input)
      Router.push(`/buscar/${option}?latitude=${latitude}&longitude=${longitude}`)
    }
  }

  const handleChangeInput = (e) => {
    setInput(e.target.value)
  }


  const handleOption = (event, newOption) => {
    setOption(newOption)
  }

  return (
    <AppHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: 'none' }} src={backgroundImage} alt='increase priority' />
      <Typography color='inherit' align='center' variant='h4' marked='center'>
        Encuentra tu nuevo hogar
      </Typography>
      <ToggleButtonGroup
        className={classes.toggle}
        onChange={handleOption}
        value={option}
        exclusive aria-label='contained primary button group' className={classes.h5}
      >
        <ToggleButton value='compra' aria-label='compra'>Compra</ToggleButton>
        <ToggleButton value='renta' aria-label='renta'>Renta</ToggleButton>
      </ToggleButtonGroup>
      <Paper elevation={1} className={classes.searchBar}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
          </Grid>
          <Grid item>
            <SearchIcon className={classes.block} color="inherit" />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              placeholder="Ciudad, Vecindario, Código Postal"
              onChange={handleChangeInput}
              onKeyDown={keyPress}
              InputProps={{
                disableUnderline: true,
                className: classes.searchInput,
              }}
            />
          </Grid>
        </Grid> 
      </Paper>

    </AppHeroLayout>
  )
}

AppHero.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AppHero)
