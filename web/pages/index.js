import withRoot from '../modules/withRoot'
// --- Post bootstrap -----
import React from 'react'
import AppFooter from '../views/AppFooter'
import AppHero from '../views/AppHero'
import AppAppBar from '../modules/views/AppAppBar'

function Index () {
  return (
    <>
      <AppAppBar />
      <AppHero />
      <AppFooter />
    </>
  )
}

export default withRoot(Index)
