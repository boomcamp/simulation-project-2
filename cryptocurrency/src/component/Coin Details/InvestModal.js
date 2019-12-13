import React, { Component } from 'react'
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBCol, MDBInputGroup, MDBIcon } from 'mdbreact';
import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export class InvestModal extends Component {
    constructor() {
        super();
        this.state = {
            modal: false,
            convertedvalue: '',
            value: '',
            mode: 'buy'
        }

    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    notify = () => toast.success("Investment success");
    notifyError = () => toast.error("Nothing to Invest, Please Input Data");
    handlechange = (e) => {
        const converted = []
        if (e !== null) {
            var convertvalue = e * this.props.price;
            converted.push(convertvalue)
            this.setState({ value: e })
        } else {
            converted.push('')
        }
        this.setState({ convertedvalue: converted })
    }
    onSubmitInvest = () => {
        if (this.state.convertedvalue && this.state.value !== '') {
            var date = new Date().getDate();
            var month = new Date().getMonth() + 1;
            var year = new Date().getFullYear();
            var hours = new Date().getHours();
            var min = new Date().getMinutes();
            const Day = "Date: " + month + "/" + date + "/" + year + " Time: " + hours + ":" + min
            Axios.post('http://localhost:4000/transactions',
                { "mode": this.state.mode, "name": this.props.id, "symbol": this.props.symbol, "price": this.state.convertedvalue, "value": this.state.value, "CoinBalance": this.state.value, "Purchasedprice": this.props.price, "DatePurchased": Day })
                .then(res => {
                    this.setState({ modal: false })
                    this.notify();
                }).catch(error => {
                    console.log(error + "on Investment")
                })
        } else {
            this.notifyError();
        }
    }
    render() {
        return (
            <div>
                <MDBBtn onClick={this.toggle}>Invest</MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered>
                    <MDBModalHeader toggle={this.toggle}>Invest</MDBModalHeader>
                    <MDBModalBody>
                        <MDBCol lg="12"><MDBInputGroup type="number" min="0" containerClassName="mb-3" prepend={this.props.symbol} size="lg" onChange={(e) => this.handlechange(e.target.value)} /></MDBCol>
                        <MDBCol lg="12"><MDBIcon className="converter-icon-padding-modal" icon="arrows-alt-v" size="3x" /></MDBCol><br />
                        <MDBCol lg="12"><MDBInputGroup containerClassName="mb -3" prepend="USD" size="lg" value={this.state.convertedvalue} /></MDBCol>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle}>Cancel</MDBBtn>
                        <MDBBtn color="primary" onClick={this.onSubmitInvest}>Invest</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </div>
        )
    }
}

export default InvestModal
