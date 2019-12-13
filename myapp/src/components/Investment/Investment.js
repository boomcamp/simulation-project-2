import React, { Component } from "react";
import axios from "axios";
import "./investment.css";
import Moment from "moment";
import CoinWallet from "../CoinWallet/CoinWallet";
import { Tabs } from "antd";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";
import {
  MDBDataTable,
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from "mdbreact";
var commaNumber = require("comma-number");
const { TabPane } = Tabs;
Moment.locale("en");
export default class Investment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      coins: [],
      collapse: false,
      details: [],
      name: "",
      mkc: ""
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:4000/transactions").then(res => {
      res.data.map(info => {
        this.setState({
          details: this.state.details.concat({
            amount: info.amount + ` ${info.symbol}`,
            sum: `$ ${commaNumber(info.sum)}`,
            price: `$ ${commaNumber(info.price)}`,
            name: info.name,
            date: info.date,
            option: (
              <MDBBtn
                color="info"
                // onClick={this.toggle}
                size="sm"
                value={JSON.stringify(info)}
                onClick={e => this.handleClick(e.target.value)}
              >
                Sell
              </MDBBtn>
            )
          })
        });
      });
    });
  }
  handleClick = e => {
    const x = JSON.parse(e);
    console.log(x);
    // console.log(x.amount);
    axios.get(`https://api.coingecko.com/api/v3/coins/${x.name}`).then(res => {
      const profit =
        res.data.market_data.current_price.usd * x.amount - x.price * x.amount;
      // const finalprof = (profit / x.price) * 100;
      // console.log(finalprof);
      this.setState({
        image: res.data.image.small,
        symbol: res.data.symbol,
        modal: !this.state.modal,
        name: res.data.id,
        mkc: res.data.market_data.current_price.usd,
        balance: x.amount,
        profits: profit
      });
    });
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  handleSell = () => {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const min = new Date().getMinutes();
    const sec = new Date().getSeconds();
    axios
      .put("http://localhost:4000/transactions", {
        date:
          date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec,
        amount: this.state.amount,
        coinBalance: this.state.amount,
        sum: this.state.sum,
        price: this.props.price,
        symbol: this.props.id,
        image: this.props.image,
        name: this.props.name
      })
      .then(res => {});
  };
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
          label: "Name",
          field: "name",
          sort: "asc",
          width: 150
        },
        {
          label: "Price Upon Purchased",
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
          label: "Total/USD",
          field: "sum",
          sort: "asc",
          width: 150
        },
        {
          label: "Date Purchased",
          field: "date",
          sort: "asc",
          width: 150
        },
        {
          label: "Action",
          field: "option",
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
          <Tabs>
            <TabPane tab="Transactions" key="1">
              <MDBDataTable striped hover data={data} />
            </TabPane>
            <TabPane tab="Coin Wallet" key="2">
              <CoinWallet />
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              Content of tab 3
            </TabPane>
          </Tabs>
          <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg">
            <MDBModalHeader toggle={this.toggle}>
              <span style={{ textTransform: "uppercase", color: "gray" }}>
                Are you sure you want to sell this&nbsp;
                {this.state.name}&nbsp;
                <img src={this.state.image} height="25px" alt="" /> ?
              </span>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBTable>
                <MDBTableHead style={{ fontSize: "20px" }}>
                  <tr>
                    <th>Market Price</th>
                    <th>Coin Balance</th>
                    <th>
                      {this.state.profits > 0 ? "Total Profit" : "Total Loss"}
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  <tr>
                    <td>
                      <span style={{ color: "black" }}>{this.state.mkc}</span>
                    </td>
                    <td>
                      {this.state.balance} {this.state.symbol}
                    </td>

                    <td>
                      {this.state.profits > 0 ? (
                        <span style={{ color: "green" }}>
                          {Math.round(10 * this.state.profits) / 10} usd
                        </span>
                      ) : (
                        <span style={{ color: "red" }}>
                          {Math.round(10 * this.state.profits) / 10} usd
                        </span>
                      )}
                    </td>
                  </tr>
                </MDBTableBody>
              </MDBTable>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn onClick={this.toggle} color="info">
                Close
              </MDBBtn>
              <MDBBtn color="primary" onClick={this.handleSell}>
                Proceed
              </MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        </MDBContainer>
      </div>
    );
  }
}
