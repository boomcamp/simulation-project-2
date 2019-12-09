import React, {useEffect, useState} from 'react';
import axios from 'axios';
// import Logo from '../assest/logo.gif'

export default function InvesmentTracker() {
  const [investedCoin, setInvestedCoin] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:4000/transactions`)
      .then(res => {
          setInvestedCoin(res.data)
      })

    return () => { };

  }, [])
  return (
    <div style={{display: `flex`, margin:`30px 15px`, overflow:`hidden`, alignItems:`center`}}>
        {investedCoin.map((x, i ) => (
          (i <= 5) ?
            <div key={x.coinImage} style={{margin:`0 30px`}}>
              <img src={x.coinImage} alt="logo" width="50"/>
              <h3>{x.coinName}</h3>
            </div> : 
          (i === 6) ? 
            <div key={x.coinImage}>
              View More...
            </div>
          : null )
        )}
    </div>
  );
}