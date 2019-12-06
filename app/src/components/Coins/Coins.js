import React from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import Axios from "axios";

const Div = styled.div`
  margin: 15px 0 0 0;
  width: 50%;
  box-sizing: border-box;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;
const Div2 = styled.div`
  margin: 15px 0 0 0;
  width: 15%;
  box-sizing: border-box;
  display: flex;
`;
export default class Coins extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      days: ""
    };
  }
  componentDidMount() {
    Axios.get(
      `https://api.coingecko.com/api/v3/coins/${this.props.match.params.id}/market_chart?vs_currency=${this.props.currency.value}&days=30`
    )
      .then(res => {
        this.setState({
          data: res.data.prices.map(x => {
            const new_date = new Date(x[0]);
            const month = [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec"
            ];
            return {
              Date: month[new_date.getMonth()] + " " + new_date.getFullYear(),
              Price: x[1]
            };
          })
        });
      })
      .catch(res => alert(res.data.value));
    Axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${this.props.currency.value}&ids=${this.props.match.params.id}`
    ).then(res => {
      console.log(res.data[0]);
    });
  }
  render() {
    return (
      <React.Fragment>
        <Div2></Div2>
        <Div>
          <LineChart width={900} height={400} data={this.state.data}>
            <Line type="monotone" dataKey="Price" dot={false} />
            <CartesianGrid stroke="#ccc" vertical={false} />
            <XAxis dataKey="Date" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </Div>
      </React.Fragment>
    );
  }
}
