import React, {useEffect, useState} from 'react';
import axios from 'axios';
// import CustomizedXAxisTick from './CustomizedXAxisTick'
// import {Link} from 'react-router-dom'
// import Logo from '../assest/logo.gif'

export default function CryptoInvestedCoins() {
  const [data, setData] = useState([]);
  const [investedCoin, setInvestedCoin] = useState([])

  useEffect(() => {
    let isCancelled=false;
    axios
      .get(`http://localhost:4000/transactions`)
      .then(res => {
          if(!isCancelled)
            setInvestedCoin(res.data)
            res.data.map(x => {
                return axios.get(`https://api.coingecko.com/api/v3/coins/${x.coinId}/market_chart?vs_currency=usd&days=1`)
                  .then(res => {
                      let temp=[]
                      res.data.prices.map(price => {
                        return temp.push({  date: new Date(price[0]).toLocaleTimeString("en-US"), 
                                            price: price[1], 
                                        })
                      })

                      if (!isCancelled)
                        setData(temp)
                  })
              })
      })
    return () => { isCancelled=true };

  }, [])
  // console.log(data)  

  return (
    // <div style={{display: `flex`, margin:`30px 15px`, overflow:`hidden`, alignItems:`center`}}>
    //     {investedCoin.map((x, i ) => (
    //       (i <= 5) ?
    //         <div key={x.coinImage} style={{margin:`0 30px`}}>
    //           <img src={x.coinImage} alt="logo" width="50"/>
    //           <h3>{x.coinName}</h3>
    //         </div> : 
    //       (i === 6) ? 
    //         <div key={x.coinImage}>
    //           <Link to="/investment-tracker" style={{textDecoration:`none`}}> View More... </Link>
    //         </div>
    //       : null )
    //     )}
    // </div>
    <div>
    </div>
  );
}