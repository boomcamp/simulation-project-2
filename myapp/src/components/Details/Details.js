import React, { Component } from "react";
import { Descriptions } from "antd";
import axios from "axios";
export default class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      percentagePerhour: [],
      percentagePeryear: [],
      percentagePersevendays: [],
      percentagePerforten: [],
      percentagePer24h: [],
      percentagePer30days: [],
      img: []
    };
  }

 UNSAFE_componentWillReceiveProps() {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${this.props.id.id}`)
      .then(percentage => {
        console.log(percentage.data.market_data);
        this.setState({
          percentagePerhour:
            percentage.data.market_data.price_change_percentage_1h_in_currency,
          percentagePeryear:
            percentage.data.market_data.price_change_percentage_1y_in_currency,
          percentagePersevendays: percentage.data.market_data,
          percentagePerforten: percentage.data.market_data,
          percentagePer24h: percentage.data.market_data,
          percentagePer30days: percentage.data.market_data,
          img: percentage.data.image
        });
      });
  }

  render() {
    return (
      <div>
        {/* <Link to='/details'/> */}
        <div>
          <Descriptions
            style={{ textAlign: "center" }}
            bordered
            layout="vertical"
            column={{ xxl: 2, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          >
            {/* <Descriptions.Item label="1h" ><FormattedNumber
        
        value={0.0625}
       
        minimumFractionDigits={3}
      /></Descriptions.Item> */}
            <Descriptions.Item label="1h">
              <p
                style={{
                  color:
                    Math.round(10 * this.state.percentagePerhour.usd) < 0
                      ? "red"
                      : "green"
                }}
              >
                {" "}
                {Math.round(10 * this.state.percentagePerhour.usd) / 10}%
              </p>
            </Descriptions.Item>
            <Descriptions.Item label="24h">
              <p
                style={{
                  color:
                    Math.round(
                      10 *
                        this.state.percentagePer24h.price_change_percentage_24h
                    ) < 0
                      ? "red"
                      : "green"
                }}
              >
                {Math.round(
                  10 * this.state.percentagePer24h.price_change_percentage_24h
                ) / 10}
                %
              </p>
            </Descriptions.Item>
            <Descriptions.Item label="7d">
              <p
                style={{
                  color:
                    Math.round(
                      10 *
                        this.state.percentagePersevendays
                          .price_change_percentage_7d
                    ) < 0
                      ? "red"
                      : "green"
                }}
              >
                {Math.round(
                  10 *
                    this.state.percentagePersevendays.price_change_percentage_7d
                ) / 10}
                %
              </p>
            </Descriptions.Item>
            <Descriptions.Item label="14d">
              <p
                style={{
                  color:
                    Math.round(
                      10 *
                        this.state.percentagePerforten
                          .price_change_percentage_14d
                    ) < 0
                      ? "red"
                      : "green"
                }}
              >
                {Math.round(
                  10 *
                    this.state.percentagePerforten.price_change_percentage_14d
                ) / 10}
                %
              </p>
            </Descriptions.Item>
            <Descriptions.Item label="30d">
              <p
                style={{
                  color:
                    Math.round(
                      10 *
                        this.state.percentagePer30days
                          .price_change_percentage_30d
                    ) < 0
                      ? "red"
                      : "green"
                }}
              >
                {Math.round(
                  10 *
                    this.state.percentagePer30days.price_change_percentage_30d
                ) / 10}
                %
              </p>
            </Descriptions.Item>
            <Descriptions.Item label="1y">
              <p
                style={{
                  color:
                    Math.round(10 * this.state.percentagePeryear.usd) < 0
                      ? "red"
                      : "green"
                }}
              >
                {Math.round(10 * this.state.percentagePeryear.usd) / 10}%{" "}
              </p>
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    );
  }
}
