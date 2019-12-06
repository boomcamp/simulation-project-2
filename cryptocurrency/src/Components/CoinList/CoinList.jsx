import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import Header from '../Header/Header';
import Image from './Image';
import MaterialTable from 'material-table';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CoinLink from './CoinLink';

function CoinList() {
  
  const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(2),
      alignItems: 'center',
    },
    linkStyle: {
      textDecoration: 'none'
    }
  }));

  const classes = useStyles();

  const [coinList, setCoinList] = useState({
    columns: [
      { 
        title: 'Rank', 
        field: 'market_cap_rank'
      },
      { 
        title: '', 
        field: 'image', 
        render: rowImage => <Image url={rowImage.image} alt={rowImage.id}/> },
      { 
        title: 'Coin', 
        field: 'id',
        render: rowCoin => <CoinLink coinDetailsFnProps={coinDetailsFn} name={rowCoin.name} id={rowCoin.id} />
      },
      { 
        title: 'Symbol', 
        field: 'symbol'},
      { 
        title: 'Current Price', 
        field: 'current_price', 
        render: rowCurPrice => <NumberFormat value={rowCurPrice.current_price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
      },
      { 
        title: 'Lowest in 24hr', 
        field: 'low_24h', 
        render: rowLowPrice => <NumberFormat value={rowLowPrice.low_24h} displayType={'text'} thousandSeparator={true} prefix={'$'} />
      },
      { 
        title: 'Highest in 24hr', 
        field: 'high_24h', 
        render: rowHighPrice => <NumberFormat value={rowHighPrice.high_24h} displayType={'text'} thousandSeparator={true} prefix={'$'} />
      },
      { 
        title: '1h', 
        field: 'price_change_percentage_1h_in_currency', 
        render: row1h => <NumberFormat style={{color: (row1h.price_change_percentage_1h_in_currency < 0) ? 'red' : '#00897b'}} value={row1h.price_change_percentage_1h_in_currency} displayType={'text'} decimalScale={1} />
      },
      { 
        title: '24h', 
        field: 'price_change_percentage_24h_in_currency', 
        render: row24h => <NumberFormat style={{color: (row24h.price_change_percentage_24h_in_currency < 0) ? 'red' : '#00897b'}} value={row24h.price_change_percentage_24h_in_currency} displayType={'text'} decimalScale={1} />}
        ,
      { 
        title: '7d', 
        field: 'price_change_percentage_7d_in_currency', 
        render: row7d => <NumberFormat style={{color: (row7d.price_change_percentage_7d_in_currency < 0) ? 'red' : '#00897b'}} value={row7d.price_change_percentage_7d_in_currency} displayType={'text'} decimalScale={1} />
      },
      { 
        title: '30d', 
        field: 'price_change_percentage_30d_in_currency', 
        render: row30d => <NumberFormat style={{color: (row30d.price_change_percentage_30d_in_currency < 0) ? 'red' : '#00897b'}} value={row30d.price_change_percentage_30d_in_currency} displayType={'text'} decimalScale={1} />
      },
      { 
        title: '1y', 
        field: 'price_change_percentage_1y_in_currency', 
        render: row1y => <NumberFormat style={{color: (row1y.price_change_percentage_1y_in_currency < 0) ? 'red' : '#00897b'}} value={row1y.price_change_percentage_1y_in_currency} displayType={'text'} decimalScale={1} />
      },
      { 
        title: 'Circulating Supply', 
        field: 'circulating_supply', 
        render: rowCircSupply => <NumberFormat value={rowCircSupply.circulating_supply} decimalScale='2' displayType={'text'} thousandSeparator={true} />
      },
      { 
        title: 'Market Cap', 
        field: 'market_cap', 
        render: rowMarketCap => <NumberFormat value={rowMarketCap.market_cap} displayType={'text'} thousandSeparator={true} prefix={'$'} />
      },
    ],
    data: [],
  });

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y'
    })
    .then(response => {
      let tempData = response.data;
      setCoinList({
        ...coinList,
        data: tempData
      })
    })
    console.log("Check")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const coinDetailsFn = (e) => {
    console.log(e)
  }
  
  return(
    <React.Fragment>
      <Header />
      <Container maxWidth="xl" className={classes.paper}>
        <MaterialTable 
          columns={coinList.columns}
          data={coinList.data}
          title="Cryptocurrency list"
          options={{
            pageSize: 10, 
            //search: false
          }}
        />
      </Container>
    </React.Fragment>
  )
}

export default CoinList
