import React, { Component } from "react";
import axios from "axios";
import Homepage from "../Homepage/Homepage";
import { Collapse } from "antd";
import Transaction from "../Transaction/Transactions";
import Invest from "../Investment/InvestmentTransactions";
import { Table, Popover, Button, Icon, Modal, Drawer } from "antd";
const { Panel } = Collapse;
var commaNumber = require("comma-number");
export default class Buy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      buyCoins: [],
      defKey: 0,
      coinsAmount: [],
      crypt: [],
      visible: false,
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
      ]
    };
  }
  
  getTransaction = () => {
    axios
      .get(`http://localhost:4000/transactions?name=${this.props.name}`)
      .then(transactions => {
        let s = transactions.data.map(el => {
          // if (name === el.name) {
          // console.log(el);
          return el;
          // }
        });
        this.setState({data:s});
      });
  }
  
  // handleMoney = e => {
  //   // alert('SEMO')
  //   let name = this.props.name;
    
  // };
  //modal
  handleRow = e => {
    console.log(e)
    this.setState({
      visible: true
    });
  };
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  onClose = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    const content = (
      <div>
        <p>Content</p>
        <p>Content</p>
      </div>
    );

    // console.log(this.props.name);
    return (
      <div>
        <Collapse
          defaultActiveKey={this.state.defKEy}
          onChange={this.getTransaction()}
        >
          <Panel header="My Transactions" key="1">
            <h1>{this.props.name}</h1>
            <h2>TOTAL USD AMOUNT:{this.props.usdAmout}</h2>
            <h2>TOTAL Crypto Currency AMOUNT:{this.props.crypt}</h2>
            <h2>TOTAL PROFIT:{}</h2>
            {/* <h2>sadsadsad{this.state.datas.name}</h2> */}
            <div id="container" style={{ display: "none" }}>
              <Homepage coinsAmount={this.state.buyCoins} />
              <Transaction />
            </div>
            <div>
              {/* <Popover content={content} title="Title" placement="topLeft"  trigger="click"> */}
              <Drawer
                title="Basic Drawer"
                placement="top"
                closable={false}
                onClose={this.onClose}
                visible={this.state.visible}
                getContainer={false}
                style={{ position: "absolute" }}
              >
                <p>Some contents...</p>
              </Drawer>
              <Table
                style={{ cursor: "pointer" }}
                onRowClick={e => this.handleRow(e)}
                columns={this.state.columns}
                dataSource={this.state.data}
                rowKey="id"
              />

              {/* </Popover> */}
            </div>
          </Panel>
        </Collapse>
        {/* <Modal
          title="CURRENCY"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          width="800px"
          footer={null}
        ></Modal> */}
      </div>
    );
  }
}
