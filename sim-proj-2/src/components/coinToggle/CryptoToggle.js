import React, { useState, useEffect } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import axios from 'axios'
import PriceChanges from './PriceChanges'
import QuickStats from './QuickStats'
import CryptoChart from './CryptoChart'

export default function CryptoToggle({id, market_cap_rank, circulating_supply, high_24h, low_24h, price_change_24h, ath}){
  const [percentage, setPercentage] = useState({ oneH: 0, oneD: 0, oneW: 0, twoW: 0, oneM: 0, oneY: 0});
  const [data, setData] = useState();
  const [history, setHistory] = useState("1");

  useEffect(() => {
    let isCancelled = false;
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${history}`)
      .then(res => {
        let temp=[]
          res.data.prices.map(price => {
            return temp.push({  date: (history === "1" || history === null) ? new Date(price[0]).toLocaleTimeString("en-US") : new Date(price[0]).toLocaleDateString("en-US") , 
                                price: price[1], 
                            })
          })
        if (!isCancelled)
          setData(temp)
      })

    axios
      .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=${id}&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C1y`)
      .then(res => {   
        if (!isCancelled)       
          setPercentage({ oneH: Math.round(res.data[0].price_change_percentage_1h_in_currency * 100) / 100 , 
                          oneD: Math.round(res.data[0].price_change_percentage_24h_in_currency * 100) / 100 , 
                          oneW: Math.round(res.data[0].price_change_percentage_7d_in_currency * 100) / 100 , 
                          twoW: Math.round(res.data[0].price_change_percentage_14d_in_currency * 100) / 100 , 
                          oneM: Math.round(res.data[0].price_change_percentage_30d_in_currency * 100) / 100 , 
                          oneY: Math.round(res.data[0].price_change_percentage_1y_in_currency * 100) / 100  
          })
      })
    return () => { isCancelled = true; };

  }, [id, history])

  return (
    <div style={{display:`flex`, justifyContent:`space-around`}}>
      <div>
          <PriceChanges percentage={percentage}/>
          
          <ToggleButtonGroup
              style={{margin:`30px 0 0 420px`}}
              value={history}
              exclusive
              onChange={(e, newDate) => setHistory(newDate)}
            >
              <ToggleButton value="1" aria-label="1 day" selected={(history === "1" || history === null) ? true : false }> 24 Hours </ToggleButton>
              <ToggleButton value="7" aria-label="1 week"> 1 Week </ToggleButton>
              <ToggleButton value="30" aria-label="1 month"> 1 Month </ToggleButton>
              <ToggleButton value="180" aria-label="6 months"> 6 Months </ToggleButton>
              <ToggleButton value="365" aria-label="1 year"> 1 Year </ToggleButton>
              <ToggleButton value="max" aria-label="max"> Max </ToggleButton>
          </ToggleButtonGroup>
          
          <CryptoChart data={data}/>
      </div>

      <QuickStats market_cap_rank={market_cap_rank}
                  circulating_supply={circulating_supply}
                  high_24h={high_24h}
                  low_24h={low_24h}
                  price_change_24h={price_change_24h}
                  ath={ath}/>
    </div>
  );
}