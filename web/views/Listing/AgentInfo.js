import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '../../components/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import ImageCarousel from './ImageCarousel'

const styles = (theme) => ({
  root: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
})

function AgentInfo (props) {
  const { classes, agent } = props

  return (
    <Card className={classes.root}>
      <CardContent>
        <Avatar src={agent.avatar} alt={agent.name} />
        <Typography variant='h5' component='h2'>
          {agent.name}
        </Typography>
        <Typography className={classes.title} color='textSecondary' gutterBottom>
          {agent.company}
        </Typography>
        <Typography variant='body2' component='p'>
          Correo: {agent.email}
          <br />
          Teléfono: {agent.phone}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color='secondary' size='small'>Contactar</Button>
      </CardActions>
    </Card>
  )
}

AgentInfo.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AgentInfo)
