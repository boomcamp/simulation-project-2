import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import '../App.css';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class Transactions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      coins: [],
      totalVal: 0,
      getBal: [],
      open: false,
      disabled: true,
      quantity : 0,
      getPrice : []
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
      .then(getdata => {
        console.log(getdata)
        axios
        .get(`http://localhost:4000/transactions`,{
        })
        .then(getprice=>{
          console.log(getprice.data)
          this.setState({
            getPrice : getprice.data
          })
        })
      })
  }

  handleClickBuy = (e) => {
    let defaultNum = 1000000
    axios
      .post(`http://localhost:4000/transactions`,
        {
          transactions : 'BUY',
          name: e.name,
          current_price: e.market_data.current_price.usd,
          total_value: this.state.totalVal.toFixed(3),
          balance : localStorage.getItem('balance') - this.state.totalVal.toFixed(3), // Balance - Total value
          profit_loss : parseInt(defaultNum) - parseInt(localStorage.getItem('balance')) - parseInt(this.state.totalVal.toFixed(3)),
        })
      .then(resp => {
        console.log(resp)
        let lsBalance = localStorage.getItem('balance')               // 1,000,000
        let deducted = lsBalance - this.state.totalVal.toFixed(3)     // 1,000,000 - total value
        localStorage.setItem("balance", deducted) // set value of 1,000,000 - total value
    
        this.setState({
          openBuy : false,
          totalVal : 0,
          disabled : true
        })

      })
  }

  handleClickSell = (e) => {
    
    let defaultNum = 1000000
    axios
    .post(`http://localhost:4000/transactions`,{
    
    transactions : 'SELL',
    name : e.name,
    current_price : e.market_data.current_price.usd,
    total_value : this.state.totalVal.toFixed(3),
    balance : parseInt(localStorage.getItem('balance')) + parseInt(this.state.totalVal.toFixed(3)), 
    profit : parseInt(defaultNum) - parseInt(localStorage.getItem('balance')) - parseInt(this.state.totalVal.toFixed(3))


  })
    .then(responde=>{
      console.log(responde)
      let lsBalance = localStorage.getItem('balance')
      let val = this.state.totalVal.toFixed(3)
      let added = parseInt(lsBalance) + parseInt(val)
      localStorage.setItem('balance', added)

      this.setState({
        openSell : false,
        totalVal : 0,
        disabled : true
      })
      
    })
  }

  handleOnChange = (e) =>{
    if(e.target.value){
      this.setState({
        totalVal: this.state.coins.market_data.current_price.usd * e.target.value,
        disabled: false
      })
    }
    else{
      this.setState({
        disabled: true
      })
    }
  }

  handleClickOpenBuy=()=>{
    this.setState({
      openBuy : true
    })
  }
 
  handleClickOpenSell=()=>{
    this.setState({
      openSell : true
    })
  }

  handleClickCloseBuy=()=>{
    this.setState ({
      openBuy : false
    })
  }
  handleClickCloseSell=()=>{
    this.setState ({
      openSell : false
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
          onChange= { (e) => this.handleOnChange(e) }
          required
        />
        <Button className='btn' variant='contained' disabled={this.state.disabled} color='primary' onClick={()=>this.handleClickOpenBuy()}>Buy</Button>
        <Button className='btn' variant='contained' disabled={this.state.disabled} color='primary' onClick={()=>this.handleClickOpenSell()}>Sell</Button>
          {
            this.state.coins.market_data ? 
          <p>
            Total value : {
            this.state.totalVal
          }
          </p>
          :null
        }
        <Dialog
        open={this.state.openBuy}
        onClose={this.handleClickCloseBuy}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Transactions"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to Buy?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClickCloseBuy} color="primary">
            Disagree
          </Button>
          <Button onClick={() => this.handleClickBuy(this.state.coins)} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>



      <Dialog
        open={this.state.openSell}
        onClose={this.handleClickCloseSell}
        aria-labelledby="alert-dialog-title2"
        aria-describedby="alert-dialog-description2"
      >
        <DialogTitle id="alert-dialog-title2">{"Transactions"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description2">
            ARe you sure you want to Sell?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClickCloseSell} color="primary">
            Disagree
          </Button>
          <Button onClick={() => this.handleClickSell(this.state.coins)} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>


        </div>
      </React.Fragment>
    )
  }
}