import React, { Component } from "react";
import { Table, Icon } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { Pagination } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
// import TitleSearch from "../TitleSearch/TitleSearch";
var commaNumber = require("comma-number");

export default class CoinsList extends Component {
  constructor() {
    super();
    this.state = {
      url:
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&page=1&per_page=100",
      activePage: 1,
      columns: [
        {
          title: "Rank #",
          key: "market_cap_rank",
          dataIndex: "market_cap_rank",

          render: market_cap_rank => (
            <span>
              <Icon type="star" style={{ color: "black" }} />
              &nbsp;&nbsp;
              {market_cap_rank}
            </span>
          )
        },
        {
          title: "Coin",
          key: "image",
          dataIndex: "image",
          render: logo => (
            <Link to="/coinsdetails">
              <span>
                <img src={logo} alt={logo} style={{ height: 30 }} />
              </span>
            </Link>
          )
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "Symbol",
          dataIndex: "symbol",
          key: "symbol"
        },
        {
          title: "Current price",
          dataIndex: "current_price",
          key: "current_price",
          render: circulating_price => (
            <span style={{ color: "#428bca" }}>
              ${commaNumber(circulating_price)}
            </span>
          )
        },
        {
          title: "Circulating Supply",
          dataIndex: "circulating_supply",
          key: "circulating_supply",
          render: circulating_supply => (
            <span>{commaNumber(circulating_supply)}</span>
          )
        },
        {
          title: "Mkt Cap",
          dataIndex: "market_cap",
          key: "market_cap",
          render: market_cap => <span>${commaNumber(market_cap)}</span>
        }
      ],
      data: []
    };
    // this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount() {
    axios.get(this.state.url).then(response => {
      console.log(response.data);
      this.setState({
        data: response.data
      });
    });
  }
  componentDidUpdate = () => {
    axios.get(this.state.url).then(response => {
      this.setState({
        data: response.data
      });
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
  // handleSearch(element) {
  //   this.setState({ data: element });
  // }
  render() {
    return (
      <div>
        <Pagination
          activePage={this.state.activePage}
          onPageChange={this.handleOnChange}
          totalPages={62}
          ellipsisItem={null}
        />
        {/* <TitleSearch search={this.handleSearch} /> */}
        <br></br>
        <br></br>
        <Table
          columns={this.state.columns}
          dataSource={this.state.data}
          rowKey="id"
          pagination={false}
        />
        <br></br>
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
