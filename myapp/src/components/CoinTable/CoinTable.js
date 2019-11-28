import React, { Component } from "react";
import "./cointable.css";
import axios from "axios";
import { Pagination } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
export default class CoinTable extends Component {
  constructor() {
    super();
    this.state = {
      coins: [],
      url:
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&page=1&per_page=100",
      activePage: 1
    };
  }
  componentDidMount = () => {
    axios.get(this.state.url).then(response => {
      console.log(response.data);
      this.setState({
        coins: response.data
      });

      //console.log(response.data);
      // response.data.map(result => {
      //   console.log(result);
      //   this.setState({
      //     coins: result
      //   });
      // });
    });
  };
  componentDidUpdate = () => {
    axios.get(this.state.url).then(response => {
      //console.log(response);
    });
  };
  handleOnChange = (e, pageInfo) => {
    this.setState({
      activePage: pageInfo.activePage,
      url:
        `${this.state.url}` +
        `&per_page=100&page=${pageInfo.activePage.toString()}`
    });
  };

  render() {
    return (
      <div>
        <table>
          <tr>
            <th> Logo</th>
            <th>Coin</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Current Price</th>
          </tr>
          <tr>
            {/* <td>+</td> */}
            <td>{}</td>
            <td></td>
          </tr>
        </table>
        <Pagination
          activePage={this.state.activePage}
          onPageChange={this.handleOnChange}
          totalPages={62}
          ellipsisItem={null}
        />
      </div>
    );
  }
}
