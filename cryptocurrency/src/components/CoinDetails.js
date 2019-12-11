import React, { Component } from 'react'
import '../App.css'
import axios from 'axios'
import Charts from './Charts'
import {Grid,Button,ButtonGroup} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

class CoinDetails extends Component {

componentDidMount(){
  axios
    .get(`https://api.coingecko.com/api/v3/coins/${this.props.match.params.id}`, {   // clicked coin
    })
    .then(response => { 
      localStorage.setItem('id', response.data.id)
        this.setState({
          coins:response.data,
        })
        return response

    })
    .then(res => {
      axios
      .get(`https://api.coingecko.com/api/v3/coins/${res.data.id}/market_chart?vs_currency=usd&days=1`, {  // default chart
      })
      .then(response => { 
          let temp = []
          response.data.prices.map( elem => {
            temp.push({
              'date': new Date(elem[0]).toLocaleDateString("en-US"),
              'price': elem[1]
            })
          })
          this.setState({
            chartArr: temp
          })
      })
    })
  }

  handleClick=(e)=>{
    console.log(e)
    axios
    .get(`https://api.coingecko.com/api/v3/coins/${localStorage.getItem('id')}/market_chart?vs_currency=usd&days=${e.days}`, { // chart that has been clicked
    })
    .then(response => { 
        let temp = []
        response.data.prices.map( elem => {
          temp.push({
            'date': new Date(elem[0]).toLocaleDateString("en-US"),
            'price': elem[1]
          })
        })
        this.setState({
          chartArr: temp, label : e.text
        })
    })
  }

  constructor(props) {
    super(props)

    this.state = {
      coins:[],
      chartArr:[],
      label: '24 Hours', //default label 
    }
  }
  
  render() {
 
    return (
      <div className="coins">
        
        <p>{this.state.coins.name} ({this.state.coins.symbol})</p>
        <hr/>

        <div className="picture">
          {
           this.state.coins.image ?  
          <img src = {this.state.coins.image.large} width="200" alt="This is an Image"/>
          : null
          }
        </div>  

        <div className="market-data">
        {
          this.state.coins.market_data ?
        <React.Fragment>

        <Grid item>
        <ButtonGroup variant="contained" color="primary" aria-label="full-width contained primary button group">

        <Button onClick={()=> this.handleClick({days: 1, text: '24 Hours'})} >24 Hours</Button>
          <Button onClick={()=> this.handleClick({days: 7, text: '1 Week'})}>1 Week</Button>
          <Button onClick={()=> this.handleClick({days: 30, text: '1 Month'})}>1 Month</Button>
          <Button onClick={()=> this.handleClick({days: 180, text: '6 Months'})}>6 Months</Button>
          <Button onClick={()=> this.handleClick({days: 365, text: '1 Year'})}>1 Year</Button>
          <Button onClick={()=> this.handleClick({days: 11430, text: 'All Time'})}>Max</Button>
        </ButtonGroup>

        <Typography variant="h6" style={{marginTop:'10px'}}>
        {this.state.label}
        </Typography>
        
        </Grid>
          
        </React.Fragment>
        : null
        }
        </div>
        <br />
        <Charts chartArr={this.state.chartArr}/>
      </div>

    )
  }
}
export default CoinDetails