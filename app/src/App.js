import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Pagination } from "semantic-ui-react";
import Currency from "./components/Currency/Currency";
import Header from "./components/Header/Header";
import Table from "./components/Table/Table";
import "semantic-ui-css/semantic.min.css";

const MainDiv = styled.div``;
const TableDiv = styled.div`
  margin-top: 2%;
  margin-right: 10%;
  margin-left: 10%;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
`;
const Select = styled.div`
  width: 200px;
`;
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
      <MainDiv>
        <Header />
        <TableDiv>
          <Container>
            <Select>
              <Currency
                currencies={this.state.currencies}
                handleChange={this.handleChange}
                currency={this.state.currency}
              />
            </Select>
            <Pagination
              activePage={this.state.activePage}
              onPageChange={this.handleOnChange}
              totalPages={62}
              ellipsisItem={null}
            />
          </Container>
          <Table
            getData={this.state.data}
            isLoading={this.state.isLoading}
            unit={this.state.currency.unit}
          />
        </TableDiv>
      </MainDiv>
    );
  }
}
