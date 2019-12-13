import React from 'react';
import { makeStyles } from '@material-ui/core/styles'; 
import { Button } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Sell(props) {
  const {transactionID,transactionData,earnedProfit,sellPrice,sellPricePerCoin} = props;
  const useStyles = makeStyles(theme => ({
    sellBtn: {
      width: '40%',
      fontWeight: 'bold',
      fontSize: '16px'
    }
  }))

  const classes = useStyles();

  const sellFn = () => {
    let tempData = transactionData;
    tempData.earned = earnedProfit
    tempData.sellPrice = sellPrice
    tempData.sellPricePerCoin = sellPricePerCoin
    tempData.type = 'sold'
    tempData.transactionDate = new Date().getTime()
    axios({
      method: 'PUT',
      url: `http://localhost:4000/transactions/${transactionID}`,
      data: tempData
    })
    .then(() => {
      toast.success(`Success! You Sold ${tempData.cryptoCurrencyQty} ${tempData.coinSymbol}`);
    }) 
    .catch(() => toast.error(`Error! Please try again!`))
  }

  return (
    <>
    {<ToastContainer enableMultiContainer position={toast.POSITION.BOTTOM_RIGHT} />}
    <Button className={classes.sellBtn} variant="contained" color="secondary" onClick={function(){props.close (sellFn())}}>Sell?</Button>
    </>
  )
}

export default Sell
