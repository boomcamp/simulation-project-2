import React, { Component } from "react";
import "./details.css";
import axios from "axios";
export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: []
    };
  }
  componentWillReceiveProps() {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${this.props.id.id}`)
      .then(res => {
        // console.log(res.data);
        this.setState({
          one: res.data.market_data.price_change_percentage_1h_in_currency.usd,
          tfour: res.data.market_data.price_change_percentage_24h,
          seven: res.data.market_data.price_change_percentage_7d,
          fourteen: res.data.market_data.price_change_percentage_14d,
          thirty: res.data.market_data.price_change_percentage_30d,
          year: res.data.market_data.price_change_percentage_1y
        });
      });
  }
  render() {
    return (
      <div>
        <table className="table">
          <tbody>
            <tr>
              <td>1h</td>
              <td>24h</td>
              <td>7d</td>
              <td>14d</td>
              <td>30d</td>
              <td>1y</td>
            </tr>
            <tr>
              <td
                style={{
                  color:
                    Math.round(10 * this.state.one) / 10 < 0 ? "red" : "green"
                }}
              >
                {Math.round(10 * this.state.one) / 10}%
              </td>
              <td
                style={{
                  color:
                    Math.round(10 * this.state.tfour) / 10 < 0 ? "red" : "green"
                }}
              >
                {Math.round(10 * this.state.tfour) / 10}%
              </td>
              <td
                style={{
                  color:
                    Math.round(10 * this.state.seven) / 10 < 0 ? "red" : "green"
                }}
              >
                {Math.round(10 * this.state.seven) / 10}%
              </td>
              <td
                style={{
                  color:
                    Math.round(10 * this.state.fourteen) / 10 < 0
                      ? "red"
                      : "green"
                }}
              >
                {Math.round(10 * this.state.fourteen) / 10}%
              </td>
              <td
                style={{
                  color:
                    Math.round(10 * this.state.thirty) / 10 < 0
                      ? "red"
                      : "green"
                }}
              >
                {Math.round(10 * this.state.thirty) / 10}%
              </td>
              <td
                style={{
                  color:
                    Math.round(10 * this.state.year) / 10 < 0 ? "red" : "green"
                }}
              >
                {Math.round(10 * this.state.year) / 10}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
