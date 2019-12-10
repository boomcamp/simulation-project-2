// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import 'isomorphic-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/styles';

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export default function SearchForBuy() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
  
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
            //   setOptions(Object.keys(cryptocoin).map(key => cryptocoin[key]));
            setOptions(cryptocoin.map(coin=>{
                return {
                    name: coin.name + '(' + coin.symbol+')',
                    // id: coin.id 
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
  
    
    return (

    <>
      <Autocomplete
        id="asynchronous-demo"
        style={{ width: 300 }}
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
        
        onChange={(e)=>{console.log(e.target.getAttribute('data-option-index'))}}

        renderInput={params => (
          <TextField
            classes={{
                styles
              }}
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
      </>
    );
}

const styles = {
    root: {
        color: 'white'
    }
}


