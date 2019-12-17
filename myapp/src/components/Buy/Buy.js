import React, { Component } from "react";
import axios from "axios";
import Homepage from "../Homepage/Homepage";
import { Collapse, InputNumber, Input, message } from "antd";
import Transaction from "../Transaction/Transactions";
import Invest from "../Investment/InvestmentTransactions";
import { Table, Popover, Button, Icon, Modal, Drawer,Popconfirm } from "antd";

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
      disabled: true,
      totalAmount: null,
      usdAmount: null,
      cryptoAmount: null,
      cryptoImage: [],
      id: null,

      date: "",
      stats: "sold",
      currentPrice: [],
      symbol: [],
      buyCoins: [],
      coinsAmount: [],
      crypt: [],

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
          dataIndex: "date",
          render: (date) => {
            return (
              <span
               
              >
                {"bought at :"+date}
              </span>
          //  render: date =>  +'YOU BOUGHT'+ date
            )},
            },
        {
          title: "Status",
          dataIndex: "stats"
        },
        {
          title: "Date Sold/profit/loss",
          dataIndex: "newdate",
          fixed: "right",
           render: (date,sold) =><span>  <span>{sold.sold!==undefined?date + 'profit/loss':'not yet sold'}</span> <span
           style={{
             color:
             sold.sold < 0
                 ? "red"
                 : "green"
           }}
         >
           {"/"+sold.sold?sold.sold:'no data'}
         </span></span>
        }
      ],

      //MODAL SELL
      column: [
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
          width: 100,
          render: (cryptoAmount, symbol) =>
            commaNumber(cryptoAmount) + "  " + symbol.symbol
          // (text, row) => <a> {text + row.ipsum} </a>
        },
        {
          title: "Profit?/Loss",
          dataIndex: "totalAmount",
          type: "numeric",
          render: (current_price, amount) => {
            return (
              <span
                style={{
                  color:
                    commaNumber(
                      this.props.coinsPrice * amount.cryptoAmount -
                        current_price
                    ) < 0
                      ? "red"
                      : "green"
                }}
              >
                {"$" +
                  commaNumber(
                    this.props.coinsPrice * amount.cryptoAmount - current_price
                  )}
              </span>
            );
          }
        },
        {
          title: "Date/Time",
          dataIndex: "date",
          render: (date) => {
            return (
              <span
               
              >
                {"bought at :"+date}
              </span>
          //  render: date =>  +'YOU BOUGHT'+ date
            )},

        // {
        //   title: "Action",
        //   key: "operation",
        //   // fixed: "right",
        //   width: 100,
        //   render: () => <a onClick={e => this.click(e.target.value)}>action</a>
        // },
        // {

        //   title:'profit/loss',
        //   dataIndex: "a",
        //   render:(totalAmount,amount)=>commaNumber((totalAmount) - (this.props.coinsPrice*amount.cryptoAmount))
        // }
            }
      ]
    };
  }
  click = e => {
    console.log(e);
  };
  onChange = value => {
    var options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
      seconds: "numeric"
    };
    console.log(value * this.props.coinsPrice);
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds

    this.setState({
      date:
        date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec,
      disabled: false,
      usdAmount: this.props.coinsPrice,
      totalAmount: value * this.props.coinsPrice,
      cryptoAmount: value,
      cryptoImage: this.props.coinsImg,
      id: this.props.id,
      symbol: this.props.symbol
      // currentPrice:this.props.
    });
  };
  
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
        this.setState({ data: s });
      });
  };
  handleSell = event => {
    console.log(
      this.props.coinsPrice * this.state.cryptoAmount -
      this.state.totalAmount
    );
    console.log(event);
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
// if()
    axios
      .patch(`http://localhost:4000/transactions/${event.id}`, {
        // totalAmount: this.state.totalAmount,
        // usdAmount: this.state.usdAmount,
        // cryptoAmount: this.state.cryptoAmount,
        // cryptoImage: this.state.cryptoImage,
        // name: this.state.id,
        //  date: this.state.date,
        // symbol: this.state.symbol,
        sold:
        this.props.coinsPrice * this.state.cryptoAmount -
        this.state.totalAmount,
        newdate:
          date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec,
        stats: "sold"
      })
      .then(d => {
        console.log(d);
        message.info('Sell successfully!')
      });
  };

  //modal
  handleBuy = e => {
    console.log(e.id);
    if (this.state.stats != e.stats) {
      axios.get(`http://localhost:4000/transactions?id=${e.id}`).then(trans => {
        console.log(trans.data.id);
        let x = trans.data.map(a => {
          return a;
        });
        console.log(x);
        this.setState({
          visible: true,
          id: x
        });
      });
    } else {
      message.info("You Sold It Already!");
    }
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
    //console.log(this.state.id)
    return (
      <div>
        <Collapse defaultActiveKey="1" onChange={this.getTransaction()}>
          <Panel header="My Transactions" key="1">
            {/* <h1>{this.props.status}</h1>
            <h2>TOTAL USD AMOUNT:{this.state.id}</h2>
            <h2>TOTAL Crypto Currency AMOUNT:{this.props.crypt}</h2>
            <h2>TOTAL PROFIT:{}</h2>
            {/* <h2>sadsadsad{this.state.datas.name}</h2> */}
            <div id="container" style={{ display: "none" }}>
              <Homepage coinsAmount={this.state.buyCoins} />
              <Transaction handleSell={this.handleSell} />
            </div>
            <div>
              {/* <Popover content={content} title="Title" placement="topLeft"  trigger="click"> */}
              <Drawer
                title="You want To Sell this Currency??"
                placement="top"
                closable={false}
                onClose={this.onClose}
                visible={this.state.visible}
                getContainer={false}
                style={{ position: "absolute" }}
              >
                {/* //SELL */}
                <p>
                
                  {" "}
                  <Popconfirm
              placement="topLeft"
              title="Are you sure to buy?"
              onConfirm={this.handleClickBuy}
              okText={"Yes"}
              cancelText="No"
              disabled={this.state.disabled}
            >
                  <Popover title="CLICK TO SELL" trigger="hover">
                  
                    <Button type="link" ghost>
                      {" "}
                      <Table
                        // showHeader={false}
                        style={{ cursor: "pointer" }}
                        onRowClick={event => this.handleSell(event)}
                        columns={this.state.column}
                        dataSource={this.state.id}
                        rowKey="name"
                        pagination={false}
                        value={this.id}
                      />
                    </Button>
                   
                  </Popover>
                  </Popconfirm>
                </p>
               
              </Drawer>
              {/* //BUY */}
              <Table
                // showHeader ={false}
                scroll={{ x: 1500, y: 300 }}
                style={{ cursor: "pointer" }}
                onRowClick={e => this.handleBuy(e)}
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
          https://docs.google.com/spreadsheets/d/14YhgqulbQTVWyT6OkDa4Wcr27rIu3sUguqOr6_7lPFA/edit#gid=1281416759
          width="800px"
          footer={null}
        ></Modal> */}
      </div>
    );
  }
}
