import React, { Component } from 'react'
import { MDBContainer, MDBInputGroup, MDBCol, MDBRow, MDBIcon } from 'mdbreact'
export default class converter extends Component {
    constructor(){
        super();
        this.state ={
            convertedvalue: ''
        }
    }
    handlechange(e){
        // console.log(e)
        const converted = []
        if(e !== null){
            var convertvalue = e * this.props.price;
            converted.push(convertvalue)
        }
        this.setState({convertedvalue: converted})
    }
    render() {
        return (
            <div>
                <MDBContainer>
                    <MDBRow className="#e0e0e0 grey lighten-2 converter-padding">
                        <MDBCol lg="6"><MDBInputGroup min="0" type="number" containerClassName="mb-3" prepend={this.props.symbol} size="lg" onChange={(e) => this.handlechange(e.target.value)}/></MDBCol>
                        <MDBCol lg="1" className="converter-icon-padding"><MDBIcon icon="arrows-alt-h" size="3x"/></MDBCol>
                        <MDBCol lg="5"><MDBInputGroup containerClassName="mb-3" prepend="USD" size="lg" value={this.state.convertedvalue}/></MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }
}
