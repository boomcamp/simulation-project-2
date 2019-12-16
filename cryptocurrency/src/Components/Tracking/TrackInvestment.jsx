import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import TrackBtn from './TrackBtn';
import TransactDate from './TransactDate';
import Sold from './Sold';

function TrackInvestment() {

  const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(2),
      alignItems: 'center',
    }
  }));

  const classes = useStyles();
  const [update, setUpdate] = useState(null);

  const updateFn = (e) => {
    setUpdate(e)
    setTransactionList({...transactionList, data: []})
  }
  const [transactionList, setTransactionList] = useState({
    columns: [
      {
        render: coinImgID => <img style={{width: 30, borderRadius: '50%'}} src={coinImgID.coinImage} alt={coinImgID.cryptoCurrency} />
      },
      {
        title: 'Coin',
        field: 'cryptoCurrency',
        render: rowName => <p style={{textTransform: 'capitalize'}}>{rowName.cryptoCurrency}</p>
      },
      {
        title: 'Coin Amount',
        field: 'cryptoCurrencyQty',
        render: rowAmount => <p>{rowAmount.cryptoCurrencyQty + " " +rowAmount.coinSymbol}</p>
      },
      {
        title: 'Price per Coin',
        field: 'cryptoCurrencyPrice',
        render: rowCryptoCurrencyPrice => 
          <NumberFormat 
            style={{
              color: '#00897b'
            }} 
            value={rowCryptoCurrencyPrice.cryptoCurrencyPrice}  
            displayType={'text'} 
            thousandSeparator={true} 
            prefix={'$'} 
          />
      },
      {
        title: 'Total Price',
        field: 'amount',
        render: 
          rowTotalPrice => 
            <NumberFormat 
              style={{
                color: '#ba0d0d'
              }} 
              value={rowTotalPrice.amount} 
              displayType={'text'} 
              thousandSeparator={true} 
              prefix={'$'} 
            />
      },
      {
        title: 'Transaction Date',
        field: 'transactionDate',
        render: rowDate => <TransactDate date={rowDate.transactionDate} />
      },
      {
        title: '',
        render: rowTrack => (rowTrack.type === 'buy') ? <TrackBtn updateFn={updateFn} transactionID={rowTrack.id} coinID={rowTrack.cryptoCurrency} /> : <Sold transactionData={rowTrack}/>
      }
    ],
    data: [],
  });

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:4000/transactions'
    })
    .then(response => {
      setTransactionList({
        ...transactionList,
        data: response.data
      })
    })
    .catch(error => console.log(error))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update])

  return (
    <React.Fragment>
      <Header />
      <Container maxWidth="xl" className={classes.paper}>
        <MaterialTable 
          columns={transactionList.columns}
          data={transactionList.data}
          title="List of Investments"
          options={{
            pageSize: 10
          }}
        />
      </Container>
    </React.Fragment>
  )
}

export default TrackInvestment  