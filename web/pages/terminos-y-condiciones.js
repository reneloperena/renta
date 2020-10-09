import withRoot from '../modules/withRoot'
// --- Post bootstrap -----
import React from 'react'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Markdown from '../components/Markdown'
import Typography from '../components/Typography'
import AppAppBar from '../modules/views/AppAppBar'
import terms from '../modules/views/terms.md'
import AppFooter from '../views/AppFooter'

function Terms () {
  return (
    <>
      <AppAppBar />
      <Container>
        <Box mt={7} mb={12}>
          <Typography variant='h3' gutterBottom marked='center' align='center'>
            Términos y Condiciones
          </Typography>
          <Markdown>{terms}</Markdown>
        </Box>
      </Container>
      <AppFooter />
    </>
  )
}

export default withRoot(Terms)
