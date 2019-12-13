import React, { Component } from "react";
import { Button } from "antd";
import { Collapse, Icon, InputNumber, Input, message, Popconfirm } from "antd";
import "./transactions.css";
import axios from "axios";
import Buy from "../Buy/Buy";
export default class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: true,
      totalAmount: null,
      usdAmount: null,
      cryptoAmount: null,
      cryptoImage: [],
      id: null,
      date: "",

      currentPrice: [],
      symbol: [],
      buyCoins: [],
      coinsAmount: [],
      crypt: []
    };
  }
  handleClickBuy = () => {
    if (this.state.totalAmount === "" || this.state.totalAmount === 0) {
      message.warning("Please input Some " + this.state.id + " amount");
    } else {
      axios
        .post(`http://localhost:4000/transactions`, {
          totalAmount: this.state.totalAmount,
          usdAmount: this.state.usdAmount,
          cryptoAmount: this.state.cryptoAmount,
          cryptoImage: this.state.cryptoImage,
          name: this.state.id,
          date: this.state.date,
          symbol: this.state.symbol
        })
        .then(res => {
          // console.log(res);
          message.info("You bought successfully ");
        })
        .catch(err => {
          message.error(err);
        });
      this.setState({
        value: 0,
        totalAmount: "",
        disabled: false
      });
    }
    let name = this.state.name;
    let a = 0;
    let c = 0;

    axios.get(`http://localhost:4000/transactions`).then(el => {
      // console.log(array1.reduce(reducer));
      console.log(el);
      el.data.map(se => {
        let crypt = se.cryptoAmount;

        if (name === se.name) {
          a += parseFloat(se.usdAmount);
          c += parseFloat(se.cryptoAmount);
          // console.log(se.name)
          // console.log(se);
          console.log(se.cryptoAmount);
          // console.log(a);
          // console.log(c);
          this.setState({
            buyCoins: se,
            coinsAmount: a,
            crypt: c
          });
        } else {
        }
      });
    });
  };

  onChange = value => {
    var options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
      seconds: "numeric"
    };
    console.log(value * this.props.coinsPrice);
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds

    this.setState({
      date:
        date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec,
      disabled: false,
      usdAmount: this.props.coinsPrice,
      totalAmount: value * this.props.coinsPrice,
      cryptoAmount: value,
      cryptoImage: this.props.coinsImg,
      id: this.props.id,
      symbol: this.props.symbol
      // currentPrice:this.props.
    });
  };

  render() {
    // console.log(this.props);
    //console.log(this.state.sum);
    // console.log(this.state.date);
    return (
      <div>
        <div className="transContainer">
          <div className="buyCoins">
            <Popconfirm
              placement="topLeft"
              title="Are you sure to buy?"
              onConfirm={this.handleClickBuy}
              okText={"Yes"}
              cancelText="No"
              disabled={this.state.disabled}
            >
              <Button
                icon="shopping-cart"
                style={{ backgroundColor: "whitesmoke" }}
                disabled={this.state.disabled}
              >
                Buy
              </Button>
            </Popconfirm>
          </div>
          {/* <div className="sellCoins">
            <Button icon="shopping-cart" type="primary" onClick={this.toggle}>
              Sell
            </Button>
          </div> */}
        </div>
        <div className="inputCon">
          <div className="inputNumbuy">
            <p style={{ display: "inline-flex" }}>
              {this.props.symbol}
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                formatter={value =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={value => value.replace(/\$\s?|(,*)/g, "")}
                onChange={this.onChange}
                addonBefore={this.props.symbol}
              />
            </p>
            {/* <InputNumber
              min={1}
              max={1000000000}
              onChange={this.onChange}
            /> */}
            <div className="icons">
              {" "}
              <Icon type="swap" />
            </div>
          </div>

          <div className="inputNumbuy">
            <Input addonBefore="$" value={this.state.totalAmount} />
            <div>
              {/* currentPrice: [],
      symbol:[],
      buyCoins: [],
      coinsAmount: [],
      crypt: [] */}
              {/* <Buy usd = {this.state.coinsAmount}/> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
