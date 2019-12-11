import React, { Component } from "react";
import "../../../node_modules/react-vis/dist/style.css";
import axios from "axios";
import { Radio } from "antd";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  LineSeries,
  Crosshair
} from "react-vis";
export default class Chart extends Component {
  constructor() {
    super();
    this.state = {
      id: [],
      datas: [],
      price: [],
      prices: [],
      crosshairValues: []
    };
  }
  componentDidMount() {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${this.props.id.id}/market_chart?vs_currency=usd&days=1`
      )
      .then(res => {
        // console.log(res);
        const datas = [];
        res.data.prices.map(prices => {
          const date = new Date(prices["0"]);
          return datas.push({ x: date, y: prices[1] });
        });
        this.setState({
          price: datas
        });
      });
  }
  usd;
  handleClick = e => {
    //console.log(e);
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${this.props.id.id}/market_chart?vs_currency=usd&days=${e}`
      )
      .then(res => {
        // console.log(res);
        const datas = [];
        res.data.prices.map(prices => {
          const date = new Date(prices["0"]);
          return datas.push({ x: date, y: prices[1] });
        });
        this.setState({
          price: datas
        });
      });
  };
  render() {
    return (
      <div className="chart">
        <br />
        <Radio.Group
          defaultValue="a"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Radio.Button
            value="1"
            onClick={e => this.handleClick(e.target.value)}
          >
            24 Hours
          </Radio.Button>
          <Radio.Button
            value="7"
            onClick={e => this.handleClick(e.target.value)}
          >
            1 Week
          </Radio.Button>
          <Radio.Button
            value="30"
            onClick={e => this.handleClick(e.target.value)}
          >
            1 Month
          </Radio.Button>
          <Radio.Button
            value="180"
            onClick={e => this.handleClick(e.target.value)}
          >
            6 Months
          </Radio.Button>
          <Radio.Button
            value="365"
            onClick={e => this.handleClick(e.target.value)}
          >
            1 Year
          </Radio.Button>
          <Radio.Button
            value="max"
            onClick={e => this.handleClick(e.target.value)}
          >
            All Time
          </Radio.Button>
        </Radio.Group>
        <XYPlot
          margin={50}
          width={1100}
          height={400}
          onMouseLeave={() => this.setState({ crosshairValues: [] })}
        >
          <VerticalGridLines />
          <XAxis xType="time" />
          <YAxis />
          <LineSeries
            data={this.state.price}
            onNearestX={datas => {
              // console.log(index);
              const data = [];

              data.push(datas);
              // console.log(data);
              this.setState({ crosshairValues: data });
            }}
            style={{ color: "blue" }}
          />

          <Crosshair values={this.state.crosshairValues}></Crosshair>
        </XYPlot>
      </div>
    );
  }
}
