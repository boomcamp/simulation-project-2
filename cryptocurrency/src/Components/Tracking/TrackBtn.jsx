import React, { useState, useEffect } from 'react';
import { Button,Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog,DialogTitle,DialogContent,DialogActions } from '@material-ui/core';
import axios from 'axios';
import {Table,TableBody,TableCell,TableHead,TableRow} from '@material-ui/core';

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
  }));

  const classes = thisStyles();

  const [transactionData, setTransactionData] = useState({})

  const [coinData, setCoinData] = useState({})

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
    .then(() => {
      fetchingCoinDataFn(coinID)
    })
    .catch(error => console.log(error))
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchingCoinDataFn = (id) => {
    axios({
      method: 'GET',
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&order=market_cap_desc&per_page=1&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y`
    })
    .then(coinDataResponse => {
      setCoinData({
        ...coinData,
        fetchedCoinData: coinDataResponse.data  
      })
    })
    .catch(error => console.log(error))
  }

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <React.Fragment>
      <Button color='inherit' onClick={handleClickOpen} className={classes.buttonStyle}>
        Track
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.root}>
          Track
        </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="space-around" spacing={2}>                  
                  <Table className={classes.table} aria-label="transaction data table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">dsa</TableCell>
                        <TableCell align="right">asd</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
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
