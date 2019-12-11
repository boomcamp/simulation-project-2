import React, { Component } from "react";
import axios from "axios";
import "./investment.css";
import {
  MDBDataTable,
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse
} from "mdbreact";
var commaNumber = require("comma-number");
export default class Investment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      collapse: false,
      details: []
    };
    this.onClick = this.onClick.bind(this);
  }
  componentDidMount() {
    axios.get("http://localhost:4000/transactions").then(res => {
      res.data.map(info => {
        this.setState({
          details: this.state.details.concat({
            amount: <span className="det">{info.amount}</span>,
            sum: <span className="det">$ ${commaNumber(info.sum)}</span>,
            price: <span className="det">$ ${commaNumber(info.price)}</span>,
            symbol: <span className="det">{info.symbol}</span>,
            image: <img src={info.image} alt="" />,
            name: <span className="det">{info.name}</span>
          })
        });
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
    const data = {
      columns: [
        {
          label: "Logo",
          field: "image",
          sort: "asc",
          width: 100
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
          width: 150
        },
        {
          label: "Symbol",
          field: "symbol",
          sort: "asc",
          width: 270
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
          width: 200
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
          width: 100
        },
        {
          label: "Total",
          field: "sum",
          sort: "asc",
          width: 150
        }
      ],
      rows: this.state.details
    };
    return (
      <div>
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
          <MDBDataTable striped hover data={data} />
          <br></br>
        </MDBContainer>
      </div>
    );
  }
}
