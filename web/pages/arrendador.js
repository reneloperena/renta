import withRoot from '../modules/withRoot'
// --- Post bootstrap -----
import React from 'react'
import AppFooter from '../views/AppFooter'
import ProductHowItWorks from '../modules/views/ProductHowItWorks'
import AppAppBar from '../modules/views/AppAppBar'

function Index () {
  return (
    <>
      <AppAppBar />
      <ProductHowItWorks />
      <AppFooter />
    </>
  )
}

export default withRoot(Index)
