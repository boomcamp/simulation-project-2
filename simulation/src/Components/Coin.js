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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
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
    }

  }),
);

export default function Coin(props) {
  const [value, setValue] = React.useState('1');
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [state, setState] = React.useState({
    data: []
  });

  useEffect(() => {
    submitUserData()
    render24hrs()
  },[]);

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

  const handleChange = event => {
    setValue(event.target.value);
    console.log(value);
    render24hrs()
  };

  const render24hrs = () =>{
    axios({
      method: 'get',
      url: `https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=usd&days=${value}`
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

  // console.log(state.data.image.small);
  // console.log(state.data);

    return (
    <>
  
    <CssBaseline />
      <Container maxWidth="xl">
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                  <div className={classes.wrap}>
                    <div className={classes.title}>
                      <img className src={state.data.image ? state.data.image.large : null} alt={state.data.image ? state.data.image.large : null} style={{width: 60, height:60, marginRight:5}}/> 
                      <h3>{state.data.id}</h3>
                      <h5>({state.data.symbol})</h5>
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
                              style={{ color: state.data.market_data ? state.data.market_data.price_change_percentage_1h_in_currency.usd : null > 0 ? 'green' : 'red'}}
                            />
                          </td>
                          <td>
                            <NumberFormat 
                              value={state.data.market_data ? state.data.market_data.price_change_percentage_24h : null} 
                              displayType={'text'} 
                              thousandSeparator={true} 
                              suffix={'%'} 
                              decimalScale='2' 
                              style={{ color: state.data.market_data ? state.data.market_data.price_change_percentage_24h  : null > 0 ? 'red' : 'green'}}
                            />
                          </td>
                          <td>
                            <NumberFormat 
                              value={state.data.market_data ? state.data.market_data.price_change_percentage_7d : null} 
                              displayType={'text'} 
                              thousandSeparator={true} 
                              suffix={'%'} 
                              decimalScale='2' 
                              style={{ color: state.data.market_data ? state.data.market_data.price_change_percentage_7d  : null > 0 ? 'green' : 'red'}}
                            />
                          </td>
                          <td>
                            <NumberFormat 
                              value={state.data.market_data ? state.data.market_data.price_change_percentage_14d : null} 
                              displayType={'text'} 
                              thousandSeparator={true} 
                              suffix={'%'} 
                              decimalScale='2' 
                              style={{ color: state.data.market_data ? state.data.market_data.price_change_percentage_14d  : null > 0 ? 'green' : 'red'}}
                            />
                          </td>
                          <td>
                            <NumberFormat 
                              value={state.data.market_data ? state.data.market_data.price_change_percentage_30d : null} 
                              displayType={'text'} 
                              thousandSeparator={true} 
                              suffix={'%'} 
                              decimalScale='2' 
                              style={{ color: state.data.market_data ? state.data.market_data.price_change_percentage_30d  : null > 0 ? 'green' : 'red'}}
                            />
                          </td>
                          <td>
                            <NumberFormat 
                              value={state.data.market_data ? state.data.market_data.price_change_percentage_1y : null} 
                              displayType={'text'} 
                              thousandSeparator={true} 
                              suffix={'%'} 
                              decimalScale='2' 
                              style={{ color: state.data.market_data ? state.data.market_data.price_change_percentage_1y  : null > 0 ? 'red' : 'green'}}
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
                    <XYPlot
                      width={1000}
                      height={400}>
                      <HorizontalGridLines />
                      <LineSeries
                        animation={true}
                        data={data}/>
                      <XAxis xType="time"/>
                      <YAxis />
                    </XYPlot>
                  

                  <FormControl component="fieldset">
                    <RadioGroup aria-label="position" name="position" value={value}  row>
                      <div className={classes.torow}>
                        <FormControlLabel
                          value="1"
                          control={<Radio color="primary" />}
                          label="24H"
                          labelPlacement="24H"
                          onClick={handleChange}
                        />

                        <FormControlLabel
                          value="7"
                          control={<Radio color="primary" />}
                          label="7d"
                          labelPlacement="7d"
                          onClick={handleChange}
                        />

                        <FormControlLabel
                          value="14"
                          control={<Radio color="primary" />}
                          label="14d"
                          labelPlacement="14d"
                          onClick={handleChange}
                        />

                        <FormControlLabel
                          value="30"
                          control={<Radio color="primary" />}
                          label="30d"
                          labelPlacement="30d"
                          onClick={handleChange}
                        />

                        <FormControlLabel
                          value="60"
                          control={<Radio color="primary" />}
                          label="60d"
                          labelPlacement="60d"
                          onClick={handleChange}
                        />

                        <FormControlLabel
                          value="90"
                          control={<Radio color="primary" />}
                          label="90d"
                          labelPlacement="90d"
                          onClick={handleChange}
                        />

                        <FormControlLabel
                          value="180"
                          control={<Radio color="primary" />}
                          label="180d"
                          labelPlacement="180d"
                          onClick={handleChange}
                        />

                        <FormControlLabel
                          value="max"
                          control={<Radio color="primary" />}
                          label="1y"
                          labelPlacement="1y"
                          onClick={handleChange}
                        />
                      </div>
                    </RadioGroup>
                  </FormControl>
                  </div>
              </Paper>
            </Grid>
            
          </Grid>
        </div>
    </Container>
    </>
  );
}
