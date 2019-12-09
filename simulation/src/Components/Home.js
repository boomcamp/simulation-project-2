import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import NumberFormat from 'react-number-format';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'; 


import Nav from './Nav';
import Coin from './Coin';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    inDepth:{
      
      "&:hover":{
        color:'blue',
        fontSize: '20px'
      }
    }

  }),
);

export default function MaterialTableDemo() {
  const classes = useStyles();
  const [coin, setCoin] = useState(false)
  const [id, setid] = useState("")
  const [state, setState] = React.useState({
    columns: [
      { title: '#', field: 'market_cap_rank', 
      cellStyle: {
        textAlign: 'center', 
      },
      headerStyle: {
        textAlign: 'right',
      } 
      },

      { title: 'Coin', field: 'image', 
        render: row => <img src={row.image} alt={row.id} style={{width: 40, borderRadius: '50%'}}/>,  
        cellStyle: {
          textAlign: 'right',
        },
        headerStyle: {
          textAlign: 'right',
        } 
      },

      { field: 'name',

        render: row => <span className={classes.inDepth} id = {row.id} onClick={e => toggle(e)} > {row.name} </span>,
        cellStyle: {
          textAlign: 'left',
        },
        headerStyle: {
          textAlign: 'right',
        } 
      },

      { title: 'Symbol', field: 'symbol'},

      { title: 'Current Price ', field: 'current_price',
        cellStyle: {
          color: '#408ce3',
          textAlign: 'right',
     
        },
        render: row =>
          <NumberFormat 
            value={row.current_price} 
            displayType={'text'} 
            thousandSeparator={true} 
            prefix={'$'} 
            decimalScale='2'
          />,
      },

      { title: '1hr', field: 'price_change_percentage_1h_in_currency', 
        render: row => 
          <NumberFormat 
            value={row.price_change_percentage_1h_in_currency} 
            displayType={'text'}  
            decimalScale='2'
            suffix={'%'}   
            style={{
              color: row.price_change_percentage_1h_in_currency > 0 ? 'green' : 'red'
            }}
          />,
      },

      { title: '24hr', field: 'price_change_percentage_24h_in_currency', 
        render: row => 
          <NumberFormat 
            value={row.price_change_percentage_24h_in_currency} 
            displayType={'text'}  
            decimalScale='2'
            suffix={'%'}     
            style={{
              color: row.price_change_percentage_24h_in_currency > 0 ? 'green' : 'red'
            }}
          />,
      },

      { title: '7d', field: 'price_change_percentage_7d_in_currency', 
        render: row => 
          <NumberFormat 
            value={row.price_change_percentage_7d_in_currency} 
            displayType={'text'}  
            decimalScale='2'
            suffix={'%'}     
            style={{
              color: row.price_change_percentage_7d_in_currency > 0 ? 'green' : 'red'
            }}
          />,
      },

      { title: '24h Volume', field: 'total_volume',
        cellStyle: {
          color: '#408ce3',
          textAlign: 'right'
        },
        render: row => 
          <NumberFormat 
            value={row.total_volume} 
            displayType={'text'}  
            thousandSeparator={true}
            prefix={'$'}  
          /> 
      },

      { title: 'Circulating Supply', field: 'circulating_supply',
        render: row => 
          <NumberFormat 
            value={row.circulating_supply} 
            displayType={'text'}  
            thousandSeparator={true} 
            decimalScale='2'
          /> 
      },

      { title: 'Mkt Cap', field: 'market_cap',
        render: row => 
          <NumberFormat 
            value={row.market_cap} 
            displayType={'text'}  
            thousandSeparator={true} 
            prefix={'$'} 
           /> 
      },

    ],
    data: []
  });

  useEffect(() => {
    submitUserData()
  },[]);

  const submitUserData = () =>{
    axios({
      method: 'get',
      url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d'
    })
    .then( response =>  {
      setState({
        ...state,
        data: response.data 
      })
    })
    .catch(err=>{
      console.log('err');

    })
  }
 

  const toggle = (e) => {
    setCoin(true)
    setid(e.target.id)
  }

  return (
    <React.Fragment>
        <Nav/> 
        <br/>
        <CssBaseline />
            <Container maxWidth="xl" style={{display: coin ? "none" : null}}>
                <MaterialTable
                title="Home"
                columns={state.columns}
                data={state.data}
                options={{
                  cellStyle: {
                    textAlign: 'right',
                  },
                  headerStyle: {
                    textAlign: 'right',
                  } 
                }}
                />
            </Container>
            {coin ? <Coin id={id}/> : null }  
    </React.Fragment>   
  );
}