import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles'; 
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {FormControl, InputLabel, OutlinedInput, InputAdornment} from '@material-ui/core';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Buy(props) {
  const {coinName,coinPrice,coinSym,coinID,coinImage, coinSymbol} = props;

  const useStyles = makeStyles(theme => ({
    buyBtn: {
      width: '40%'
    },
    buySellDialog: {
      display: 'flex',
      justifyContent: 'space-around'
    },
    swapIcon: {
      margin: 'auto 2%'
    }
  }))

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [ exchangeVal, setExchangeVal ]  = useState('');

  const currencyExchange = (value) => {
    let converted = coinPrice * value;
    let transactionDate = new Date().getTime();
    setExchangeVal(converted);
    setTransactionData({
        ...transactionData,
        data: {
          type: 'buy',
          cryptoCurrencyQty: parseInt(value),
          amount: parseInt(converted),
          cryptoCurrency: coinID,
          coinSymbol: coinSymbol,
          coinImage: coinImage,
          cryptoCurrencyPrice: parseInt(coinPrice),
          transactionDate: transactionDate
        }
    })
  } 

  const [transactionData, setTransactionData] = useState({
    data: {}
  })

  const [wallet, setWallet] = useState({});

  useEffect(() => {
    let fetchedWallet = localStorage.getItem('wallet');
    if(fetchedWallet){
      let parsedWallet = JSON.parse(fetchedWallet)
      setWallet(parsedWallet)
    }else{
      var setItemWallet = {}
      localStorage.setItem('wallet', JSON.stringify(setItemWallet));
    }
  }, [])
  const buyCryptocurrencyFn = (value) => {
    if(exchangeVal === '' || exchangeVal <= 0){
      toast.error("Please Input Something")
    }else{
      axios({ 
        method: 'post',
        url: 'http://localhost:4000/transactions',
        data: transactionData.data,
        })
      .then(response => {
        if(wallet[coinID]){
          let newCoinBalance = wallet[coinID] + transactionData.data.cryptoCurrencyQty
          wallet[coinID] = newCoinBalance;
          localStorage.setItem('wallet', JSON.stringify(wallet))
        }else{
          wallet[coinID] = transactionData.data.cryptoCurrencyQty
          localStorage.setItem('wallet', JSON.stringify(wallet))
        }
        setOpen(false);
        toast.success(`Success! You Bought ${transactionData.data.cryptoCurrencyQty} ${coinName}`);
      })
      .catch(error => toast.error("Transaction Error, Please Try Again"))
    } 
  }

  return (
    <React.Fragment>
      {<ToastContainer enableMultiContainer position={toast.POSITION.BOTTOM_RIGHT} />}
      <Button className={classes.buyBtn} variant="contained" color="primary" onClick={handleClickOpen}>Buy</Button>
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth='md'
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Buy</DialogTitle>
            <DialogContent>
              <form className={classes.buySellDialog} noValidate>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-amount">{coinName}</InputLabel>
                  <OutlinedInput
                    id="cryptocoin"
                    type="number"
                    startAdornment={<InputAdornment position="start">{coinSym}</InputAdornment>}
                    labelWidth={80}
                    onChange={e => currencyExchange(e.target.value)}
                  />
                </FormControl>
                <SwapHorizIcon className={classes.swapIcon}/>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-amount">USD</InputLabel>
                  <OutlinedInput
                    id="usd"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    labelWidth={80}
                    value={exchangeVal}
                    readOnly={true}
                  />
                </FormControl>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={() => buyCryptocurrencyFn(exchangeVal)} color="primary" autoFocus>
                Buy
              </Button>
            </DialogActions>
        </Dialog>
    </React.Fragment>
  )
}

export default Buy
