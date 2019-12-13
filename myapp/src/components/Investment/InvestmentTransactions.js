import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, Input, Button, Icon, Modal } from "antd";
import Moment from "moment";
Moment.locale("en");
var commaNumber = require("comma-number");
export default class InvestmentTransactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      data: [],
      searchText: "",
      searchedColumn: "",
      columns: [
        {
          title: "Logo",
          dataIndex: "",
          key: "id",

          render: rowData => (
            <img
              src={rowData.cryptoImage}
              style={{ width: "30px" }}
              alt="coins"
            />
          )
        },

        {
          title: "Name",
          dataIndex: "name"
        },
        {
          title: "Symbol",
          dataIndex: "symbol"
        },
        {
          title: "USD",
          dataIndex: "usdAmount",
          render: usdAmount => "$" + commaNumber(usdAmount)
        },
        {
          title: "Cypto Currency",
          dataIndex: "cryptoAmount",
          render: (cryptoAmount, symbol) =>
            commaNumber(cryptoAmount) + "  " + symbol.symbol
          // (text, row) => <a> {text + row.ipsum} </a>
        },
        {
          title: "Total Amount invested In Crypto Currency",
          dataIndex: "totalAmount",
          type: "numeric",
          render: current_price => "$" + commaNumber(current_price)
        },
        {
          title: "Date/Time",
          dataIndex: "date"

          // render: date => Moment(date).format('MMM. D, YYYY [at] h:mm A z')
        }
      ],
      lastPrice: []
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:4000/transactions`).then(transactions => {
      let x = transactions.data.map(el => {
        console.log(el);
        return el;
      });
      console.log(x.id);
      this.setState({
        data: x
      });
      //   this.state.datas.map(
      //     elements=>{
      //         console.log(elements.id)
      //     }
      // )
      // let results = this.state.datas.map(el => {
      //     return {
      //      el.id
      //     };
      //   });
      // console.log(transactions.data);
      // console.log(results)
    });
  }

  handleRow = e => {
    console.log(e);
    // console.log(e)

    axios.get(`https://api.coingecko.com/api/v3/coins/${e.id}`).then(res => {
      // console.log(res.data);
      // res.data.map(element=>{
      //   console.log(element.id)
      // })
      // console.log(res.data);
      // let id = res.data.id;
      // console.log(res.data.id)
      // this.props.id(id)
      this.setState({
        id: e,
        img: res.data.image,
        visible: true,
        dexcription: res.data.description,
        name: res.data.name,
        cPrice: res.data.market_data.current_price,
        symbol: res.data.symbol,
        market_cap: res.data.market_data.market_cap,
        marketHigh: res.data.market_data.high_24h,
        marketLow: res.data.market_data.low_24h,
        totalVolume: res.data.market_data.total_volume,
        circulating_supply: res.data.market_data.circulating_supply,

        percentagePerhour:
          res.data.market_data.price_change_percentage_1h_in_currency,
        percentagePeryear:
          res.data.market_data.price_change_percentage_1y_in_currency,
        percentagePersevendays: res.data.market_data,
        percentagePerforten: res.data.market_data,
        percentagePer24h: res.data.market_data,
        percentagePer30days: res.data.market_data,

        buyCoins: [],
        coinsAmount: [],
        crypt: []
      });
    });
    // axios
    // .get(`http://localhost:4000/transactions/${e.id}`)
    // .then(el=>{console.log("usd amount",el.data.usdAmount)
    // this.setState({
    //        lastPrice:el.data,
    //        visible: true,
    // })

    // })
  };
  //MODAL

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    //console.log(this.props)
    // console.log(this.state.data)
    return (
      <div style={{ paddingTop: "100px" }}>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
        <Table
          style={{ cursor: "pointer" }}
          onRowClick={e => this.handleRow(e)}
          columns={this.state.columns}
          dataSource={this.state.data}
          rowKey="id"
        />
      </div>
    );
  }
}
