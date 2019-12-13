import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import NumberFormat from 'react-number-format';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { ToastContainer, toast } from "react-toastify";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import "react-toastify/dist/ReactToastify.css";

import Nav from './Nav'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: 'black',
    },
    title:{
      textAlign: 'left',
      color: 'black',
      fontSize: '40px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    span:{
      textAlign: 'left',
      color: 'black',
      fontSize: '20px',
      display: 'flex',
      flexDirection: 'row',
      margin: '0 auto 0',
      width: '95%',
    },
    wrap:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: '0 auto 0',
      width: '95%',
    },
    description:{
      margin: '5vh auto 0',
      width: '95%',
      textAlign: 'justify'
    },
    wrap2:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      margin: '0 auto 0',
      width: '95%',
    },
    table:{
      fontSize: '25px',
      display: 'flex',
      flexDirection: 'column',
    },
    inDepth:{
      fontSize: '20px',
      color: 'black',
    },
    graph:{
      margin: '10vh auto 0',
      display: 'flex',
      justifyContent: 'center'
    },
    torow:{
      display: 'flex',
      flexDirection: 'column',
      margin: '40px 0 0 30px'
    },
    modal:{
      display: 'flex',
      justifyContent: 'space-around'
    }
  }),
);

export default function Coin(props) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [usd, setUsd] = useState('')
  const [balance, setBalance] = useState('1000000')
  const [compute, setCompute] = useState('1000000')
  const [validate, setValidate] = useState('')
  const [state, setState] = React.useState({
    data: []
  });

  useEffect(() => {
    submitUserData()
    render24hrs('1')
  },[]);



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Notify = () => {
    toast.success(`Succesfuly Purchased ${value} ${state.data.name}`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
      });
  }
  
  localStorage.setItem('wallet', compute);  

  const submitBuy = e =>{

    let date = new Date();
    let newDate = date.toLocaleString()

    let currentBal= balance
    let computed = currentBal - usd
    setCompute(computed) 
    

    console.log(computed);
    let data = {
      rank: state.data.market_cap_rank,
      image: state.data.image.large,
      coinName: state.data.name,
      coinQuantity: value+ " " +state.data.symbol,
      totalAmount: usd,
      date: newDate,
    }

    if (value <= 0|| value === " "){
      setValidate('Please enter a Quantity')
    }
    else{
    axios({
      method: 'post',
      url: 'http://localhost:4000/transactions',
      data: data,
      
    })
    .then( response =>  {

      setBalance(localStorage.getItem('wallet'))
      Notify()
      handleClose()
      
    })
 
    .catch(err=>console.log(err))
  }
  
}


  const submitUserData = () =>{
    axios({
      method: 'get',
      url: `https://api.coingecko.com/api/v3/coins/${props.id}?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`
    })
    .then( response =>  {
      setState({
        ...state,
        data: response.data 
      })
    })
    .catch(err=>{
      console.log('err');
    })
  }


  const convert = e => {
    setValue(e.target.value)
    var usd = state.data.market_data.current_price.usd * e.target.value
    setUsd(usd)
  } 

  const handleChange = e => {
    render24hrs(e.target.value)
  };

  const render24hrs = (e) =>{
    axios({
      method: 'get',
      url: `https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=usd&days=${e}`
    })
    .then( response =>  {
     var laogan = []
     response.data.prices.map((db) => laogan.push({x:db[0],y:db[1]}))
     setData(laogan)
    })
    .catch(err=>{
      console.log('err');
    })
  } 

    return (    
    <>
    <CssBaseline />
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover
      />
      <Container maxWidth="xl">
      
        <div className={classes.root}>
          <Grid container spacing={3}>
         
            <Grid item xs={12}>
              <Paper className={classes.paper}>
              <Breadcrumbs aria-label="breadcrumb">
                
                <Link color="inherit" href="/">
                  Back
                </Link>

                <h5>wallet: {balance}</h5>
                
                
              </Breadcrumbs>
                  <div className={classes.wrap}>
                    <div className={classes.title}>
                      <img className src={state.data.image ? state.data.image.large : null} alt={state.data.image ? state.data.image.large : null} style={{width: 60, height:60, marginRight:5}}/> 
                      <h3>{state.data.name}</h3>

                      <h5>({state.data.symbol})</h5>
                      <Button variant="contained" color="primary" onClick={handleClickOpen}>
                        Buy
                      </Button>
                    </div>
                    
                    <div className={classes.title}> 
                      <h3>
                        <NumberFormat 
                          value={state.data.market_data ? state.data.market_data.current_price.usd : null} 
                          displayType={'text'} 
                          thousandSeparator={true} 
                          prefix={'$'} 
                          decimalScale='2' 
                        />
                      </h3> 
                                         
                      <h5>
                        <NumberFormat 
                            value={state.data.market_data ? state.data.market_data.price_change_percentage_24h : null} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            suffix={'%'} 
                            decimalScale='2' 
                            style={{ color: state.data.market_data ? state.data.market_data.price_change_percentage_24h : null > 0 ? 'red' : 'green'}}
                        />
                      </h5>
                    </div>
                  </div> 

                  <div className={classes.span}>
                     <h4 style={{ margin: '0 10px 0 0'}}>Market Rank:</h4>
                     <h4 style={{ margin: '0'}}>#{state.data.market_cap_rank}</h4>
                  </div>

                  <div className={classes.span}>
                     <h4 style={{ margin: '0 10px 0 0'}}>Market Cap:</h4>
                     <h4 style={{ margin: '0'}}>
                        <NumberFormat 
                          value={state.data.market_data ? state.data.market_data.market_cap.usd : null }
                          displayType={'text'} 
                          thousandSeparator={true} 
                          prefix={'$'} 
                          decimalScale='2'
                        />
                    </h4>
                  </div>

                  <div className={classes.span}>
                     <h4 style={{ margin: '0 10px 0 0'}}>Circulating Supply:</h4>
                     <h4 style={{ margin: '0'}}>
                        <NumberFormat 
                          value={state.data.market_data ? state.data.market_data.circulating_supply : null}
                          displayType={'text'} 
                          thousandSeparator={true} 
                          prefix={'$'} 
                          decimalScale='2'
                        />
                    </h4>
                  </div>

                  <div className={classes.description}>
                    <p dangerouslySetInnerHTML = {{__html: state.data.market_data ? state.data.description.en : null }}></p>
                  </div>

                  <div className={classes.wrap2}>
                    <div className={classes.table}>
                      <h3>Price Changes</h3>  
                      <table border='1'>
                        
                        <tr>
                          <th>1h</th>
                          <th>24h</th>
                          <th>7d</th>
                          <th>14d</th>
                          <th>30d</th>
                          <th>1y</th>
                        </tr>

                        <tr>
                          <td> 
                            <NumberFormat 
                              value={state.data.market_data ? state.data.market_data.price_change_percentage_1h_in_currency.usd : null} 
                              displayType={'text'} 
                              thousandSeparator={true} 
                              suffix={'%'} 
                              decimalScale='2' 
                              style={{ color: (state.data.market_data ? state.data.market_data.price_change_percentage_1h_in_currency.usd : null) > 0 ? 'green' : 'red'}}
                            />
                          </td>
                          <td>
                            <NumberFormat 
                              value={state.data.market_data ? state.data.market_data.price_change_percentage_24h : null} 
                              displayType={'text'} 
                              thousandSeparator={true} 
                              suffix={'%'} 
                              decimalScale='2' 
                              style={{ color: (state.data.market_data ? state.data.market_data.price_change_percentage_24h  : null) > 0 ? 'green' : 'red'}}
                            />
                          </td>
                          <td>
                            <NumberFormat 
                              value={state.data.market_data ? state.data.market_data.price_change_percentage_7d : null} 
                              displayType={'text'} 
                              thousandSeparator={true} 
                              suffix={'%'} 
                              decimalScale='2' 
                              style={{ color: (state.data.market_data ? state.data.market_data.price_change_percentage_7d  : null) > 0 ? 'green' : 'red'}}
                            />
                          </td>
                          <td>
                            <NumberFormat 
                              value={state.data.market_data ? state.data.market_data.price_change_percentage_14d : null} 
                              displayType={'text'} 
                              thousandSeparator={true} 
                              suffix={'%'} 
                              decimalScale='2' 
                              style={{ color: (state.data.market_data ? state.data.market_data.price_change_percentage_14d  : null) > 0 ? 'green' : 'red'}}
                            />
                          </td>
                          <td>
                            <NumberFormat 
                              value={state.data.market_data ? state.data.market_data.price_change_percentage_30d : null} 
                              displayType={'text'} 
                              thousandSeparator={true} 
                              suffix={'%'} 
                              decimalScale='2' 
                              style={{ color: (state.data.market_data ? state.data.market_data.price_change_percentage_30d  : null) > 0 ? 'green' : 'red'}}
                            />
                          </td>
                          <td>
                            <NumberFormat 
                              value={state.data.market_data ? state.data.market_data.price_change_percentage_1y : null} 
                              displayType={'text'} 
                              thousandSeparator={true} 
                              suffix={'%'} 
                              decimalScale='2' 
                              style={{ color: (state.data.market_data ? state.data.market_data.price_change_percentage_1y  : null) > 0 ? 'green' : 'red'}}
                            />
                          </td>
                        </tr>
                      </table>
                      
                    </div>

                    <div className={classes.inDepth}>
                      <h3>Quick Stats</h3>
                      <hr/>
                      <table>
                        <tr style={{ textAlign: 'left'}}>
                          <td>Bitcoin Price</td>
                          <td></td>
                          <td>
                            <NumberFormat 
                              value={state.data.market_data ? state.data.market_data.current_price.usd : null} 
                              displayType={'text'} 
                              thousandSeparator={true} 
                              prefix={'$'} 
                              decimalScale='2' 
                            />
                          </td>
                        </tr>

                        <tr style={{ textAlign: 'left'}}>
                          <td>Market Cap</td>
                          <td></td>
                          <td>
                            <NumberFormat 
                              value={state.data.market_data ? state.data.market_data.market_cap.usd : null} 
                              displayType={'text'} 
                              thousandSeparator={true} 
                              prefix={'$'} 
                              decimalScale='2' 
                            />
                          </td>
                        </tr>

                        <tr style={{ textAlign: 'left'}}>
                          <td>Trading Volume</td>
                          <td></td>
                          <td>
                            <NumberFormat 
                              value={state.data.market_data ? state.data.market_data.total_volume.usd : null} 
                              displayType={'text'} 
                              thousandSeparator={true} 
                              prefix={'$'} 
                              decimalScale='2' 
                            />
                          </td>
                        </tr>

                       <tr style={{ textAlign: 'left'}}>
                          <td>24h Low / 24h High</td>
                          <td></td>
                          <td>
                            <NumberFormat 
                              value={state.data.market_data ? state.data.market_data.low_24h.usd : null} 
                              displayType={'text'} 
                              thousandSeparator={true} 
                              prefix={'$'} 
                              decimalScale='2' 
                            />  
                            /
                            <NumberFormat 
                              value={state.data.market_data ? state.data.market_data.high_24h.usd : null} 
                              displayType={'text'} 
                              thousandSeparator={true} 
                              prefix={'$'} 
                              decimalScale='2' 
                            />
                           
                          </td>
                        </tr>

                        <tr style={{ textAlign: 'left'}}>
                          <td>All-Time High</td>
                          <td></td>
                          <td>
                            <NumberFormat 
                              value={state.data.market_data ? state.data.market_data.ath.usd : null} 
                              displayType={'text'} 
                              thousandSeparator={true} 
                              prefix={'$'} 
                              decimalScale='2' 
                            />
                          </td>
                        </tr>

                        <tr style={{ textAlign: 'left'}}>
                          <td>All-Time Low</td>
                          <td></td>
                          <td>
                          <NumberFormat 
                              value={state.data.market_data ? state.data.market_data.atl.usd : null} 
                              displayType={'text'} 
                              thousandSeparator={true} 
                              prefix={'$'} 
                              decimalScale='2' 
                            />
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>

                <div className={classes.graph}>
                  
                  <XYPlot width={1400} height={400}>
                    <HorizontalGridLines />
                    <LineSeries
                      animation={true}
                      data={data}/>
                    <XAxis title='Date' xType="time"/>
                    <YAxis title='Price'/>
                  </XYPlot>
                  
                  <FormControl component="fieldset">
                    <RadioGroup aria-label="position" name="position" onClick={handleChange}>
                      <div className={classes.torow}>
                        <FormControlLabel
                          value="1"
                          control={<Radio color="primary" />}
                          label="1 day"
                          labelPlacement="24H"
                        />

                        <FormControlLabel
                          value="7"
                          control={<Radio color="primary" />}
                          label="1 week"
                          labelPlacement="7d"
                        
                        />

                        <FormControlLabel
                          value="30"
                          control={<Radio color="primary" />}
                          label="1 month"
                          labelPlacement="30d"
                        
                        />

                        <FormControlLabel
                          value="180"
                          control={<Radio color="primary" />}
                          label="6 months"
                          labelPlacement="180d"
                        
                        />

                        <FormControlLabel
                          value="365"
                          control={<Radio color="primary" />}
                          label="1 year"
                          labelPlacement="1y"
                        />

                        <FormControlLabel
                          value="max"
                          control={<Radio color="primary" />}
                          label="Max"
                          labelPlacement="Max"
                        
                        />
                     </div>
                    </RadioGroup>
                  </FormControl>
                </div>
               
                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle id="alert-dialog-slide-title">{`Buy ${state.data.id}?`}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                    <div className={classes.modal}>
                    <TextField
                      value={value}
                      id="standard-number"
                      label="Quantity"
                      onChange={e => convert(e)}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">{state.data.symbol}</InputAdornment>,
                      }}
                      type="number"
                      helperText={validate}
                     />
                    <h3 style={{margin: 'auto 50px auto'}}>=</h3>
                    <TextField
                      id="standard-number"
                      label="Amount"
                      value={usd}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                    </div>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant="contained">
                      Cancel
                    </Button>
                    <Button onClick={submitBuy} color="primary" variant="contained">
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>

              </Paper>
            </Grid>
            
          </Grid>
        </div>
    </Container>
    </>
  );
}
