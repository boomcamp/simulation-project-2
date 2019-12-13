import React, { Component } from "react";
import "../../node_modules/react-vis/dist/style.css";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

import Button from "@material-ui/core/Button";
export default class chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: [],
      chartArray: []
    };
  }
  c;
  componentDidMount() {
    this.setState({ details: this.props.id });

    if (this.props.id) {
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${localStorage.getItem(
            "id"
          )}/market_chart?vs_currency=usd&days=1`
        )
        .then(res => {
          let temp = [];
          res.data.prices.map(elem => {
            return temp.push({
              date: new Date(elem[0]).toLocaleDateString("en-US"),
              price: elem[1]
            });
          });
          this.setState({
            chartArray: temp
          });
        });
    }
    this.handleChange(1);
  }

  handleChange = e => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${localStorage.getItem(
          "id"
        )}/market_chart?vs_currency=usd&days=${e}`
      )
      .then(res => {
        let temp = [];
        res.data.prices.map(elem => {
          return temp.push({
            date: new Date(elem[0]).toLocaleDateString("en-US"),
            price: elem[1]
          });
        });
        this.setState({
          chartArray: temp
        });
      });
  };
  render() {
    return (
      <React.Fragment>
        <table className="table" align="center">
          <tbody>
          <tr
            style={{
              fontSize: 20,
              letterSpacing: 1.5
            }}
          >
            <td>1h</td>
            <td>24h</td>
            <td>7d</td>
            <td>14d</td>
            <td>30d</td>
            <td>1y</td>
          </tr>
          </tbody>
          <tbody>
          <tr>
            {/* row1 */}
            <td
              style={{
                color:
                  Math.round(10 * this.props.rowone) / 10 < 0 ? "red" : "green"
              }}
            >
              {Math.round(10 * this.props.rowone) / 10 + "%"}
            </td>
            {/* row2 */}
            <td
              style={{
                color:
                  Math.round(10 * this.props.rowtwo) / 10 < 0 ? "red" : "green"
              }}
            >
              {Math.round(10 * this.props.rowtwo) / 10 + "%"}
            </td>
            {/* row3 */}
            <td
              style={{
                color:
                  Math.round(10 * this.props.rowthree) / 10 < 0
                    ? "red"
                    : "green"
              }}
            >
              {Math.round(10 * this.props.rowthree) / 10 + "%"}
            </td>
            {/* row4 */}
            <td
              style={{
                color:
                  Math.round(10 * this.props.rowfour) / 10 < 0 ? "red" : "green"
              }}
            >
              {Math.round(10 * this.props.rowfour) / 10 + "%"}
            </td>
            {/* row5 */}
            <td
              style={{
                color:
                  Math.round(10 * this.props.rowfive) / 10 < 0 ? "red" : "green"
              }}
            >
              {Math.round(10 * this.props.rowfive) / 10 + "%"}
            </td>
            {/* row6 */}
            <td
              style={{
                color:
                  Math.round(10 * this.props.rowsix) / 10 < 0 ? "red" : "green"
              }}
            >
              {Math.round(10 * this.props.rowsix) / 10 + "%"}
            </td>
          </tr>
          </tbody>
        </table>
        <div
          style={{
            marginLeft: "3%",
            marginTop:"1%"
          }}
        >
          <Button variant="contained" color="primary" onClick={() => this.handleChange(1)}>
            24 Hours
          </Button>
          <Button variant="contained" color="primary" onClick={() => this.handleChange(7)}>
            1 Week
          </Button>
          <Button variant="contained" color="primary"  onClick={() => this.handleChange(30)}>
            1 Month
          </Button>
          <Button variant="contained" color="primary"  onClick={() => this.handleChange(200)}>
            6 Months
          </Button>
          <Button variant="contained" color="primary"  onClick={() => this.handleChange(360)}>
            1 Year
          </Button>
          <Button variant="contained"  color="primary" onClick={() => this.handleChange(11430)}>
            All time
          </Button>
        </div>

        <AreaChart
          width={1850}
          height={500}
          data={this.state.chartArray}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" domain={["auto", "auto"]} />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </React.Fragment>
    );
  }
}
