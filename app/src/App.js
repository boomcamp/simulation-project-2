import React from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/Header/Header";
import { HashRouter } from "react-router-dom";
import Route from "./routes.js";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      url:
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&page=1&per_page=50&price_change_percentage=1h%2C24h%2C7d",
      activePage: 1,
      data: []
    };
  }

  componentDidMount = () => {
    axios.get(this.state.url).then(response => {
      this.setState({ data: response.data });
    });
  };
  componentDidUpdate = () => {
    axios.get(this.state.url).then(response => {
      this.setState({ data: response.data });
    });
  };
  handleChange = (e, pageInfo) => {
    this.setState({
      activePage: pageInfo.activePage,
      url:
        `${this.state.url}` +
        `&per_page=50&page=${pageInfo.activePage.toString()}`
    });
  };

  render() {
    return (
      <HashRouter>
        <Header />
        <Route
          handleChange={this.handleChange}
          coinData={this.state.data}
          activePage={this.state.activePage}
        />
      </HashRouter>
    );
  }
}
