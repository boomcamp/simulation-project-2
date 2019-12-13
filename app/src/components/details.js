import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";
import "./details.css";
import TabPanels from "../components/common-components/TabPanels";
var commaNumber = require("comma-number");
export default class details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: [],
      open: "",
      data: null,
      image: ""
    };
  }

  UNSAFE_componentWillReceiveProps() {
    this.setState({ details: this.props.id });
    if (this.props.id) {
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${localStorage.getItem("id")}`
        )
        .then(res => {
          this.setState({
            data: res.data,
            rowone:
              res.data.market_data.price_change_percentage_1h_in_currency.usd,
            rowtwo: res.data.market_data.price_change_percentage_24h,
            rowthree:
              res.data.market_data.price_change_percentage_7d_in_currency.usd,
            rowfour:
              res.data.market_data.price_change_percentage_14d_in_currency.usd,
            rowfive:
              res.data.market_data.price_change_percentage_30d_in_currency.usd,
            rowsix:
              res.data.market_data.price_change_percentage_1y_in_currency.usd
          });
        });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Dialog
          open={this.props.open}
          onClose={this.props.close}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullScreen
        >
          <TabPanels
            details={this.state.details}
            id={this.props.id}
            close={this.props.close}
          />
        </Dialog>
      </React.Fragment>
    );
  }
}
