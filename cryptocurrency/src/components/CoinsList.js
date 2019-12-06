import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import '../App.css';

import axios from 'axios'

export default function Coinslist(props) {
 
  const [state, setState] = useState({

    columns: [
      
          { title: 'Rank', field: 'market_cap_rank' },
          {
            field: 'image',
            title: 'Logo',
            render: rowData => <img src={rowData.image} style={{width: 40, borderRadius: '50%'}} alt=""/>
          },
          { title: 'Name', field: 'name' },
          { title: 'Symbol', field: 'symbol' },
          { title: 'Current Price', field: 'current_price' },
          { title: 'Total Volume', field: 'total_volume' },
    ],
    data: []
  })
  
  useEffect(()=>{
    axios
    .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`, { 
    })
    .then(response => { 
    setState(prevState => {
     return { ...prevState, data: response.data } 
    })      
  })
   .then(() => {
  })
    .catch(err => console.log(err))
  }, [])
  
  function handleClick(e){                     //function
    props.history.push('/coindetails/' + e )
  }

  return (
    <React.Fragment>
    <div className='list'>
    <MaterialTable

    title = "Coins List"
    columns = {state.columns}
    data = {state.data}
    actions = {[
      {
      icon:'folder',
      onClick : (event,rowData) =>
      handleClick(rowData.id)
      }
      
      ]}
    />
    </div>
    </React.Fragment>
   );
}