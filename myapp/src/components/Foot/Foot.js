import React, { Component } from 'react'
import './footer.css'
export default class Foot extends Component {
    render() {
        return (
            <div className="footer">
              <div className='wrap'>  Powered By:<a href='https://www.coingecko.com/api/documentations/v3#/' target="_blank">CoinGecko API</a></div>
            </div>
        )
    }
}
