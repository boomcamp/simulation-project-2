import React, { Component } from "react";
import "./converter.css";
import { Icon, Button } from "antd";

import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
// import { InputNumber } from "antd";
import { MDBContainer, MDBInputGroup } from "mdbreact";
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
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const min = new Date().getMinutes();
    const sec = new Date().getSeconds();
    axios
      .post("http://localhost:4000/transactions", {
        date:
          date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec,
        amount: this.state.amount,
        sum: this.state.sum,
        price: this.props.price,
        symbol: this.props.id,
        image: this.props.image,
        name: this.props.name
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
              disabled={!this.state.amount}
            >
              Buy
            </Button>
          </MDBContainer>
        </div>
      </div>
    );
  }
}
