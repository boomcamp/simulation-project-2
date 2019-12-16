import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactHtmlParser from "react-html-parser";
import { Div2, Name, Img, Title, Desc, Box, Main, Icon } from "./Style";

import Axios from "axios";
import { TiArrowBack } from "react-icons/ti";
import Stat from "./Stats";
import Chart from "./Chart";

export default class Coins extends React.Component {
  constructor() {
    super();
    this.state = {
      active: "1",
      currency: "",
      market_data: {}
    };
  }
  componentDidMount() {
    this.setState({
      currency: this.props.currency.value
    });
    Axios.get(
      `https://api.coingecko.com/api/v3/coins/${this.props.match.params.id}`
    ).then(res => {
      this.setState({
        details: res.data,
        market_data: res.data.market_data
      });
    });
    Axios.get(
      `https://api.coingecko.com/api/v3/coins/${this.props.match.params.id}/market_chart?vs_currency=${this.props.currency.value}&days=1`
    )
      .then(res => {
        this.setState({
          data: res.data.prices.map(x => {
            const new_date = new Date(x[0]);
            const hour = new Intl.DateTimeFormat("en-US", {
              hour: "2-digit",
              minute: "2-digit"
            }).format(new_date);
            return {
              Date: hour,
              Price: Number(Math.round(x[1] + "e2") + "e-2")
            };
          })
        });
      })
      .catch(res => alert(res.data.value));
  }
  handleDays = value => {
    Axios.get(
      `https://api.coingecko.com/api/v3/coins/${this.props.match.params.id}/market_chart?vs_currency=${this.props.currency.value}&days=${value}`
    )
      .then(res => {
        this.setState({
          data: res.data.prices.map(x => {
            const new_date = new Date(x[0]);
            const hour = new Intl.DateTimeFormat("en-US", {
              hour: "2-digit",
              minute: "2-digit"
            }).format(new_date);
            const month = new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "2-digit"
            }).format(new_date);
            const year = new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short"
            }).format(new_date);
            return value === "max"
              ? {
                  Date: year,
                  Price: Number(Math.round(x[1] + "e2") + "e-2")
                }
              : value === "1"
              ? {
                  Date: hour,
                  Price: Number(Math.round(x[1] + "e2") + "e-2")
                }
              : {
                  Date: month,
                  Price: Number(Math.round(x[1] + "e2") + "e-2")
                };
          }),
          active: value
        });
      })
      .catch(res => alert(res.data.value));
  };
  render() {
    const temp = this.state.details,
      temp_c = this.state.currency,
      temp_md = this.state.market_data;
    const { currency } = this.props;
    return (
      <Main>
        <Box>
          <Icon>
            <TiArrowBack onClick={() => this.props.history.goBack()} />
          </Icon>
          <Div2>
            {temp ? (
              <React.Fragment>
                <Name>
                  <Img src={`${temp.image.large}`} alt="" />
                  <Title>{temp.name}</Title>
                  <Desc>
                    Description: {ReactHtmlParser(temp.description.en)}
                  </Desc>
                </Name>
              </React.Fragment>
            ) : (
              ""
            )}
          </Div2>
          <Chart
            data={this.state.data}
            active={this.state.active}
            currency={currency}
            handleDays={this.handleDays}
          />
        </Box>
        <Stat
          temp_c={temp_c}
          temp={temp}
          temp_md={temp_md}
          currency={currency}
        />
      </Main>
    );
  }
}
