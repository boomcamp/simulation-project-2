import React, { Component } from 'react'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import Axios from 'axios';
import { toast } from 'react-toastify';
export class sellcoinmodal extends Component {
    constructor() {
        super();
        this.state = {
            modal: false,
            CoinPrice: [],
            SelltotalPrice: [],
            totalprofitandloss: [],
            sellprice: [],
            CoinAmountSelled: 0,
            CoinBalance: '',
            mode: 'sold',
            datesell: []
        }
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    componentDidMount() {
        this.onFetchCoin();
    }
    onFetchCoin = () => {
        Axios.get(`https://api.coingecko.com/api/v3/coins/${this.props.id}`)
            .then(res => {
                // console.log(res.data.market_data.current_price)
                this.setState({ CoinPrice: res.data.market_data.current_price })
            })
    }
    handlechange = (e) => {
        const CoinAmount = []
        const CoinBalance = []
        const computedselltotalprice = []
        const totalprofitandloss = []
        const datesell = []
        if (e !== null || "") {
            var date = new Date().getDate();
            var month = new Date().getMonth() + 1;
            var year = new Date().getFullYear();
            var hours = new Date().getHours();
            var min = new Date().getMinutes();
            const Day = "Date: " + month + "/" + date + "/" + year + " Time: " + hours + ":" + min
            var percentChange = this.state.CoinPrice.usd - this.props.price;
            var computedprice = e * this.state.CoinPrice.usd;
            var percentChange1 = (percentChange / this.props.price) * 100;
            var computedprofitloss = (percentChange1 / 100) * e;
            var coinbal = this.props.CoinBalance - e;

            datesell.push(Day)
            CoinBalance.push(coinbal)
            CoinAmount.push(parseInt(e))
            computedselltotalprice.push(computedprice)
            totalprofitandloss.push(computedprofitloss)
        }
        this.setState({ datesell: datesell, SelltotalPrice: computedselltotalprice, totalprofitandloss: totalprofitandloss, sellprice: this.state.CoinPrice.usd, CoinAmountSelled: CoinAmount, CoinBalance: CoinBalance })
    }
    onSell = () => {
        if (this.state.CoinAmountSelled !== 0) {
            Axios.post(`http://localhost:4000/transactions/`,
                { "name": this.props.id, "datesell": this.state.datesell, "CoinAmountSelled": this.state.CoinAmountSelled, "CoinId": this.props.mainID, "mode": this.state.mode, "totalprofitandloss": this.state.totalprofitandloss, "PriceOnsell": this.state.sellprice })
                .then(res => {
                    this.notifysuccess()
                    this.setState({ modal: false })
                    this.onUpdate();
                }).catch(error => {
                    console.log(error + "on Selling")
                })
            
        } else {
            this.notifyError()
        }
    }
    onUpdate = () =>{
        Axios.patch(`http://localhost:4000/transactions/${this.props.mainID}`,
                { "CoinBalance": this.state.CoinBalance })
                .then(res => {
                    this.setState({ modal: false })
                }).catch(error => {
                    console.log(error + "on Selling")
                })
    }
    notifysuccess = () => toast.success("Selling Success");
    notifyError = () => toast.error("Put Coin Amount to sell");
    render() {
        return (
            <div>
                <MDBContainer>
                    <MDBBtn onClick={this.toggle} size="sm">Sell</MDBBtn>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg" centered>
                        <MDBModalHeader toggle={this.toggle}>Sell Coin</MDBModalHeader>
                        <MDBModalBody>
                            <MDBTable className="z-depth-1">
                                <MDBTableHead color="grey darken-2" textWhite>
                                    <tr>
                                        <th>Coin Balance</th>
                                        <th>Price Upon Purchased</th>
                                        <th>Updated Market Price</th>
                                        <th>Profit/Loss Per 1 Coin</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    <tr>
                                        <td>{" " + this.props.CoinBalance}</td>
                                        <td>{" $" + this.props.price}</td>
                                        <td>{" $" + this.state.CoinPrice.usd}</td>
                                        <td className={(this.state.CoinPrice.usd - this.props.price < 0 ? "red-text" : "green-text")}>{" $" + (this.state.CoinPrice.usd - this.props.price)}</td>
                                    </tr>
                                </MDBTableBody>
                            </MDBTable>
                            <MDBTable className="z-depth-1">
                                <MDBTableHead color="grey darken-2" textWhite>
                                    <tr>
                                        <th>Coin Amount</th>
                                        <th>Total Price</th>
                                        <th>Total Profit/Loss</th>
                                        <th>Action</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    <tr>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="formGroupExampleInput"
                                                min="0"
                                                max={this.props.CoinBalance}
                                                placeholder="Amount"
                                                onChange={(e) => this.handlechange(e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="formGroupExampleInput"
                                                min="0"
                                                value={"$" + this.state.SelltotalPrice}
                                                placeholder="Total Price"
                                                readOnly
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                id="formGroupExampleInput"
                                                min="0"
                                                value={"$" + this.state.totalprofitandloss}
                                                placeholder="Total Profit Loss"
                                                readOnly
                                                className={(this.state.totalprofitandloss > 0 ? "form-control is-valid" : this.state.totalprofitandloss < 0 ? "form-control is-invalid" : "form-control")}
                                            />
                                        </td>
                                        <td>
                                            <button className="form-control danger-color" id="formGroupExampleInput" onClick={() => this.onSell()}>
                                                Sell
                                            </button>
                                        </td>
                                    </tr>
                                </MDBTableBody>
                            </MDBTable>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="primary" size="sm" onClick={this.toggle}>Cancel</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>
            </div>
        )
    }
}

export default sellcoinmodal
