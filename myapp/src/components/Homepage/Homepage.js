import React, { Component } from "react";
import axios from "axios";
import "./Homepage.css";
import { Modal } from "antd";
import { Table } from "antd";
import { Collapse } from "antd";
import CoinCharts from "../Charts/CoinChart"
// import EllipsisText from "react-ellipsis-text";
var commaNumber = require("comma-number");
const { Panel } = Collapse;
export default class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
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
      circulating_supply: [],
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
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250&page=1`)
      .then(result => {
        let dataArr = result.data.map(elem => {
          return elem;
        });
        let arrId = result.data.map(ids => {
          return ids.id;
        });
        console.log(dataArr);
        this.setState({
          data: dataArr,
          id: arrId
        });

        // result.data.map(res=>{
        //   console.log(res.id)
        // })
      });
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins?per page=100${this.state.id}`
      )
      .then(res => {
        //console.log(res.data)
        this.setState({ currency: res.data });
      });
  }

  handleClick = e => {
    // console.log(e)

    axios.get(`https://api.coingecko.com/api/v3/coins/${e.id}`).then(res => {
      // res.data.map(element=>{
      //   console.log(element.id)
      // })
     // console.log(res.data);
      this.setState({
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
        circulating_supply: res.data.market_data.circulating_supply
      });
    });
    
  };
  handleCancel = e => {
    //console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    //    console.log(this.state.cPrice);
    // console.log(this.state.market_cap.usd)
    //console.log(this.state.marketHigh.usd)
    // console.log(this.state.totalVolume.usd)
    // console.log(this.state.dexcription)
    //console.log(this.state.circulating_supply)
    return (
      <div>
        {/* //{console.log(this.state.img)} */}

        <Table
          style={{ cursor: "pointer" }}
          onRowClick={e => this.handleClick(e)}
          columns={this.state.columns}
          dataSource={this.state.data}
          rowKey="id"
        />

        <Modal
          title="Currency"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          width="1000px"
          footer={null}
        >
        
          <div className="logoNameContainer">
            <img className="logoImage"  src={this.state.img.small} alt="coin" />
            <h1>{this.state.name}</h1>
            <h1>({this.state.symbol})</h1>
          </div>
          <div className="prIice">
            <h2>{"$" + commaNumber(this.state.cPrice.usd)}</h2>
          </div>

          <div className="descriptionContainer">
            {/* <p style={{ whiteSpace: ' nowrap',textOverflow: 'ellipsis',overflow: 'hidden'}}>{this.state.dexcription.de}</p> */}
            <div
              className="coinsInfo"
              dangerouslySetInnerHTML={{ __html: this.state.dexcription.de }}
            />
            <Collapse accordion>
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
                    commaNumber(this.state.marketHigh.usd) + "/$" +
                    commaNumber(this.state.marketHigh.usd)
                  }
                </p>
                <p>
                  {" 24 Hour Trading Vol :   " +
                    "$" +
                    commaNumber(this.state.totalVolume.usd)
                  }
                </p>
                <p>
                  {" Circulating Supply :   " +

                    commaNumber(this.state.circulating_supply)
                  }
                </p>


              </Panel>
            </Collapse>
          </div>
          <CoinCharts/>
        </Modal>
      </div>
    );
  }
}
