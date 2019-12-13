import React, { Component } from "react";
import Axios from "axios";
import { Radio } from "antd";

import {
  // LineChart,
  // Line,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
  // Legend
} from "recharts";
import "./coinChart.css";
var commaNumber = require("comma-number");
export default class CoinChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      id: [],
      cap: []
    };
  }
  componentDidMount() {
    //  console.log(this.state.id)
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
    Axios.get(
      `https://api.coingecko.com/api/v3/coins/${this.props.id.id}/market_chart?vs_currency=usd&days=1
        `
    ).then(res => {
     // console.log(res);
      let results = res.data.prices.map(el => {
        return {
          date: new Date(el[0]).toLocaleDateString("en-US", options),
          price: el[1]
        };
      });
      this.setState({ data: results });
    });
  }

  handleClick = e => {
    console.log(e);
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
    Axios.get(
      `https://api.coingecko.com/api/v3/coins/${this.props.id.id}/market_chart?vs_currency=usd&days=${e}
      `
    ).then(res => {
      //console.log(res);
      let results = res.data.prices.map(el => {
        return {
          date: new Date(el[0]).toLocaleDateString("en-US", options),
          price: el[1]
        };
      });
      this.setState({ data: results });
    });
  };

  render() {
    //console.log(this.state.data);
    return (
      <div className="mainContainer">
        <div>{/* <Homepage/> */}</div>

        <div className="radioGroup">
          <Radio.Group defaultValue="1" buttonStyle="solid">
            <Radio.Button
              value="1"
              onClick={e => this.handleClick(e.target.value)}
            >
              24Hours
            </Radio.Button>
            <Radio.Button
              value="7"
              onClick={e => this.handleClick(e.target.value)}
            >
              7Days
            </Radio.Button>
            <Radio.Button
              value="30"
              onClick={e => this.handleClick(e.target.value)}
            >
              1Month
            </Radio.Button>
            <Radio.Button
              value="180"
              onClick={e => this.handleClick(e.target.value)}
            >
              6Months
            </Radio.Button>
            <Radio.Button
              value="365"
              onClick={e => this.handleClick(e.target.value)}
            >
              1Year
            </Radio.Button>
            <Radio.Button
              value="max"
              onClick={e => this.handleClick(e.target.value)}
            >
              MAX
            </Radio.Button>
          </Radio.Group>
        </div>

        <BarChart
          width={700}
          height={250}
          data={this.state.data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis dataKey="price" />
          <Tooltip />
          {/* <Legend /> */}
          {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" /> */}
          <Bar type="monotone" dataKey="price" stroke="#ff9900" />
        </BarChart>
      </div>
    );
  }
}
