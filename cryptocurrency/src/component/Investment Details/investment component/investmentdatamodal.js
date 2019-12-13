import React, { Component } from 'react'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import Coindetails from '../investment component/detailsandhistory/coindetails';
export default class investmentdatamodal extends Component {
    constructor() {
        super();
        this.state = {
            modal: false,
            CoinPrice: [],
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        // console.log(this.state.CoinPrice)
        return (
            <div>
                <MDBContainer>
                    <MDBBtn onClick={this.toggle} size="sm">other Details</MDBBtn>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg" centered>
                        <MDBModalHeader toggle={this.toggle}>Data</MDBModalHeader>
                        <MDBModalBody>
                            <Coindetails id={this.props.id} PurchasedDate={this.props.PurchasedDate} CoinAmount={this.props.CoinAmount} CoinBalance={this.props.CoinBalance} price={this.props.price} />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="primary" size="sm" onClick={this.toggle}>Close</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>
            </div>
        )
    }
}
