import withRoot from '../modules/withRoot'
// --- Post bootstrap -----
import React from 'react'
import AppFooter from '../views/AppFooter'
import Listing from '../views/Listing'
import AppAppBar from '../modules/views/AppAppBar'

function ListingPage () {
  return (
    <>
      <AppAppBar />
      <Listing />
      <AppFooter />
    </>
  )
}

export default withRoot(ListingPage)
