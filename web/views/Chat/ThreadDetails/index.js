import React, { useEffect } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {
  Box,
  Divider,
  makeStyles
} from '@material-ui/core'
// import Toolbar from './Toolbar'
import Message from '../Message'
import MessageAdd from '../MessageAdd'
import useConversation from '../../../hooks/conversation/useConversation'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.dark
  }
}))

function ThreadDetails () {
  const classes = useStyles()
  const { conversation, loading } = useConversation(1)
  /*
  useEffect(() => {
    return startSubscription()
  })
  */
  return loading ? <div className={classes.root}>LOADING!</div> : (
    <div className={classes.root}>
      {/* <Toolbar thread={thread} /> */}
      <Divider />
      <Box
        flexGrow={1}
        p={2}
        component={PerfectScrollbar}
        options={{ suppressScrollX: true }}
      >
        {conversation.messages.edges.length > 0 && conversation.messages.edges.map(edge => (
          <Message
            key={edge.cursor}
            message={edge.node}
          />
        ))}
      </Box>
      <Divider />
      <MessageAdd conversation={conversation} />
    </div>
  )
}

export default ThreadDetails
