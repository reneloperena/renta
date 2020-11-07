import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { withStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import AppBar from '../../components/AppBar'
import Button from '../../components/Button'
import Toolbar, { styles as toolbarStyles } from '../../components/Toolbar'
import { signIn, signOut, useSession } from 'next-auth/client'

const styles = (theme) => ({
  title: {
    fontSize: 24
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between'
  },
  left: {
    flex: 1
  },
  leftLinkActive: {
    color: theme.palette.common.white
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3)
  },
  linkSecondary: {
    color: theme.palette.secondary.main
  }
})

function AppAppBar (props) {
  const { classes } = props

  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} />
          <Link
            variant='h6'
            underline='none'
            color='inherit'
            className={classes.title}
            href='/'
          >
            {'Abelord'}
          </Link>
          <div className={classes.right}>
            <Button
              className={classes.rightLink}
              onClick={signIn}
            >
              {'Iniciar Sesión'}
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  )
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AppAppBar)
