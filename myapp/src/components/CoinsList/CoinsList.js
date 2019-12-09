import React, { Component } from "react";
import { Table, Icon, Descriptions, Typography } from "antd";

import axios from "axios";
import { Modal } from "antd";
import { Pagination } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./coinslist.css";
import Details from "../Details/Details";
import Chart from "../Chart/Chart";
var commaNumber = require("comma-number");
const { Title, Paragraph } = Typography;
export default class CoinsList extends Component {
  constructor() {
    super();
    this.state = {
      url:
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&page=1&per_page=100",
      activePage: 1,
      id: null,
      visible: false,
      name: [],
      image: [],
      description: [],
      mkc: [],
      symbol: [],
      price: [],
      community: [],
      mkcap: [],
      cs: [],
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
            <span>
              <img src={logo} alt={logo} style={{ height: 30 }} />
            </span>
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
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    axios.get(this.state.url).then(response => {
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
  handleOk = e => {
    this.setState({
      visible: false
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false
    });
  };
  handleClick = e => {
    let currentComponent = this;
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${e.id}`)
      .then(results => {
        currentComponent.setState({
          id: e,
          visible: true,
          name: results.data.id,
          links: results.data.links.homepage[0],
          community: results.data.links.official_forum_url[0],
          image: results.data.image.small,
          description: results.data.description,
          mkc: results.data.market_cap_rank,
          symbol: results.data.symbol,
          price: results.data.market_data.current_price.usd,
          mkcap: results.data.market_data.market_cap.usd,
          cs: results.data.market_data.circulating_supply,
          desc: results.data.description.en
        });
      });
  };
  render() {
    return (
      <div>
        <Pagination
          activePage={this.state.activePage}
          onPageChange={this.handleOnChange}
          totalPages={62}
          ellipsisItem={null}
        />
        <br></br>
        <br></br>
        <Table
          columns={this.state.columns}
          dataSource={this.state.data}
          rowKey="id"
          pagination={false}
          onRowClick={e => this.handleClick(e)}
        />
        <br></br>
        <Pagination
          activePage={this.state.activePage}
          onPageChange={this.handleOnChange}
          totalPages={62}
          ellipsisItem={null}
        />
        <Modal
          title="Coins Details"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="60%"
        >
          <Descriptions>
            <Descriptions.Item label="">
              {" "}
              <img src={this.state.image} alt={``} />
              <span className="name">{this.state.name}</span>
              <span className="symbol">({this.state.symbol})</span>
            </Descriptions.Item>
            <Descriptions.Item label=""></Descriptions.Item>
            <Descriptions.Item label="">
              <span className="price">${this.state.price}</span>
            </Descriptions.Item>
            <Descriptions.Item label="">
              {" "}
              <span className="info">Market Cap:</span> Rank #{this.state.mkc}
              <br />
            </Descriptions.Item>
            <Descriptions.Item label=""></Descriptions.Item>
            <Descriptions.Item label="">
              <span className="info">Market Cap: </span>$
              {commaNumber(this.state.mkcap)}
            </Descriptions.Item>
            <Descriptions.Item label="">
              {" "}
              <span className="info">Website:</span>{" "}
              <a
                href={this.state.links}
                target="_blank"
                rel="noopener noreferrer"
              >
                {this.state.links}
              </a>
            </Descriptions.Item>
            <Descriptions.Item label=""></Descriptions.Item>
            <Descriptions.Item label="">
              <span className="info">Circulating Supply:</span> $
              {commaNumber(this.state.cs)}
            </Descriptions.Item>
            <Descriptions.Item label="">
              <span className="info">Community</span>:{" "}
              <a
                href={this.state.community}
                target="_blank"
                rel="noopener noreferrer"
              >
                {this.state.community}
              </a>
            </Descriptions.Item>
            <Descriptions.Item label=""></Descriptions.Item>
            <Descriptions.Item label=""></Descriptions.Item>
          </Descriptions>
          <Typography>
            <Title>
              <span className="names">{this.state.name}</span>
            </Title>
            <Paragraph style={{ textAlign: "justify" }}>
              <em dangerouslySetInnerHTML={{ __html: this.state.desc }} />
            </Paragraph>
          </Typography>
          <Details id={this.state.id} />
          <Chart />
        </Modal>
      </div>
    );
  }
}
