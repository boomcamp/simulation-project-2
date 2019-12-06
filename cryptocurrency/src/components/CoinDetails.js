import React, { Component } from 'react'
import '../App.css'
import axios from 'axios'

class CoinDetails extends Component {

componentDidMount(){
  axios
    .get(`https://api.coingecko.com/api/v3/coins/${this.props.match.params.id}`, { 
    })
    .then(response => { 
        this.setState({
          coins:response.data
        })
    })
  }

  constructor(props) {
    super(props)

    this.state = {
      coins:[],    
    }
  }

  render() {
    console.log(this.state.coins)  
    console.log(this.state.coins.current_price)

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

        {/* <div className="desc">
          {
            this.state.coins.description ?
          <label>{this.state.coins.description.en}</label>
          : null
          }
        </div>   */}

        <div className="market-data">
        {
          this.state.coins.market_data ?
        <React.Fragment>
        <label>1 Year : {this.state.coins.market_data.price_change_percentage_1y}</label>
        <label>6 Months : {this.state.coins.market_data.price_change_percentage_200d} </label><br/>
        <label>1 Month : {this.state.coins.market_data.price_change_percentage_30d}</label><br/>
        <label>1 Week : {this.state.coins.market_data.price_change_percentage_7d}</label><br/>
        <label>24 hours : {this.state.coins.market_data.price_change_percentage_24h} </label>
        </React.Fragment>
        : null
        }
        </div>

      </div>
    )
  }
}
export default CoinDetails
