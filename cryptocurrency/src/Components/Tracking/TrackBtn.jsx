import React, { useState, useEffect } from 'react';
import { Button,Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog,DialogTitle,DialogContent,DialogActions } from '@material-ui/core';
import axios from 'axios';
import {Table,TableBody,TableCell,TableHead,TableRow} from '@material-ui/core';
import Sell from './Sell';

function TrackBtn(props) {
  const { coinID, transactionID } = props;

  const thisStyles = makeStyles(theme => ({
    buttonStyle: {
      textTransform: 'capitalize',
      fontWeight: 'bold',
      '&:hover': {
        background: '#00897b',
        color: '#ffffff',
        fontWeight: 'bold'
      }
    },
    table: {
      margin: 'auto',
      width: '50%',
    },
    tableCell: {
      textAlign: 'center'
    },
    profit: {
      margin: '3% auto'
    },
    earn: {
      fontSize: '20px'
    }
  }));

  const classes = thisStyles();

  const [transactionData, setTransactionData] = useState({})

  const [coinData, setCoinData] = useState({})

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios({
      method: 'GET',
      url: `http://localhost:4000/transactions/${transactionID}`
    })
    .then(transactionResponse => {
      setTransactionData({
        ...transactionData, 
        fetchedTransactionData: transactionResponse.data
      })
    })
    .catch(error => console.log(error))
    fetchingCoinDataFn(coinID)
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const fetchingCoinDataFn = (id) => {
    axios({
      method: 'GET',
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&order=market_cap_desc&per_page=1&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y`
    })
    .then(coinDataResponse => {
      setCoinData({
        ...coinData,
        fetchedCoinData: coinDataResponse.data[0]  
      })
    })
    .catch(error => console.log(error))
  }

  const computePriceFn = (e) => {
    let qty = transactionData.fetchedTransactionData && transactionData.fetchedTransactionData.cryptoCurrencyQty;
    let total = e * qty
    return parseInt(total.toFixed(2));
  }

  const profitPercentageFn = () => {
    let oldPrice = transactionData.fetchedTransactionData && transactionData.fetchedTransactionData.cryptoCurrencyPrice;
    let newPrice = coinData.fetchedCoinData && coinData.fetchedCoinData.current_price;
    let total = newPrice - oldPrice;
    let percentage = total / oldPrice * 100
    return percentage.toFixed(2);
  }

  const profitFn = () => {
    let oldPrice = transactionData.fetchedTransactionData && transactionData.fetchedTransactionData.cryptoCurrencyPrice;
    let newPrice = coinData.fetchedCoinData && coinData.fetchedCoinData.current_price;
    let total = newPrice - oldPrice;
    return total.toFixed(2)
  }

  const earnloseFn = (e) => {
    if(e < 0){
      return "You will lose"
    }else if(e > 0){
      return "You will earn"
    }else{
      return "You will earn nothing"
    }
  }

  const sellFn = () => {
    let tempData =  transactionData.fetchedTransactionData;
    tempData.earned = profitFn()
    tempData.sellPrice = computePriceFn(coinData.fetchedCoinData && coinData.fetchedCoinData.current_price)
    tempData.sellPricePerCoin = coinData.fetchedCoinData && coinData.fetchedCoinData.current_price
    tempData.type = 'sold'
    tempData.transactionDate = new Date().getTime()
    axios({
      method: 'PUT',
      url: `http://localhost:4000/transactions/${transactionID}`,
      data: tempData
    })
    .then(() => {
       setOpen(false);
    })
    .then(()=>props.updateFn(transactionID)) 
    .catch(() => {
      setOpen(false);
    })
  }

  return (
    <React.Fragment>
      <Button color='inherit' onClick={handleClickOpen} className={classes.buttonStyle}>
        Track
      </Button>
      <Dialog
        maxWidth='md'
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.root}>
        <span style={{textTransform: 'capitalize', fontWeight: 600}}>{transactionData.fetchedTransactionData && transactionData.fetchedTransactionData.cryptoCurrency}</span>
        </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>                  
                  <Table className={classes.table} aria-label="transaction data table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Date Purchased</TableCell>
                        <TableCell align="right"><span style={{textTransform: 'capitalize', fontWeight: 600}}>{transactionData.fetchedTransactionData && transactionData.fetchedTransactionData.cryptoCurrency}</span> Quantity</TableCell>
                        <TableCell align="right">Old Price per {coinData.fetchedCoinData && coinData.fetchedCoinData.name}</TableCell>
                        <TableCell align="right">Total when Purchased</TableCell>
                        <TableCell align="right">Price now per {coinData.fetchedCoinData && coinData.fetchedCoinData.name}</TableCell>
                        <TableCell align="right">Sell Price</TableCell>
                        <TableCell align="right">Profit</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">{new Date(transactionData.fetchedTransactionData && transactionData.fetchedTransactionData.transactionDate).toLocaleString()}</TableCell>
                        <TableCell align="right">{transactionData.fetchedTransactionData && transactionData.fetchedTransactionData.cryptoCurrencyQty} {transactionData.fetchedTransactionData && transactionData.fetchedTransactionData.coinSymbol}</TableCell>
                        <TableCell align="right">${transactionData.fetchedTransactionData && transactionData.fetchedTransactionData.cryptoCurrencyPrice}</TableCell>
                        <TableCell align="right">${transactionData.fetchedTransactionData && transactionData.fetchedTransactionData.amount}</TableCell>
                        <TableCell align="right">${coinData.fetchedCoinData && coinData.fetchedCoinData.current_price}</TableCell>
                        <TableCell align="right">${computePriceFn(coinData.fetchedCoinData && coinData.fetchedCoinData.current_price)}</TableCell>
                        <TableCell align="right"><span style={{color: (profitPercentageFn() < 0) ? 'red' : (profitPercentageFn() === 0) ? 'blue' :'green'}}>{profitPercentageFn()}%</span></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
              <Grid className={classes.profit} item xs={12} md={6} lg={3}>
                <Grid container justify="center" spacing={2}>
                  <p className={classes.earn}>
                    {earnloseFn(profitPercentageFn())} &nbsp;
                    <span style={{color: (profitPercentageFn() < 0) ? 'red' : (profitPercentageFn() === 0) ? 'blue' :'green'}}>
                      ${Math.abs(profitFn())}
                    </span>                   
                  </p>
                </Grid>
                <Grid container justify="center" spacing={2}>
                  <Sell 
                    key="sellBtn" 
                    sellFire={sellFn}
                  />
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="inherit">
              Close
            </Button>
          </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default TrackBtn
