import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import axios from 'axios';

function TrackInvestment() {

  const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(2),
      alignItems: 'center',
    }
  }));

  const classes = useStyles();

  const [transactionList, setTransactionList] = useState({
    columns: [
      {
        title: 'Coin',
        field: 'coin'
      },
      {
        title: 'Coin Held',
        field: 'value'
      },
      {
        title: 'Total Amount'
      },
      {
        render: rowTrackBtn => <btn>Track</btn>
      }
    ],
    data: [
      {
        coin: 'bitcoin',
        value: 1
      }
    ],
  });
  console.log(transactionList)
  const [coinData, setCoinData] = useState([])

  const [wallet, setWallet] = useState({});

  const fetchWalletAndTransaction = () => {
    let tempWalletArr = [];
    let fetchedWallet = localStorage.getItem('wallet');
    let parsedWallet = JSON.parse(fetchedWallet);
    //setWallet(parsedWallet)
    tempWalletArr.push(parsedWallet)
    let temp = tempWalletArr[0]
    console.log(temp)
    // setTransactionList({
    //   ...transactionList, 
    //   data: temp
    // })

    axios
    .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false')
    .then(response => {
      let tempResponseData = response.data;
      let tempCoinDetails = [];
      for(let matchCoin of tempResponseData){
        for(let coinName in tempWalletArr[0]){
          if(matchCoin.id === coinName){
            tempCoinDetails.push(matchCoin)
          }
        }
      }
      setCoinData(tempCoinDetails)
    })

    // axios
    // .get('http://localhost:4000/transactions/')
    // .then(response => {
    //   setTransactionList({
    //     ...transactionList,
    //     data: response.data
    //   })
    // })
  }

  useEffect(() => {
    fetchWalletAndTransaction();
  }, [])

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
