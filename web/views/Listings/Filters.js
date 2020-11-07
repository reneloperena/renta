import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
export default function ListingFilters (props) {
  const [ baths, setBaths ] = useState('1')

  return (
    <Grid container>
      <Grid item>
        <ToggleButtonGroup
          // className={classes.toggle}
          onChange={(e, v) => setBaths(v)}
          value={baths}
          exclusive aria-label='contained primary button group' // className={classes.h5}
        >
          <ToggleButton value='1' aria-label='compra'>1</ToggleButton>
          <ToggleButton value='2' aria-label='compra'>2</ToggleButton>
          <ToggleButton value='3' aria-label='compra'>3</ToggleButton>
          <ToggleButton value='3+' aria-label='renta'>3+</ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  )
}