import React, { Component } from "react";
import axios from "axios";
import "./Homepage.css";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { Modal } from "antd";
import { Table, Tabs,Button } from "antd";
import { Collapse } from "antd";
import CoinCharts from "../Charts/CoinChart";
import Details from "../Details/Details";
import Foot from "../Foot/Foot";
import Transactions from "../Transaction/Transactions";
import Buy from "../Buy/Buy";
import InvestmentTransactions from "../Investment/InvestmentTransactions";
// import { FormattedNumber} from 'react-intl';
// import EllipsisText from "react-ellipsis-text";
var commaNumber = require("comma-number");
const { Panel } = Collapse;
const { TabPane } = Tabs;
export default class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      id: [],
      currency: [],
      dexcription: [],
      name: "",
      cPrice: [],
      img: [],
      visible: false,
      symbol: "",
      market_cap: [],
      marketHigh: [],
      marketLow: [],
      totalVolume: [],
      stats:[],
      circulating_supply: [],
      percentagePerhour: [],
      percentagePeryear: [],
      percentagePersevendays: [],
      percentagePerforten: [],
      percentagePer24h: [],
      percentagePer30days: [],

      buyCoins: [],
      coinsAmount: [],
      crypt: [],
  
      //trans

      columns: [
        {
          title: "Logo",
          dataIndex: "",
          key: "id",

          render: rowData => (
            <img src={rowData.image} style={{ width: "30px" }} alt="coins" />
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
          title: "Circulating Supply",
          dataIndex: "circulating_supply",
          render: circulating_supply => commaNumber(circulating_supply)
        },
        {
          title: "Total  Supply",
          dataIndex: "total_supply",
          render: supply =>
            supply ? "$" + commaNumber(supply) : commaNumber("NO DATA")
        },
        {
          title: "Current Price",
          dataIndex: "current_price",
          type: "numeric",
          render: current_price => "$" + commaNumber(current_price)
        },
        {
          title: "Mkt Cap",
          dataIndex: "market_cap",
          type: "numeric",
          render: market_cap => "$" + commaNumber(market_cap)
        }
      ]
    };
  }

  componentDidMount() {
    
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250&page=1`
      )
      .then(result => {
        let dataArr = result.data.map(elem => {
          return elem;
        });
        let arrId = result.data.map(ids => {
          return ids.id;
        });
        //  console.log(dataArr);
        this.setState({
          data: dataArr,
          id: arrId
        });

        // result.data.map(res=>{
        //   console.log(res.id)
        // })
      });
    let name = this.props.name;
    let a = 0;
    let c = 0;

    axios.get(`http://localhost:4000/transactions`).then(el => {
      console.log(el);

      el.data.map(se => {
        let crypt = se.cryptoAmount;

        if (name === se.name) {
          a += parseFloat(se.usdAmount);
          c += parseFloat(se.cryptoAmount);
          // console.log(se.name)
          // console.log(se);
          console.log(se.cryptoAmount);
          // console.log(a);
          // console.log(c);
          this.setState({
            buyCoins: se,
            coinsAmount: a,
            crypt: c
          });
        } else {
        }
      });
    });
  }
  handleClick = e => {
   
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
        crypt: [],
      });
    });
  };

  handleCancel = e => {
    //console.log(e);
    this.setState({
      visible: false,
      buyCoins: [],
      coinsAmount: [],
      crypt: [],

    });
  };
  handleTabpane = () => {
    let name = this.state.name;
    let a = 0;
    let c = 0;

    axios.get(`http://localhost:4000/transactions`).then(el => {
      // console.log(array1.reduce(reducer));

      el.data.map(se => {
        let crypt = se.cryptoAmount;

        if (name === se.name) {
          a += parseFloat(se.usdAmount);
          c += parseFloat(se.cryptoAmount);
          // console.log(se.name)
          // console.log(se);
          //console.log(se.cryptoAmount);
          // console.log(a);
          // console.log(c);
          this.setState({
            buyCoins: se,
            coinsAmount: a,
            crypt: c  
          });
        } else {
        }
      });
    });
  };
  handleRefresh = () => {
    let name = this.state.name;
    let a = 0;
    let c = 0;

    axios.get(`http://localhost:4000/transactions`).then(el => {
      // console.log(array1.reduce(reducer));

      el.data.map(se => {
        let crypt = se.cryptoAmount;

        if (name === se.name) {
          a += parseFloat(se.usdAmount);
          c += parseFloat(se.cryptoAmount);
          // console.log(se.name)
          // console.log(se);
          //console.log(se.cryptoAmount);
          // console.log(a);
          // console.log(c);
          this.setState({
            buyCoins: se,
            coinsAmount: a,
            crypt: c  
          });
        } else {
        }
      });
    });
  };

  render() {
    // console.log(this.props.buyCoins)
    // console.log(this.state.coinsAmount)
    //    console.log(this.state.cPrice);
    // console.log(this.state.market_cap.usd)
    //console.log(this.state.marketHigh.usd)
    // console.log(this.state.totalVolume.usd)
    // console.log(this.state.dexcription)
    //console.log(this.state.circulating_supply)
    return (
      <div>
        {/* //{console.log(this.state.img)} */}
        <div></div>
        <Table
          style={{ cursor: "pointer", paddingTop: "100px" }}
          onRowClick={e => this.handleClick(e)}
          columns={this.state.columns}
          dataSource={this.state.data}
          rowKey="id"
        />
      <div style={{display:'none'}}>
        <InvestmentTransactions
           coinsPrice={this.state.cPrice.usd}
        
        />
        </div>
        <Modal
          title="CURRENCY"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          width="900px"
          footer={null}
        >
          <Tabs defaultActiveKey='1' onTabClick={this.handleTabpane}>
            <TabPane tab={<img src={this.state.img.thumb} />} key={"1"}>
              <div className="logoNameContainer">
                <h1 className="coinsName">{this.state.name}</h1>
                <b className="symbol">({this.state.symbol})</b>
                <img
                  className="logoImage"
                  src={this.state.img.thumb}
                  alt="coin"
                />
              </div>
              <div className="price">
                <h2>{"$" + commaNumber(this.state.cPrice.usd)}</h2>
              </div>

              <div className="descriptionContainer">
                {/* <p style={{ whiteSpace: ' nowrap',textOverflow: 'ellipsis',overflow: 'hidden'}}>{this.state.dexcription.de}</p> */}

                <div
                  className="coinsInfo"
                  dangerouslySetInnerHTML={{
                    __html: this.state.dexcription.de
                  }}
                  style={{ backgroundImage: this.state.img.small }}
                />
              </div>
              <div className="collapse">
                <Collapse defaultActiveKey={["1"]} accordion>
                  <Panel header="Quick Stats" key="1">
                    <p>
                      {"Bitcoin Price  :   " +
                        "$" +
                        commaNumber(this.state.cPrice.usd)}
                    </p>
                    <p>
                      {"Market Cap  :   " +
                        "$" +
                        commaNumber(this.state.market_cap.usd)}
                    </p>
                    <p>
                      {" 24h Low / 24h High :   " +
                        "$" +
                        commaNumber(this.state.marketHigh.usd) +
                        "/$" +
                        commaNumber(this.state.marketLow.usd)}
                    </p>
                    <p>
                      {" 24 Hour Trading Vol :   " +
                        "$" +
                        commaNumber(this.state.totalVolume.usd)}
                    </p>
                    <p>
                      {" Circulating Supply :   " +
                        commaNumber(this.state.circulating_supply)}
                    </p>
                  </Panel>
                </Collapse>
              </div>

              <div className="details">
                <Details
                  id={this.state.id}
                  percentagePerhour={this.state.percentagePerhour.usd}
                  percentagePeryear={this.state.percentagePeryear}
                  percentagePersevendays={this.state.percentagePersevendays}
                  percentagePerforten={this.state.percentagePerforten}
                  percentagePer24h={this.state.percentagePer24h}
                  percentagePer30days={this.state.percentagePer30days}
                />
              </div>
              <div className="coinsChart">
                <CoinCharts id={this.state.id} />
              </div>
            </TabPane>
            <TabPane tab="Transaction" key="2" >
            {/* <Button
                icon='redo'
                style={{ backgroundColor: "whitesmoke" ,margin:"10px 10px 10px 10px"}}
                onClick={this.handleRefresh}
              >
               Click Me To Refresh
              </Button> */}
              <Transactions
                symbol={this.state.symbol}
                coinsImg={this.state.img.small}
                coinsPrice={this.state.cPrice.usd}
                id={this.state.name}
              />
              
              <Buy
                
                coinsPrice={this.state.cPrice.usd}
                name={this.state.name}
                usdAmout={this.state.coinsAmount}
                crypt={this.state.crypt}
              />
        
            </TabPane>
          </Tabs>
        </Modal>

        <Foot />
        
      
      </div>
    );
  }
}
