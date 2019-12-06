import React from "react";
import "./App.css";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaUserCircle } from "react-icons/fa";
import { HashRouter, Link } from "react-router-dom";
import Routes from "./components/Routes/Routes";
import axios from "axios";

const Div = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  justify-content: center;
`;
const Icon = styled.span`
  font-size: 30px;
  color: white;
`;
const Img = styled.img`
  height: 25px;
  margin-right: 5px;
`;
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
        <Navbar bg="primary" variant="dark" expand="lg">
          <Navbar.Brand>
            <Img src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" />
            <Link to="/" style={{ color: "white" }}>
              CRYPTOCURRENCY
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              <NavDropdown
                title={
                  <React.Fragment>
                    <Icon>
                      <FaUserCircle />
                    </Icon>
                    <span>User</span>
                  </React.Fragment>
                }
                id="basic-nav-dropdown"
                alignRight
              >
                <NavDropdown.Item>Investment Tracker</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Div>
          <Routes
            data={this.state.data}
            loading={this.state.loading}
            currency={this.state.currency}
            handleSelect={this.handleSelect}
            handlePagination={this.handlePagination}
            currentPage={this.state.currentPage}
            currencies={this.state.currencies}
          />
        </Div>
      </HashRouter>
    );
  }
}
