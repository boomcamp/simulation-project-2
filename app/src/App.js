import React from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { HashRouter } from "react-router-dom";
import Routes from "./routes";
import axios from "axios";
import SideBar from "./components/sideBar/sideBar";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      url:
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&page=1&per_page=100&price_change_percentage=1h%2C24h%2C7d",
      activePage: 1,
      data: []
    };
  }

  componentDidMount = () => {
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

  render() {
    return (
      <HashRouter>
        <div className="header">
          <SideBar />
          <p className="title-header">Cryptocurrency</p>
        </div>

        <div className="main-cont">
          <Routes
            handleOnChange={this.handleOnChange}
            coinData={this.state.data}
            activePage={this.state.activePage}
          />
        </div>
      </HashRouter>
    );
  }
}
