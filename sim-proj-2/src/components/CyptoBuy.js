import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import axios from 'axios'
import {Redirect} from 'react-router-dom'

import Title from './tools/Title'
// import ProfilePic from '../assest/download.jpeg'

function NumberFormatCustom({ inputRef, onChange, ...other }) {
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$ "
    />
  );
}

export default function CyptoBuy() {
    const [redirect, setRedirect] = useState(false);
    const [amount, setAmount] = useState();
    const [coins, setCoins] = useState([]);
    const [state, setState] = useState();

    useEffect(() => {
      let isCancelled=false;
        axios
            .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&per_page=600&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`)
            .then(res => {
                let temp=[]
                res.data.map(coin => { return temp.push({ id: coin.id, 
                                                          // img: coin.image, 
                                                          // value: coin.name,
                                                          price: coin.current_price,                                                          
                                                          label: `${coin.name} (${coin.symbol.toUpperCase()})`
                                                        }) 
                                      })
                
                if(!isCancelled)  
                  setCoins(temp)
            })

        return () => { isCancelled=true };
    }, [])

    // Profit/loss = ( today’s price of 1BTC * X bitcoins you bought) - (price you bought 1BTC at * X bitcoins you bought)
    
    const handleBuy = () => {
      if(amount && state){
        axios
          .post(`http://localhost:4000/transactions`, {
            coinId: state.id,
            // coinImage: state.img,
            // coinName: state.value,
            amountBuy: amount,
            coinPrice: state.price,
            profitOrLoss: (state.price * amount) - (state.price * amount)
          })
          .then(res => {console.log(res)})
        
        setRedirect(true);
      }
    }

    if(redirect) 
      return <Redirect to="/investment-tracker" />

    return (
      <div style={{textAlign: `center`, display:`flex`, flexDirection:`column`}}>
          <Title>Buy Cryptocurrency</Title>
          <Select 
              placeholder="Cryptocurrency to Invest"
              value={state} 
              onChange={(state) => setState(state)} 
              options={coins} loading={true} 
              className="profileBuySell" />
          <TextField
              InputProps={{
                  inputComponent: NumberFormatCustom
              }}
              label="Amount" 
              className="profileBuySell" 
              style={{margin: `0 0 15px 0`}}
              onChange={(e) => setAmount(e.target.value)}
              value={amount} 
              required />
          <Button 
              variant="contained" 
              color="primary" 
              className="profileBuySell" 
              style={{margin: `0 10px`}}
              onClick={ handleBuy }> Buy </Button>
      </div>
    );
}