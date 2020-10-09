import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import Typography from '../components/Typography'
import TextField from '../components/TextField'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import InstagramIcon from '@material-ui/icons/Instagram'

function Copyright () {
  return (
    <>
      {'© '}
      <Link color='inherit' href='/'>
        Abelord
      </Link>{' '}
      {new Date().getFullYear()}
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.secondary.light
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex'
  },
  iconsWrapper: {
    height: 120
  },
  icons: {
    display: 'flex'
  },
  icon: {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.warning.dark
    }
  },
  list: {
    margin: 0,
    listStyle: 'none',
    padding: 0
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5)
  },
  language: {
    marginTop: theme.spacing(1),
    width: 150
  }
}))

export default function AppFooter () {
  const classes = useStyles()

  return (
    <Typography component='footer' className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction='column'
              justify='flex-end'
              className={classes.iconsWrapper}
              spacing={2}
            >
              <Grid item className={classes.icons}>
                <FacebookIcon className={classes.icon} />
                <TwitterIcon className={classes.icon} />
                <InstagramIcon className={classes.icon} />
              </Grid>
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant='h6' marked='left' gutterBottom>
              Legal
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link href='/terminos-y-condiciones'>Términos y condiciones</Link>
              </li>
              <li className={classes.listItem}>
                <Link href='/aviso-de-privacidad'>Aviso de Privacidad</Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant='h6' marked='left' gutterBottom>
              Ayuda
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link href='/faq'>Preguntas Frecuentes</Link>
              </li>
              <li className={classes.listItem}>
                <Link href='/contacto'>Contacto</Link>
              </li>
              <li className={classes.listItem}>
                <Link href='/quienes-somos'>¿Quiénes somos?</Link>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  )
}
