import withRoot from '../../modules/withRoot'
import withApollo from '../../lib/withApollo'
// --- Post bootstrap -----
import React from 'react'
import AppFooter from '../../views/AppFooter'
import ListingsView from '../../views/Listings'
import AppAppBar from '../../modules/views/AppAppBar'
function ListingsPage () {
  return (
    <>
      <AppAppBar />
      <ListingsView />
      <AppFooter />
    </>
  )
}

export default withApollo()(withRoot(ListingsPage))

