import React, { Component } from "react";
import "../../../node_modules/react-vis/dist/style.css";
import axios from "axios";
import { XYPlot, XAxis, YAxis, VerticalGridLines, LineSeries } from "react-vis";
export default class Chart extends Component {
  constructor() {
    super();
    this.state = {
      // prices: []
    };
  }
  componentDidMount() {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=btc&days=1"
      )
      .then(res => {
        res.data.prices.map(prices => {
          console.log(prices);
          this.setState({
            prices: prices
          });
        });
      });
  }
  render() {
    return (
      <XYPlot margin={50} width={1000} height={500}>
        <VerticalGridLines />
        <XAxis />
        <YAxis />
        <LineSeries
          data={[
            { x: 1, y: 10 },
            { x: 2, y: 5 },
            { x: 2, y: 14 },
            { x: 3, y: 15 }
          ]}
        />
      </XYPlot>
    );
  }
}
