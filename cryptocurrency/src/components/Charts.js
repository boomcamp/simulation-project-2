
import React, { PureComponent } from 'react';

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';


export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  render() {
    return (
      < AreaChart
        width={600}
        height={400}
        data={this.props.chartArr}
        margin={{
        top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey='date' />
        <YAxis domain={['auto', 'auto']} /> 
        <Tooltip />
        <Area type="monotone" dataKey='price' stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    )  
}
}