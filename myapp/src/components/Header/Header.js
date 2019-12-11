import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse
} from "mdbreact";
export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.props.history.push("/investment");
    this.setState({
      collapse: !this.state.collapse
    });
  }
  render() {
    const bgPink = { backgroundColor: "#8dc647" };
    return (
      <div>
        <header>
          <MDBNavbar style={bgPink} dark expand="md" scrolling fixed="top">
            <MDBNavbarBrand href="/">
              <strong>Simulation Project 2</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.onClick} />
            <MDBCollapse isOpen={this.state.collapse} navbar>
              <span
                onClick={() => this.props.history.push("/investment")}
                // to="/investment"
              >
                <MDBNavbarNav right style={{ color: "white" }}>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="track">Investment Tracking</span>
                </MDBNavbarNav>
              </span>
              <MDBNavbarNav right></MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
        </header>
      </div>
    );
  }
}
