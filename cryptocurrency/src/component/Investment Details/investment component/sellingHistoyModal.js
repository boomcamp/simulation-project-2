import React, { Component } from 'react'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import SellingHistory from '../investment component/detailsandhistory/sellinghistory';

export class sellingHistoyModal extends Component {
    constructor(){
        super();
        this.state ={
            modal: false,
        }
    }
    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      }
    render() {
        return (
            <MDBContainer>
                <MDBBtn onClick={this.toggle} size="sm">History of Sold Coin</MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg" centered>
                    <MDBModalHeader toggle={this.toggle}>History of Sold Coin</MDBModalHeader>
                    <MDBModalBody>
                        <SellingHistory />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="primary" onClick={this.toggle} size="sm">Close</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        )
    }
}

export default sellingHistoyModal
