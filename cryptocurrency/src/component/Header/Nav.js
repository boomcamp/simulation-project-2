import React, { Component } from 'react'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,  MDBFormInline } from "mdbreact";
export class Nav extends Component {
    constructor(){
        super();
        this.state = {
                isOpen: false
        }
    }
    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
      }

    render() {
        return (
                <MDBNavbar className="special-color-dark z-depth-2" dark expand="md" scrolling fixed="top">
                    <MDBNavbarBrand>
                        <strong className="white-text">Cryptocurrency</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                        <MDBNavbarNav right>
                            <MDBNavItem>
                                <MDBNavLink to="/">Home</MDBNavLink>
                            </MDBNavItem>
                        </MDBNavbarNav>
                        <MDBNavbarNav right>
                            <MDBNavItem>
                                <MDBFormInline waves>
                                    <div className="md-form my-0">
                                        <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                                    </div>
                                </MDBFormInline>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
        )
    }
}

export default Nav
