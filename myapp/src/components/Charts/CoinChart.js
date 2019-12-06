import React, { Component } from "react";
import { ResponsiveLine } from "@nivo/line";
import Axios from "axios";
export default class CoinChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }
  componentDidMount() {
    Axios.get(
      `https://api.coingecko.com/api/v3/coins/bitcoin
        `
    ).then(results => {
      console.log(results);
    });
  }

  render() {
    return <div></div>;
  }
}
