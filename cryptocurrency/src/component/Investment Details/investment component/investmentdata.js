import React, { Component } from 'react'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import InvestmentDataModal from '../investment component/investmentdatamodal';
import SellCoin from '../investment component/sellcoinmodal';
import { ToastContainer } from 'react-toastify';
export class investmentdata extends Component {
    constructor() {
        super();
        this.state = {
            purchased: [],
            CoinPrice: [],
            data: []
        }
    }
    render() {
        return (
            <div>
                <ToastContainer />
                <MDBTable className="z-depth-1">
                
                <MDBTableHead>
                    <tr>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Amount Purchased</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {
                        this.props.InvestmentData.map(data => (
                            data.mode === 'buy' ?
                            <tr key={data.id}>
                                <td>{data.symbol}</td>
                                <td>{data.name}</td>
                                <td>{data.value}{" "}{data.symbol}</td>
                                <td>{"$" + data.price}</td>
                                <td>{"$" + data.Purchasedprice}</td>
                                <td><InvestmentDataModal PurchasedDate={data.DatePurchased} id={data.name} price={data.Purchasedprice} totalPurchase={data.price} CoinAmount={data.value} CoinBalance={data.CoinBalance}/></td>
                                <td><SellCoin mainID={data.id} id={data.name} price={data.Purchasedprice} totalPurchase={data.price} CoinAmount={data.value} CoinBalance={data.CoinBalance}/></td>
                            </tr>
                            : null 
                        ))
                    }
                </MDBTableBody>
            </MDBTable>
            </div>
        )
    }
}

export default investmentdata