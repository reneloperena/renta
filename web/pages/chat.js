import withRoot from '../modules/withRoot'
import withApollo from '../lib/withApollo'
// --- Post bootstrap -----
import React from 'react'
import AppFooter from '../views/AppFooter'
import Chat from '../views/Chat'
import AppAppBar from '../modules/views/AppAppBar'
function ChatPage () {
  return (
    <>
      <AppAppBar />
      <Chat />
      <AppFooter />
    </>
  )
}

export default withApollo()(withRoot(ChatPage))
