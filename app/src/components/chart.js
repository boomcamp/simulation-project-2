import React, { Component } from "react";
import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

class chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: [0],
      date: [1],
      data: []
    };
  }
  componentDidMount(e) {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=50`
      )
      .then(res => {
        console.log(res);
        var arr = res.data.prices.map(x => {
          return {
            name: new Date(x[0]).toLocaleDateString("en-US"),
            uv: x[1]
          };
        });
        this.setState({ data: arr });
      });
  }
  render() {
    return (
      <LineChart
        width={1350}
        height={400}
        data={this.state.data}
        margin={{ top: 55, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    );
  }
}
export default chart;
