import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import { LineChart, Line, XAxis, YAxis,} from 'recharts';
import axios from 'axios'
import CryptoChart from './Charts/CryptoChart';

export default function CryptoCoins() {
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
      // { title: 'Circulating Supply', field: 'circulating_supply' },
      { title: 'Market Cap', field: 'market_cap', },
      { title: 'Last 7 Days', field: 'sparkline', cellStyle:{padding:`0`}, sorting:false,
        render: rowData => (
          <LineChart style={{marginLeft: `-75px`, padding:`0`}} width={200} height={70} data={rowData.sparkline} >
            <YAxis type="number"  tick={false} axisLine={false} domain={['auto', 'auto']} />
            <XAxis dataKey="date" tick={false} axisLine={false}/>
            <Line type="monotone" 
                  dataKey="oneWeek" 
                  stroke={( parseFloat(rowData.price_change_percentage_7d_in_currency) < 0 ) ? `red` : `green`} 
                  dot={false} 
                  strokeWidth={1} />
          </LineChart>
        )
      },
    ],
    data: [],
  });

  const addComma = (x) =>{
    var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
  }

  useEffect(() => {
    let isCancelled = false;
    axios
      .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&per_page=600&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`)
      .then(res => {
        let temp=[]
          res.data.map(coin => { 
            let count=0;
            return temp.push({  id: coin.id,
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
                                market_cap: `$${addComma(coin.market_cap) }`,
                                sparkline: coin.sparkline_in_7d.price.map(price => {return {oneWeek: price, date: count ++} }) 
                               })
          })
          if(!isCancelled)
            setState(prevState => { return {...prevState, data: temp} })
      })
    return () => { isCancelled=true };
  }, [])
  const headerStyle={ textAlign: `left`, 
                      color: `white`, 
                      backgroundColor: `#3f51b5`, 
                      padding: `30px` }
  return (
    <MaterialTable
      components={{
          Toolbar: props => <div style={{marginTop:`80px`}}></div> 
          // <h2 className="tableHeader" style={headerStyle}>List of Cryptocurrency Coins</h2>
      }}
      columns={state.columns}
      data={state.data}
      
      options={{
        pageSizeOptions: [5,10,20,50,100],
        pageSize: 20,
        headerStyle: {
          fontWeight: `bold`,
        }
      }}
      detailPanel={rowData => {
        return <CryptoChart id={rowData.id} /> 
      }}
      onRowClick={(event, rowData, togglePanel) => togglePanel()}
    />
  );
}