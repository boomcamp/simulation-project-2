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
      amount: ""
    };
  }
  handleChange = e => {
    this.setState({
      amount: e.target.value,
      sum: e.target.value * this.props.price
    });
  };
  submitClick() {
    axios
      .post("http://localhost:4000/transactions", {
        amount: this.state.amount,
        sum: this.state.sum,
        price: this.props.price,
        symbol: this.props.id,
        image: this.props.image,
        name: this.props.name
      })
      .then(res => {
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
            />
            &nbsp;&nbsp;
            <Button
              type="primary"
              size="lg"
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
