import React from 'react'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}))

export default function OAuthError () {
  const classes = useStyles()
  const router = useRouter()

  return (
    <div className={classes.root}>
      {
        Object.entries(router.query).map(([key, value]) => <Alert key={key} severity='error'>{key} - {value}</Alert>)
      }
    </div>
  )
}
