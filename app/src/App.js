import React from "react";
import axios from "axios";
import Routes from "./routes";
import styled from "styled-components";
import { HashRouter } from "react-router-dom";

import Header from "./components/Header/Header";

const MainDiv = styled.div``;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      url:
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&price_change_percentage=1h%2C24h%2C7d&sparkline=true",
      activePage: 1,
      dataPerPage: 100,
      totalPages: 0,
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
          `&per_page=100
      }&page=1`
      )
      .then(response => {
        this.setState({ data: response.data });
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
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${val.value}&order=market_cap_desc&price_change_percentage=1h%2C24h%2C7d&sparkline=true&per_page=100
    }&page=1`
      )
      .then(response =>
        setTimeout(
          this.setState({ isLoading: false, data: response.data }),
          1000
        )
      );
  };
  render() {
    return (
      <HashRouter>
        <MainDiv>
          <Header />
          <Routes
            currencies={this.state.currencies}
            handleChange={this.handleChange}
            handleOnChange={this.handleOnChange}
            currency={this.state.currency}
            activePage={this.state.activePage}
            getData={this.state.data}
            isLoading={this.state.isLoading}
            unit={this.state.currency.unit}
          />
        </MainDiv>
      </HashRouter>
    );
  }
}
