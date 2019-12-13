import React, { Component } from 'react'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import Axios from 'axios';
export class coindetails extends Component {
    constructor() {
        super();
        this.state = {
            CoinPrice: [],
        }
    }
    componentDidMount() {
        Axios.get(`https://api.coingecko.com/api/v3/coins/${this.props.id}`)
            .then(res => {
                // console.log(res.data.market_data.current_price)
                this.setState({ CoinPrice: res.data.market_data.current_price })
            })
    }
    render() {
        return (
            <MDBTable className="z-depth-1">
                <MDBTableHead color="grey darken-2" textWhite>
                    <tr>
                        <th>Date of Purchase</th>
                        <th>Coin(Purchased Amount )</th>
                        <th>Coin Balance</th>
                        <th>Price(Before)</th>
                        <th>Market Price</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    <tr>
                        <td>{this.props.PurchasedDate}</td>
                        <td>{" " + this.props.CoinAmount}</td>
                        <td>{" " + this.props.CoinBalance}</td>
                        <td>{" $" + this.props.price}</td>
                        <td>{" $" + this.state.CoinPrice.usd}</td>
                    </tr>
                </MDBTableBody>
            </MDBTable>
        )
    }
}

export default coindetails
