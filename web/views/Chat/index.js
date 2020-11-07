import React from 'react'
import { makeStyles } from '@material-ui/core'
import ThreadDetails from './ThreadDetails'
// import ThreadNew from './ThreadNew'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    display: 'flex',
    overflow: 'hidden',
    position: 'relative'
  }
}))

function ChatView () {
  const classes = useStyles()

  return (
    <>
      <ThreadDetails />
    </>
  )
}

export default ChatView
