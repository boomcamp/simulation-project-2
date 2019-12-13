import React from 'react'
import { Button } from '@material-ui/core'

function Sold(props) {
  console.log(props)
  return (
    <Button disabled={true} color="secondary">Sold for ${props.transactionData.sellPrice}(${props.transactionData.earned})</Button>
  )
}

export default Sold
