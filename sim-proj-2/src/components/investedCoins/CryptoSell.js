import React, {useState} from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Title from '../tools/Title'
import axios from 'axios'
import { withSnackbar } from 'notistack';

function CryptoSell({maxSell, coin, current_price, coinId, closeFn, enqueueSnackbar,}) {
    const [value, setValue] = useState({ cash: 0, coin: 0});

    const handleMaxSell = () => {
        if (value.cash > maxSell) 
            setValue({cash: maxSell, coin: (maxSell/current_price)})
        if (value.coin > maxSell/current_price) 
            setValue({cash: maxSell, coin: (maxSell/current_price)})
        else if(value.cash < 0 || value.coin < 0)
            setValue({cash: 0, coin: 0});
    };

    const handleEnterAmount = (money, type) => {
        if (type === "cash")
            setValue({cash: money, coin: (money/current_price)})
        else if (type === "coin")
            setValue({cash: (current_price*money), coin: money})
    }

    const handleSell = () => {
        if(value.cash !== 0){
            axios
                .patch(`http://localhost:4000/transactions/${coinId}`, {
                    "amountBuy": maxSell-value.cash,
                })
                .then(res => {
                    console.log(res.data)
                    axios
                        .get(`http://localhost:4000/wallet`)
                        .then(res => {
                            axios
                                .post(`http://localhost:4000/wallet`, {
                                    amount: res.data.amount += value.cash*current_price
                                })
                                .then(res => {
                                    console.log(res.data)
                                })
                        })
                  
                })
            closeFn();
            enqueueSnackbar("Successfully Sold", {variant: 'success', autoHideDuration: 1000});
        }
    }

    return (
        <div style={{textAlign:`center`, display:`flex`, flexDirection:`column`}}>
            <Title>Sell Cryptocurrency</Title>
            <h3>{coin.name} <i>({coin.sym.toUpperCase()})</i></h3>
            <h3>${maxSell}</h3>

            <TextField
                label="Amount"
                value={value.cash}
                margin="dense"
                onChange={(e) => handleEnterAmount(e.target.value, "cash")}
                onKeyUp={handleMaxSell}
                type="number"
                inputProps={{
                    "aria-labelledby": 'input-slider',
                }}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"> $ </InputAdornment>
                    ),
                  }}
            />
            <p style={{fontSize:`24px`, margin:`15px 0 0 0`}}>⥮</p>
            <TextField
                label={`${coin.name}`} 
                value={value.coin}
                margin="dense"
                onChange={(e) => handleEnterAmount(e.target.value, "coin")}
                onKeyUp={handleMaxSell}
                type="number"
                inputProps={{
                    "aria-labelledby": 'input-slider',
                }}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"> ℂ </InputAdornment>
                    ),
                  }}
            />
            <Button 
              variant="contained" 
              color="primary" 
              style={{margin: `10px 0 0 0`}}
              onClick={ handleSell }> Sell </Button>
        </div>
    );
}

export default withSnackbar(CryptoSell)