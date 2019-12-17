import React, { Component } from "react";
import axios from "axios";
import "./investment.css";
import "react-toastify/dist/ReactToastify.css";
import CoinWallet from "../CoinWallet/CoinWallet";
import { Tabs, notification } from "antd";
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
import Moment from "moment";
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
      mkc: "",
      datas: []
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:4000/transactions").then(res => {
      res.data.map(info => {
        this.setState({
          details: this.state.details.concat({
            amount: info.amount + ` ${info.symbol}`,
            sum: (
              <span style={{ color: "#42a5f5" }}>
                $ ${commaNumber(info.sum)}
              </span>
            ),
            price: (
              <span style={{ color: "#009688" }}>
                $ ${commaNumber(info.price)}
              </span>
            ),
            name: info.name,
            date: info.date,
            status: info.status,
            option: (
              <MDBBtn
                color={info.status === "Sold" ? "danger" : "info"}
                // onClick={this.toggle}
                disabled={info.status === "Sold" ? true : false}
                size="sm"
                onClick={e => this.handleClick(info)}
              >
                {/* {(info.status = "Sold" ? <span>Sold</span> : <span>Sell</span>)} */}
                {info.status === "Sold" ? <span>Sold</span> : <span>Sell</span>}
              </MDBBtn>
            )
          })
        });
      });
    });
  }

  loadAgain = () => {
    this.setState({ details: [] });
    axios.get("http://localhost:4000/transactions").then(res => {
      res.data.map(info => {
        // console.log(info.sta);
        this.setState({
          details: this.state.details.concat({
            amount: info.amount + ` ${info.symbol}`,
            sum: `$ ${commaNumber(info.sum)}`,
            price: `$ ${commaNumber(info.price)}`,
            name: info.name,
            date: info.date,
            status: info.status,
            option: (
              <MDBBtn
                color={info.status === "Sold" ? "danger" : "info"}
                // onClick={this.toggle}
                disabled={info.status === "Sold" ? true : false}
                size="sm"
                onClick={e => this.handleClick(info)}
              >
                {/* {(info.status = "Sold" ? <span>Sold</span> : <span>Sell</span>)} */}
                {info.status === "Sold" ? <span>Sold</span> : <span>Sell</span>}
              </MDBBtn>
            )
          })
        });
      });
    });
  };

  handleClick = e => {
    // console.log(e.name);
    axios.get(`https://api.coingecko.com/api/v3/coins/${e.name}`).then(res => {
      const profit =
        res.data.market_data.current_price.usd * e.amount - e.price * e.amount;
      this.setState({
        datas: e,
        image: res.data.image.small,
        symbol: res.data.symbol,
        modal: !this.state.modal,
        name: res.data.id,
        mkc: res.data.market_data.current_price.usd,
        balance: e.amount,
        profits: profit
      });
    });
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  handleSell = type => {
    notification[type]({
      style: {
        backgroundColor: "",
        color: "white",
        marginTop: "50px"
      },
      message: "Sold Successfully!"
    });
    // console.log(this.state.datas.id);
    const id = this.state.datas.id;
    const amnt = this.state.datas.amount;
    const bal = this.state.datas.coinBalance;
    const results = amnt - bal;

    axios
      .patch(`http://localhost:4000/transactions/${id}`, {
        amount: this.state.amount,
        coinBalance: results,
        sum: this.state.sum,
        price: this.props.price,
        symbol: this.props.id,
        image: this.props.image,
        name: this.props.name,
        status: "Sold"
      })
      .then(res => {
        this.setState({
          modal: false
        });
        this.loadAgain();
      });
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
          label: "Status",
          field: "status",
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
              <MDBBtn
                color="primary"
                onClick={() => this.handleSell("success")}
              >
                Proceed
              </MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        </MDBContainer>
      </div>
    );
  }
}
