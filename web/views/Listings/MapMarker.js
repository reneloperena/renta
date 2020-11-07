import { map } from 'ramda'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import * as R from 'ramda'
import numeral from 'numeral'

const useStyles = makeStyles(theme => ({
  container: {
    bottom: 0,
    position: 'fixed'
  },
  bubbleContainer: {
      width: '100%'
  },
  bubble: {
      backgroundColor: theme.palette.secondary.main,
      border: '0.5px solid black',
      borderRadius: '10px',
      margin: '5px',
      padding: '10px',
      display: 'inline-block'
  }
}))

export default function MapMarker ({ listing }) {
  const classes = useStyles()
  return (
    <div className={classes.bubbleContainer}>
      <div className={classes.bubble}>
          <div className={classes.button}>{numeral(listing.price).format('($0.00a)')}</div>
      </div>
    </div>
  )
}