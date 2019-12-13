import React, { Component } from 'react'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import Axios from 'axios';
export class sellinghistory extends Component {
    constructor() {
        super();
        this.state = {
            HistorySold: []
        }
    }
    componentDidMount() {
        Axios.get(`http://localhost:4000/transactions`)
            .then(res => {
                this.setState({
                    HistorySold: res.data
                })
            })
    }
    render() {
        return (
            <MDBTable className="z-depth-1">
                <MDBTableHead color="grey darken-2" textWhite>
                    <tr>
                        <th>Coin Name</th>
                        <th>Date of Selled</th>
                        <th>Coin Amount</th>
                        <th>Price</th>
                        <th>Gain</th>
                        <th>Loss</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {this.state.HistorySold.map(res => (
                        res.mode === 'sold' ?
                        <tr key={res.id}>
                            <td>{res.name}</td>
                            <td>{res.datesell}</td>
                            <td>{res.CoinAmountSelled}</td>
                            <td>{res.PriceOnsell}</td>
                            <td>{res.totalprofitandloss < 0 ? "$0" : "$"+res.totalprofitandloss}</td>
                            <td>{res.totalprofitandloss > 0 ? "$0" : "$"+res.totalprofitandloss}</td>
                        </tr> 
                        : null
                    ))}

                </MDBTableBody>
            </MDBTable>
        )
    }
}

export default sellinghistory
