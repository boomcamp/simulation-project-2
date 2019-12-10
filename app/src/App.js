import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter } from "react-router-dom";
import axios from "axios";
import SideNav from "./components/SideNav/SideNav";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      currency: {
        value: "usd",
        label: "US Dollar",
        unit: "$"
      },
      loading: true,
      currentPage: 1,
      currencies: []
    };
  }
  componentDidMount() {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&page=1&per_page=100&price_change_percentage=1h%2C24h%2C7d&sparkline=true"
      )
      .then(res => {
        setTimeout(() => {
          this.setState({
            data: res.data,
            loading: false
          });
        }, 500);
      });

    axios.get("https://api.coingecko.com/api/v3/exchange_rates").then(res => {
      this.setState({
        currencies: res.data.rates
      });
    });
  }
  handlePagination = (e, page) => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    var temp = this.state.currency;
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${temp.value}&page=${page.activePage}&per_page=100&price_change_percentage=1h%2C24h%2C7d&sparkline=true`
      )
      .then(res => {
        setTimeout(() => {
          this.setState({
            data: res.data,
            currentPage: page.activePage,
            loading: false
          });
        }, 500);
      });
  };
  handleSelect = val => {
    this.setState({
      currency: val,
      loading: true
    });
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${val.value}&page=${this.state.currentPage}&per_page=100&price_change_percentage=1h%2C24h%2C7d&sparkline=true`
      )
      .then(res => {
        setTimeout(() => {
          this.setState({
            data: res.data,
            loading: false
          });
        }, 500);
      });
  };
  render() {
    return (
      <HashRouter>
        <SideNav
          data={this.state.data}
          loading={this.state.loading}
          currency={this.state.currency}
          handleSelect={this.handleSelect}
          handlePagination={this.handlePagination}
          currentPage={this.state.currentPage}
          currencies={this.state.currencies}
        />
      </HashRouter>
    );
  }
}
