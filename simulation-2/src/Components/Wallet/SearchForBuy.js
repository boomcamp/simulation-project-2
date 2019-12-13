// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import 'isomorphic-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Buy from './Buy'

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export default function SearchForBuy(props) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const [selected, setSelected] = React.useState();
    const [amount, setAmount] = React.useState();
    const [coin, setCoin] = React.useState();

    const [coinValue, setCoinValue] = React.useState();

    const [state, setState] = React.useState({
      Amount_to_invest:0,
      Bitcoin_value: 0
    })

    const changeValue = (value, type) => {
      if(type === 'amount'){
        setCoin(value / coinValue)
      }
      if(type === 'coin'){
        setAmount(value * coinValue)
      }
    }
    
    const classes = useStyles();
  
    React.useEffect(() => {
      let active = true;
  
      if (!loading) {
        return undefined;
      }
  
      (async () => {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/list');
        await sleep(1e3); // For demo purposes.
        const cryptocoin = await response.json();
  
        if (active) {
            setOptions(cryptocoin.map(coin=>{
                return {
                    name: coin.name + '(' + coin.symbol+')',
                }
            }))
        }
      })();
  
      return () => {
        active = false;
      };
    }, [loading]);
  
    React.useEffect(() => {
      if (!open) {
        setOptions([]);
      }


    }, [open]);

    const getCoinDetails = (name) => {
      (async () => {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/list');
        // await sleep(1e3); // For demo purposes.
        const cryptocoin = await response.json();
        
        let coinobj = cryptocoin.filter((coin)=>{
          return coin.name === name
        })

        const coinDetails = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinobj[0].id}&order=market_cap_desc&per_page=100&page=1&sparkline=false
        `)
        
        const coinres = await coinDetails.json();
        setCoinValue(coinres[0].current_price)
        setSelected(coinobj[0].id);
      })();
    }

    return (
    <>
      <StyledaAutocomplete
        id="asynchronous-demo"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        getOptionSelected={(option, value) => option.name === value.name}
        getOptionLabel={option => option.name}
        options={options}
        loading={loading}
        onChange={(e)=>{
          let coinName =  e.target.textContent.split('(')[0]
          getCoinDetails(coinName)
        }}
        renderInput={params => (
          <TextField
            classes={{root:classes.root}}
            {...params}
            label="Search Cryptocurrency to buy"
            fullWidth
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  { params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />

        <FormControl fullWidth className={classes.margin} variant="outlined" style={{margin:'10px', width: '318px'}}>
          <InputLabel   htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={amount}
            onChange={(e)=>{
              setAmount(e.target.value)
              changeValue(e.target.value,'amount')
            }}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            labelWidth={60}
            type='number'
            defaultValue={0}
          />
        </FormControl>

        <FormControl fullWidth className={classes.margin} variant="outlined" style={{margin:'10px', width: '318px'}}>
          <InputLabel htmlFor="outlined-adornment-amount">Coin</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={coin}
            onChange={(e)=>{
              setCoin(e.target.value)
              changeValue(e.target.value,'coin')
            }}
            startAdornment={<InputAdornment position="start">C</InputAdornment>}
            labelWidth={60}
            type='number'
            defaultValue={0}
          />
        </FormControl>
      
            <Buy toggle={props.toggle} selected={selected} BuyAmount={amount} CoinValue={coinValue} NumOfCoin={coin}/>
      
      </>
    );
}

const inputStyle = {
  color:'white'
}

const useStyles = makeStyles(theme => ({
  root: {
    '& .PrivateNotchedOutline-root-110.MuiOutlinedInput-notchedOutline, .MuiFormLabel-root, .MuiInputLabel-root,.MuiInputLabel-formControl,.MuiInputLabel-animated,.MuiInputLabel-outlined': {
      borderColor: 'rgb(3, 36, 64)',
      color: 'white!important'
    },
    '& .MuiOutlinedInput-root.Mui-focused .PrivateNotchedOutline-root-110.MuiOutlinedInput-notchedOutline':{
      borderColor: 'white',
      color: 'white!important'
    }
  },
}));

const StyledButton = withStyles({
  inputMarginDense: {
    borderColor:'white'
  },
  label: {
    textTransform: 'capitalize',
  },

})(TextField);


const StyledaAutocomplete = withStyles({
  root: {
    color: 'white',
    borderColor: 'white',
    margin: '10px'
  },
  label: {
    textTransform: 'capitalize',
  },
  input:{
    color: 'white',
    borderColor: 'white'
  },
  inputRoot:{
    color: 'white',
    borderColor: 'white'
  },
  popper:{
    color: 'white'
  },
  focused:{
    // border: '1px solid white'
  },
})(Autocomplete);

export const styles = {
    root: {
        color: 'white'
    }
}


