import React, { Component } from 'react'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import axios from 'axios'
export class WalletModal extends Component {
    constructor() {
        super();
        this.state = {
            modal: false,
            WalletData: [],
        }
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });

    }
    componentDidMount() {
        axios.get(`http://localhost:4000/transactions`).then(response => {
            const data = []
            response.data.forEach(function (d) {
                if(d.mode === 'buy'){
                    data.push(d)
                }
            });
            this.getSum(data)
        });
    }
    getSum(data){
        let result = data.reduce((c, v) => {
            const num = parseFloat(v.CoinBalance)
            c[v.name] = (c[v.name] || 0) + num;
            return c;
        }, {});
        let newData = []
        for (var key in result) {
            newData.push({ coin: key, totalValue: result[key] })
        }
        this.setState({ WalletData: newData})
    }
    render() {
        return (
            <MDBContainer>
                <MDBBtn onClick={this.toggle} size="sm">Coin Wallet</MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg" centered>
                    <MDBModalHeader toggle={this.toggle}>Coin Wallet</MDBModalHeader>
                    <MDBModalBody>
                        <MDBTable className="z-depth-1">
                            <MDBTableHead color="grey darken-2" textWhite>
                                <tr>
                                    <th>Name</th>
                                    <th>Total Coin Balance</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {this.state.WalletData.map(walletData => (
                                    walletData.coin !== "" ?
                                        <tr key={walletData.coin}>
                                            <td>{walletData.coin}</td>
                                            <td>{walletData.totalValue}</td>
                                        </tr>
                                        : null
                                ))}
                            </MDBTableBody>
                        </MDBTable>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="primary" size="sm" onClick={this.toggle}>Close</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        )
    }
}

export default WalletModal
