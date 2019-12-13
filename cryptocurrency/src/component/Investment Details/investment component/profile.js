import React, { Component } from 'react'
import { MDBCard, MDBCardImage, MDBCardBody, MDBRow } from 'mdbreact'
import Wallet from '../investment component/WalletModal';
import SellingHistoyModal from '../investment component/sellingHistoyModal';
export class profile extends Component {
    render() {
        return (
            <div>
                <MDBCard style={{ width: "100%" }}>
                    <MDBCardImage className="img-fluid" src="https://coda.newjobs.com/api/imagesproxy/ms/cms/content30/images/cryptocurrency.jpg" waves />
                    <MDBCardBody>
                        <MDBRow>
                            <Wallet CoinData={this.props.InvestmentData}/>
                            <SellingHistoyModal />
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </div>
        )
    }
}

export default profile
