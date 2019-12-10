import React, { Component } from "react";
import { Descriptions } from "antd";
// import axios from "axios";
export default class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
     
    };
  }

  render() {
    console.log(this.props)
    return (
        <div className='details'> 
      
          <Descriptions
            style={{ textAlign: "center" ,fontWeight:'bold'}}
            bordered
            layout="vertical"
            column={{ xxl: 2, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          >
            {/* <Descriptions.Item label="1h" ><FormattedNumber
        
        value={0.0625}
       
        minimumFractionDigits={3}
      /></Descriptions.Item> */}
            <Descriptions.Item label="1Hour">
              <p
                style={{
                  color:
                    Math.round(10 * this.props.percentagePerhour) < 0
                      ? "red"
                      : "green"
                }}
              >
                {" "}
                {Math.round(10 * this.props.percentagePerhour) / 10}%
              </p>
            </Descriptions.Item>
            <Descriptions.Item label="24Hours">
              <p
                style={{
                  color:
                    Math.round(
                      10 *
                        this.props.percentagePer24h.price_change_percentage_24h
                    ) < 0
                      ? "red"
                      : "green"
                }}
              >
                {Math.round(
                  10 * this.props.percentagePer24h.price_change_percentage_24h
                ) / 10}
                %
              </p>
            </Descriptions.Item>
            <Descriptions.Item label="7Days">
              <p
                style={{
                  color:
                    Math.round(
                      10 *
                        this.props.percentagePersevendays
                          .price_change_percentage_7d
                    ) < 0
                      ? "red"
                      : "green"
                }}
              >
                {Math.round(
                  10 *
                    this.props.percentagePersevendays.price_change_percentage_7d
                ) / 10}
                %
              </p>
            </Descriptions.Item>
            <Descriptions.Item label="14Days">
              <p
                style={{
                  color:
                    Math.round(
                      10 *
                        this.props.percentagePerforten
                          .price_change_percentage_14d
                    ) < 0
                      ? "red"
                      : "green"
                }}
              >
                {Math.round(
                  10 *
                    this.props.percentagePerforten.price_change_percentage_14d
                ) / 10}
                %
              </p>
            </Descriptions.Item>
            <Descriptions.Item label="30Days">
              <p
                style={{
                  color:
                    Math.round(
                      10 *
                        this.props.percentagePer30days
                          .price_change_percentage_30d
                    ) < 0
                      ? "red"
                      : "green"
                }}
              >
                {Math.round(
                  10 *
                    this.props.percentagePer30days.price_change_percentage_30d
                ) / 10}
                %
              </p>
            </Descriptions.Item>
            <Descriptions.Item label="1Year">
              <p
                style={{
                  color:
                    Math.round(10 * this.props.percentagePeryear.usd) < 0
                      ? "red"
                      : "green"
                }}
              >
                {Math.round(10 * this.props.percentagePeryear.usd) / 10}%{" "}
              </p>
            </Descriptions.Item>
          </Descriptions>
        </div>
    );
  }
}
