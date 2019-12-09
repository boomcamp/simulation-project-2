import React, { Component } from "react";
import Axios from "axios";
import { Radio } from "antd";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";
import "./coinChart.css";
export default class CoinChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      id: [],
      cap: []
    };
  }
  UNSAFE_componentWillReceiveProps() {
    //  console.log(this.state.id)
    Axios.get(
      `https://api.coingecko.com/api/v3/coins/${this.props.id.id}/market_chart?vs_currency=btc&days=1
        `
    ).then(res => {
      console.log(res);
      let results = res.data.prices.map(el => {
        return {
          name: new Date(el[0]).toLocaleDateString("en-US"),
          price: el[1]
        };
      });
      this.setState({ data: results });
    });
  }

  render() {
 
    return (
      <div className="mainContainer">
        <div>
          {/* <Homepage/> */}
        
        </div>

        <div className="radioGroup">
          <Radio.Group>
            <Radio.Button value="1">24h</Radio.Button>
            <Radio.Button value="7">7d</Radio.Button>
            <Radio.Button value="30">1m</Radio.Button>
            <Radio.Button value="180">6m</Radio.Button>
            <Radio.Button value="365">1yr</Radio.Button>
            <Radio.Button value="f">MAX</Radio.Button>
          </Radio.Group>
        </div>

        <LineChart
          width={730}
          height={250}
          data={this.state.data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" /> */}
          <Line type="monotone" dataKey="price" stroke="#82ca9d" />
        </LineChart>
      </div>
    );
  }
}
