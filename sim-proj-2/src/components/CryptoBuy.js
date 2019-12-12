import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import { withSnackbar } from 'notistack';

import Title from './tools/Title'
// import ProfilePic from '../assest/download.jpeg'

function CryptoBuy({closeFn, enqueueSnackbar}) {
    const [redirect, setRedirect] = useState(false);
    const [amount, setAmount] = useState({ cash: 0, cryptoCoin: 0});
    const [coinName, setCoinName] = useState("")
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
                                                          // value: {name: coin.name, sym: coin.symbol},
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
      if(amount.cash > 0 && state){
        axios
          .post(`http://localhost:4000/transactions`, {
            coinId: state.id,
            // coinImage: state.img,
            // coinName: state.value,
            amountBuy: amount.cash,
            coinPrice: state.price,
            // profitOrLoss: (state.price * amount.cash) - (state.price * amount.cash)
          })
          .then(res => {console.log(res)
            setRedirect(true);
            closeFn();
            enqueueSnackbar("Successfully Invested", {variant: 'success', autoHideDuration: 1000});
          })
      }
    }

    const handleEnterAmount = (money, type) => {
      if (type === "cash")
        setAmount({cash: money, cryptoCoin: (money/state.price)})
      else if (type === "crypto")
        setAmount({cash: (state.price*money), cryptoCoin: money})
    }

    if(redirect) 
      return <Redirect to="/investment-tracker" />

    return (
      <div style={{textAlign: `center`, display:`flex`, flexDirection:`column`}}>
          <Title>Buy Cryptocurrency</Title>
          <Select 
              placeholder="Cryptocurrency to Invest"
              value={state} 
              onChange={(state) => { setState(state);
                                     setAmount({cash: amount.cash, cryptoCoin: (amount.cash/state.price)});  
                                     setCoinName(state.label)                                   
                                    }} 
              options={coins} loading={true} 
              className="profileBuySell" />

          <div style={{display:`flex`, alignItems:`center`, justifyContent:`space-around`, flexDirection:`column`}}>
              <TextField
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"> $ </InputAdornment>
                    ),
                  }}
                  label="Amount" 
                  className="profileBuySell" 
                  style={{margin: `0 0 15px 0`,width:`95%`}}
                  onChange={(e) => handleEnterAmount(e.target.value, "cash")}
                  value={amount.cash} 
                  required
                  disabled={(state === undefined) ? true : false} />
              <p style={{fontSize:`24px`, margin:`0`}}>⥮</p>
              <TextField
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"> ℂ </InputAdornment>
                    ),
                  }}
                  label={(coinName) ? coinName : `Cryptocurrency`} 
                  className="profileBuySell" 
                  style={{margin: `0 0 15px 0`,width:`95%`}}
                  onChange={(e) =>  handleEnterAmount(e.target.value, "crypto")}
                  value={amount.cryptoCoin} 
                  required 
                  disabled={(state === undefined) ? true : false} />          
          </div>

          <Button 
              variant="contained" 
              color="primary" 
              className="profileBuySell" 
              style={{margin: `0 10px`}}
              onClick={ handleBuy }> Buy </Button>
      </div>
    );
}

export default withSnackbar(CryptoBuy)