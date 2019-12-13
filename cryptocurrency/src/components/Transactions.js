import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import '../App.css';
import axios from 'axios';

export class Transactions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      coins: [],
      totalVal: 0,
      getBal: [],
      quantity: 0
    }
  }
  componentDidMount() {
    const id = localStorage.getItem('id_test');
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`, {   // clicked coin
      })
      .then(response => {
        console.log(response)
        localStorage.setItem('id', response.data.id)
        this.setState({
          coins: response.data,
        })
        return response
      })
  }

  handleClickBuy = (e) => {
    let defaultNum = 1000000
    axios
      .post(`http://localhost:4000/transactions`,
        {
          name: e.name,
          current_price: e.market_data.current_price.usd,
          total_value: this.state.totalVal.toFixed(3),
          balance : localStorage.getItem('balance') - this.state.totalVal.toFixed(3), // Balance - Total value
          loss : parseInt(defaultNum) - parseInt(localStorage.getItem('balance')) - parseInt(this.state.totalVal.toFixed(3)),
        })
      .then(resp => {
        console.log(resp)
        let lsBalance = localStorage.getItem('balance')               // 1,000,000
        let deducted = lsBalance - this.state.totalVal.toFixed(3)     // 1,000,000 - total value
        localStorage.setItem("balance", deducted)                     // set value of 1,000,000 - total value
      })
  }

  handleClickSell = (e) => {
    let defaultNum = 1000000
    axios
    .post(`http://localhost:4000/transactions`,{
    name : e.name,
    current_price : e.market_data.current_price.usd,
    total_value : this.state.totalVal.toFixed(3),
    balance : parseInt(localStorage.getItem('balance')) + parseInt(this.state.totalVal.toFixed(3)), 
    profit : parseInt(defaultNum) - parseInt(localStorage.getItem('balance')) + parseInt(this.state.totalVal.toFixed(3)),
  })
    .then(responde=>{
      console.log(responde)
      let lsBalance = localStorage.getItem('balance')
      let val = this.state.totalVal.toFixed(3)
      let added = parseInt(lsBalance) + parseInt(val)
      localStorage.setItem('balance', added)
    })
  }

  handleOnChange = (e) =>{
    console.log(e)

    this.setState({
      totalVal: this.state.coins.market_data.current_price.usd * e.target.value,
    })
  }
  render() {
    return (
      <React.Fragment>
         <div className = 'border'>

        <p className='coin-name'> { this.state.coins?
        <li>{this.state.coins.name}</li>
        :null }
        </p>

          <hr style={{width:'700px'}}/>

        { this.state.coins.image?
        <img src={this.state.coins.image.large}/>
        :null }

        { this.state.coins.market_data ?
        <p style={{color:'green'}}>Current Price : {this.state.coins.market_data.current_price.usd}</p>
        :null }

        <TextField

          id="outlined-number"
          label="Quantity"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={ this.state.value }
          onChange= { this.handleOnChange }

        />
        <Button className='btn' variant='contained' color='primary' onClick={()=>this.handleClickBuy(this.state.coins)}>Buy</Button>
        <Button className='btn' variant='contained' color='primary' onClick={()=>this.handleClickSell(this.state.coins)}>Sell</Button>
          {
            this.state.coins.market_data ? 
          <p>
            Total value : {
            this.state.totalVal
          }
          </p>
          :null
        }
        </div>
      </React.Fragment>
    )
  }
}

export default Transactions