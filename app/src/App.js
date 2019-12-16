import React from "react";
import axios from "axios";
import { HashRouter } from "react-router-dom";
import "./App.css";
import Sidenav from "./components/Sidenav/Sidenav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      toggle: false,
      url:
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&price_change_percentage=1h%2C24h%2C7d&sparkline=true",
      activePage: 1,
      dataPerPage: 10,
      totalEntries: 0,
      totalPages: 0,
      amountValue: "",
      cryptValue: "",
      data: [],
      currencies: [],
      currency: {
        label: "US Dollar",
        value: "usd",
        unit: "$"
      }
    };
  }

  componentDidMount = () => {
    axios
      .get("https://api.coingecko.com/api/v3/exchange_rates")
      .then(response => {
        this.setState({ currencies: response.data.rates });
      });
    axios
      .get(
        this.state.url +
          `&per_page=${this.state.dataPerPage}
      }&page=${this.state.activePage}`
      )
      .then(response => {
        this.setState({ data: response.data });
      });
    axios.get(`https://api.coingecko.com/api/v3/coins/list`).then(response => {
      this.setState({
        totalEntries: response.data.length
      });
    });
  };

  handleOnChange = (e, pageInfo) => {
    e.preventDefault();
    this.setState({ isLoading: true, data: [] });
    axios
      .get(
        this.state.url +
          `&per_page=${
            this.state.dataPerPage
          }&page=${pageInfo.activePage.toString()}`
      )
      .then(response => {
        setTimeout(
          this.setState({
            isLoading: false,
            data: response.data,
            activePage: pageInfo.activePage,
            url:
              `${this.state.url}` +
              `&per_page=${
                this.state.dataPerPage
              }&page=${pageInfo.activePage.toString()}`
          }),
          1000
        );
      });
  };

  handleChange = val => {
    this.setState({
      currency: Object.assign({}, val),
      isLoading: true,
      data: []
    });
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${val.value}&order=market_cap_desc&price_change_percentage=1h%2C24h%2C7d&sparkline=true&per_page=${this.state.dataPerPage}
    }&page=${this.state.activePage}`
      )
      .then(response =>
        setTimeout(
          this.setState({ isLoading: false, data: response.data }),
          1000
        )
      );
  };

  handleEntries = val => {
    this.setState({
      isLoading: true,
      data: []
    });
    console.log(val);
    axios.get(this.state.url + `&per_page=${val}&page=1`).then(response =>
      setTimeout(
        this.setState({
          isLoading: false,
          data: response.data,
          dataPerPage: val
        }),
        1000
      )
    );
  };

  handleDrawerOpen = () => {
    this.setState({ toggle: true });
  };
  handleDrawerClose = () => {
    this.setState({ toggle: false });
  };

  handleAmount = (val, option, price) => {
    const crypt = option === "amount" ? val / price : val * price;
    val === 0
      ? this.setState({
          cryptValue: "",
          amountValue: ""
        })
      : option === "amount"
      ? this.setState({
          cryptValue: crypt,
          amountValue: val
        })
      : this.setState({
          amountValue: crypt,
          cryptValue: val
        });
  };

  render() {
    return (
      <HashRouter>
        <ToastContainer />
        <Sidenav
          currencies={this.state.currencies}
          handleChange={this.handleChange}
          handleOnChange={this.handleOnChange}
          currency={this.state.currency}
          activePage={this.state.activePage}
          getData={this.state.data}
          isLoading={this.state.isLoading}
          unit={this.state.currency.unit}
          handleEntries={this.handleEntries}
          dataPerPage={this.state.dataPerPage}
          totalEntries={this.state.totalEntries}
          handleDrawerOpen={this.handleDrawerOpen}
          handleDrawerClose={this.handleDrawerClose}
          toggle={this.state.toggle}
          handleAmount={this.handleAmount}
          amountValue={this.state.amountValue}
          cryptValue={this.state.cryptValue}
        />
      </HashRouter>
    );
  }
}
