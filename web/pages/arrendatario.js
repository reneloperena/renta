import withRoot from '../modules/withRoot'
// --- Post bootstrap -----
import React from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '../components/Typography'
import AppAppBar from '../modules/views/AppAppBar'
import AppFooter from '../views/AppFooter'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.secondary.light,
    overflow: 'hidden'
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  section: {
    marginTop: theme.spacing(10),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5)
  },
  title: {
    marginBottom: theme.spacing(14)
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium
  },
  image: {
    height: 100,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  image2: {
    height: 200
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
    opacity: 0.7
  },
  button: {
    marginTop: theme.spacing(8)
  }
}))

function Arrendatario () {
  const classes = useStyles()

  return (
    <>
      <AppAppBar />
      <Container className={classes.container}>
        <Typography variant='h4' marked='center' className={classes.title} component='h2'>
          Abelord te ayuda a ti y a tus arrendatarios
        </Typography>
        <Typography variant='h5' marked='center' component='p' />
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <img
                  src='/why-cozy-free-up-time.svg'
                  alt='suitcase'
                  className={classes.image}
                />
                <Typography variant='h5' align='center'>
                  Te ayudamos a manejar todo desde la aplicación, nosotros nos preocupamos de aspectos legales, depósitos, publicidad, etc.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <img
                  src='/why-cozy-peace-of-mind.svg'
                  alt='graph'
                  className={classes.image}
                />
                <Typography variant='h5' align='center'>
                  Te conectamos con tus clientes. Para que estes informado de tódo lo que sucede con el departamento.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <img
                  src='/why-cozy-better-landlord.svg'
                  alt='clock'
                  className={classes.image}
                />
                <Typography variant='h5' align='center'>
                  Te ayudamos a ser un mejor arrendador y arrendatario, manejamos todos los documentos, fotos, pruebas, para que ambos terminen satisfechos.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
        <Container className={classes.section}>
          <div className={classes.item}>
            <img
              src='/why-cozy-show-off-your-place.svg'
              alt='suitcase'
              className={classes.image}
            />
            <Typography variant='h4' align='center'>
            Publíca tus rentas
            </Typography>
            <Typography variant='h5' align='center'>
            Nosotros te ayudamos a publicar tus rentas en distintos sitios, y mantenerte al tanto de potenciales arrendatarios.
            </Typography>
            <div className={classes.section}>
              <Grid
                container spacing={1}
                justify='center'
                alignItems='center'
              >
                <Grid item xs={12} md={6} align='right'>
                  <img
                    src='listings.png'
                    alt='clock'
                    className={classes.image2}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h5' align='left'>
                  Nosotros publicamos tu propiedad en buscadores como Trovit o inmuebles24, para aumentar su exposición.
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </div>
        </Container>
        <Container className={classes.section}>
          <div className={classes.item}>
            <img
              src='/contrato.png'
              alt='suitcase'
              className={classes.image}
            />
            <Typography variant='h4' align='center'>
            Despreocúpate por lo legal
            </Typography>
            <Typography variant='h5' align='center'>
            Nuestro equipo legal se encarga de redactar contratos y se firman en línea, para que ambos lados se encuentren protegidos en caso de un problema.
            </Typography>
          </div>
        </Container>
        <Container className={classes.section}>
          <div className={classes.item}>
            <img
              src='/why-cozy-track.svg'
              alt='suitcase'
              className={classes.image}
            />
            <Typography variant='h4' align='center'>
            Mantente organizado
            </Typography>
            <Typography variant='h5' align='center'>
            Una vez que comienza el periodo de renta, te ayudamos a comunicarte con tus arrendatarios.
            </Typography>
            <div className={classes.section}>
              <Grid
                container spacing={1}
                justify='center'
                alignItems='center'
              >
                <Grid item xs={12} md={6} align='right'>
                  <img
                    src='maintenance.png'
                    alt='clock'
                    className={classes.image2}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h5' align='left'>
                  Permitimos que tus arrendatarios soliciten servicios y se comuniquen contigo por medio de chat.
                  </Typography>
                </Grid>
              </Grid>
            </div>
            <div className={classes.section}>
              <Grid
                container spacing={1}
                justify='center'
                alignItems='center'
              >
                <Grid item xs={12} md={6} align='right'>
                  <img
                    src='expenses.png'
                    alt='clock'
                    className={classes.image2}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h5' align='left'>
                  Te permitimos registrar gastos, subir recibos utilizando tu celular, para manterte organizado y al tanto de todo lo que sucede en tu propiedad.
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </div>
        </Container>

        <Button
          color='secondary'
          size='large'
          variant='contained'
          className={classes.button}
          component='a'
          href='/crear-cuenta'
        >
          Empieza ahora!
        </Button>
      </Container>
      <AppFooter />
    </>
  )
}

export default withRoot(Arrendatario)
