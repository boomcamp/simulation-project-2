import React from 'react';
import { makeStyles } from '@material-ui/core/styles'; 
import { Button } from '@material-ui/core';

function Sell(props) {
  const useStyles = makeStyles(theme => ({
    sellBtn: {
      width: '40%',
      fontWeight: 'bold',
      fontSize: '16px'
    }
  }))

  const classes = useStyles();

  return (
    <>
    <Button 
      className={classes.sellBtn} 
      variant="contained" 
      color="secondary" 
      //onClick={function(){props.close (sellFn())}}
      onClick={() => props.sellFire()}
    >Sell?</Button>
    </>
  )
}

export default Sell
