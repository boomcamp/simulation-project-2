import React, { Component } from "react";
import "./converter.css";
import { Icon, Button } from "antd";

import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
// import { InputNumber } from "antd";
import { MDBContainer, MDBInputGroup } from "mdbreact";
var dateFormat = require("dateformat");
var now = new Date();
export default class BuySell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sum: "",
      amount: "",
      date: "",
      visible: true
    };
  }
  handleChange = e => {
    this.setState({
      amount: e.target.value,
      sum: e.target.value * this.props.price
    });
  };
  handleUsd = e => {
    this.setState({
      amount: e.target.value / this.props.price,
      sum: e.target.value
    });
  };
  submitClick() {
    axios
      .post("http://localhost:4000/transactions", {
        date: dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT"),
        amount: this.state.amount,
        coinBalance: this.state.amount,
        sum: this.state.sum,
        price: this.props.price,
        symbol: this.props.id,
        image: this.props.image,
        name: this.props.name,
        status: "Not yet sold"
      })
      .then(res => {
        // Moment.locale("en");
        // // console.log(date);
        // console.log(Moment(date).format(`d MMM`));
        toast.success("You bought successfully!");
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({
      amount: "",
      sum: ""
    });
  }
  render() {
    return (
      <div className="buysell">
        <div className="center">
          {" "}
          <MDBContainer style={{ flexDirection: "row", display: "flex" }}>
            <MDBInputGroup
              containerClassName="mb-4"
              prepend={this.props.id}
              size="lg"
              value={this.state.amount}
              type="number"
              style={{ textTransform: "uppercase" }}
              onChange={e => this.handleChange(e)}
              placeholder="Enter amount"
            />
            &nbsp;&nbsp;
            <Icon type="swap" style={{ height: "50px", marginTop: "10px" }} />
            &nbsp;&nbsp;
            <MDBInputGroup
              containerClassName="mb-4"
              prepend="USD"
              size="lg"
              type="number"
              value={this.state.sum}
              onChange={e => this.handleUsd(e)}
            />
            &nbsp;&nbsp;
            <Button
              type="primary"
              size="large"
              style={{ height: "40px" }}
              onClick={event => this.submitClick()}
              disabled={
                !this.state.amount || this.state.amount === 0 ? true : false
              }
            >
              Buy
            </Button>
          </MDBContainer>
        </div>
      </div>
    );
  }
}
