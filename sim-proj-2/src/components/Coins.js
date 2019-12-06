import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import axios from 'axios'
import Chart from './Chart.js';

export default function Coins() {
  const [state, setState] = useState({
    columns: [
      { title: `#`, field: 'market_cap_rank', cellStyle: {width: `1%`}},
      { title: 'Coin', 
        field: 'coin', 
        render: rowData => (
        <div style={{display: `flex`, justifyContent:`space-around`}}>
          <img src={rowData.coin.image} style={{width: 40, borderRadius: '50%'}} alt="logo"/>
          <p><b>{rowData.coin.name}</b></p>
          <p>{rowData.coin.symbol}</p>
        </div>),
        customSort: (a, b) => a.coin.name.length - b.coin.name.length
      },
      { title: 'Price', field: 'current_price', cellStyle: {color: `#428bca`} },
      { title: '1h', field: 'price_change_percentage_1h_in_currency',
        render: num => (
          <div style={{color: (num.price_change_percentage_1h_in_currency.split('').includes(`-`)) ? `red` : `green`}}>
            {num.price_change_percentage_1h_in_currency}
          </div>)
      },
      { title: '24h', field: 'price_change_percentage_24h_in_currency',
        render: num => (
          <div style={{color: (num.price_change_percentage_24h_in_currency.split('').includes(`-`)) ? `red` : `green`}}>
            {num.price_change_percentage_24h_in_currency}
          </div>)
      },
      { title: '7d', field: 'price_change_percentage_7d_in_currency', 
        render: num => (
          <div style={{color: (num.price_change_percentage_7d_in_currency.split('').includes(`-`)) ? `red` : `green`}}>
            {num.price_change_percentage_7d_in_currency}
          </div>)
      },
      { title: 'Total Volume', field: 'total_volume', cellStyle: {color: `#428bca`}},
      { title: 'Circulating Supply', field: 'circulating_supply' },
      { title: 'Market Cap', field: 'market_cap' },
      // { title: 'Last 7 Days', field: 'sparkline' },
    ],
    data: [],
  });

  const addComma = (x) =>{
    var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
  }

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&per_page=600&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`)
      .then(res => {
        let temp=[]
          res.data.map(coin => { 
            return    temp.push({  id: coin.id,
                                market_cap_rank: coin.market_cap_rank,
                                coin: {
                                        name: coin.name,
                                        symbol: coin.symbol.toUpperCase(),
                                        image: coin.image,
                                      },
                                current_price: `$${addComma(coin.current_price)}`, 
                                price_change_percentage_1h_in_currency: `${Math.round(coin.price_change_percentage_1h_in_currency * 100) / 100}%`,
                                price_change_percentage_24h_in_currency: `${Math.round(coin.price_change_percentage_24h_in_currency * 100) / 100}%`,
                                price_change_percentage_7d_in_currency: `${Math.round(coin.price_change_percentage_7d_in_currency * 100) / 100}%`, 
                                total_volume: `$${addComma(coin.total_volume)}`, 
                                circulating_supply: addComma(coin.circulating_supply), 
                                market_cap: `$${addComma(coin.market_cap) }`,})
          })
          setState(prevState => { return {...prevState, data: temp} })
      })
    return () => { };
  }, [])

  return (
    <MaterialTable
      components={{
          Toolbar: props => <h2 className="tableHeader">List of Cryptocurrency Coins</h2>
      }}
      columns={state.columns}
      data={state.data}
      options={{
        headerStyle: {
          fontWeight: `bold`,
        }
      }}
      detailPanel={rowData => {
        return <Chart id={rowData.id} /> 
      }}
      onRowClick={(event, rowData, togglePanel) => togglePanel()}
    />
  );
}