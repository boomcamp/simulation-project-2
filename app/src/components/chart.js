import React, { Component } from "react";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area
} from "recharts";

class chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      id: {}
    };
  }

  render() {
    return (
      <React.Fragment>
        <AreaChart
          width={1400}
          height={400}
          data={this.props.chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#304850" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#304850" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#304850" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#304850" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis domain={["auto", "auto"]} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#304850"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="pv"
            stroke="#304850"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </React.Fragment>
    );
  }
}
export default chart;
