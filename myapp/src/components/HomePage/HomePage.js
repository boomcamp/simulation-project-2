import React, { Component } from "react";
import axios from "axios";
import CoinsList from "../CoinsList/CoinsList";
import "./homepage.css";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";
export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      collapse: false
    };
    this.onClick = this.onClick.bind(this);
  }
  componentDidMount() {
    let currentComponent = this;
    axios
      .get("https://api.coingecko.com/api/v3/coins/list")
      .then(function(results) {
        //console.log(results.data);
        currentComponent.setState({
          coins: results.data
        });
      });
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
        <Router>
          <header>
            <MDBNavbar style={bgPink} dark expand="md" scrolling fixed="top">
              <MDBNavbarBrand href="/">
                <strong>Simulation Project 2</strong>
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.onClick} />
              <MDBCollapse isOpen={this.state.collapse} navbar>
                <span onClick={() => this.props.history.push("/investment")}>
                  <MDBNavbarNav right style={{ color: "white" }}>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="track">Investment Tracking</span>
                  </MDBNavbarNav>
                </span>
                <MDBNavbarNav right></MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
          </header>

          <MDBContainer fluid style={{ height: "auto" }} className="mt-5">
            <br></br>
            <br></br>
            <span
              style={{
                justifyContent: "center",
                textAlign: "center",
                display: "flex",
                fontWeight: "bold",
                fontSize: 20
              }}
            >
              Top 100 Coins by Market Capitalization
            </span>
            <br></br>
            <CoinsList />
            <br></br>
          </MDBContainer>
        </Router>
      </div>
    );
  }
}
