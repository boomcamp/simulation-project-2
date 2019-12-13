import React, { Component } from 'react'
import Investmentdata from './investment component/investmentdata';
import Profile from './investment component/profile';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import axios from 'axios';
export class investment extends Component {
    constructor(){
        super();
        this.state = {
            data: 'http://localhost:4000/transactions',
            InvestmentData: [],
            MarketPrice: []
        }
        
    }
    componentDidMount(){
        this.getData();
    }
    getData(){
        axios.get(this.state.data)
        .then(res =>{
            this.setState({ InvestmentData: res.data })
        })
    }
    componentDidUpdate(){
        this.getData()
    }
    render() {
        return (
            <MDBContainer className="container-height"><br /><br /><br /><br />
                <MDBRow>
                    <MDBCol lg="2"><Profile InvestmentData={this.state.InvestmentData}/></MDBCol>
                    <MDBCol lg="10"><Investmentdata InvestmentData={this.state.InvestmentData}/></MDBCol>
                </MDBRow>

            </MDBContainer>
        )
    }
}
export default investment
