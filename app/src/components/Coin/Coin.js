import React from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Link, Switch, Route } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Divider from "@material-ui/core/Divider";
import { message } from "antd";
import "antd/dist/antd.css";
import "../../App.css";

const day = [
  { name: "24 Hours", value: "1" },
  { name: "1 Week", value: "7" },
  { name: "1 Month", value: "30" },
  { name: "6 Months", value: "180" },
  { name: "1 Year", value: "365" },
  { name: "All Time", value: "max" }
];

var months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export default class Coindetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      toggle: false,
      val: "",
      usd: "",
      data: []
    };
  }

  componentDidMount = () => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${this.props.match.params.id}`
      )
      .then(result => {
        this.setState({
          name: result.data.name,
          symbol: result.data.symbol,
          logo: result.data.image.large,
          small: result.data.image.small,
          des: result.data.description.en,
          price: result.data.market_data.current_price.usd,
          id: result.data.id
        });
      });
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${this.props.match.params.id}/market_chart?vs_currency=usd&days=1`
      )
      .then(res => {
        const date = res.data.prices.map(e => {
          const newDate = new Date(e[0]);
          return {
            getdate:
              newDate.getMinutes() < 10
                ? newDate.getHours() + ":" + +"0" + newDate.getMinutes()
                : newDate.getHours() + ":" + newDate.getMinutes(),
            prices: e[1]
          };
        });
        this.setState({ data: date });
      });
  };

  handleChange = val => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${this.props.match.params.id}/market_chart?vs_currency=usd&days=${val}`
      )
      .then(result => {
        const date = result.data.prices.map(e => {
          const newDate = new Date(e[0]);
          return {
            getdate:
              val === "1"
                ? newDate.getMinutes() < 10
                  ? newDate.getHours() + ":" + +"0" + newDate.getMinutes()
                  : newDate.getHours() + ":" + newDate.getMinutes()
                : newDate.getDate() + " " + months[newDate.getMonth()],
            prices: e[1]
          };
        });
        this.setState({ data: date });
      });
  };

  handleClickOpen = () => {
    this.setState({ toggle: true });
  };

  handleClickClose = () => {
    this.setState({ toggle: false, val: "", usd: "" });
  };

  handlePrices = (value, price) => {
    if (price === "val") {
      this.setState({
        usd: value * this.state.price,
        val: value
      });
    } else {
      this.setState({
        val: value / this.state.price,
        usd: value
      });
    }
  };

  handleInvest = e => {
    e.preventDefault();
    axios.post("http://localhost:4000/transactions", {
      coinName: this.state.name,
      price: this.state.price,
      invested: this.state.usd,
      coinId: this.state.id,
      profit: 0,
      logo: this.state.small
    });
    this.setState({ toggle: false, val: "", usd: "" });
    message.info("Investment Successful!", 1);
  };

  render() {
    return (
      <div>
        <div className="detail-cont">
          <div className="back-btn">
            <Link to="/">
              <Button variant="outlined" color="primary">
                <KeyboardReturnIcon />
              </Button>
            </Link>
            <Switch>
              <Route />
            </Switch>
          </div>
          <div className="logo-box">
            <img src={this.state.logo} alt="" />
            <div className="weight size logo-name">
              {this.state.name}{" "}
              <div className="upcase">({this.state.symbol})</div>
            </div>
            <div className="des">{ReactHtmlParser(this.state.des)}</div>
          </div>
          <div className="btn-cont">
            <Grid item>
              <ButtonGroup
                variant="text"
                aria-label="full-width contained button group"
              >
                {day.map(e => {
                  return (
                    <Button
                      onClick={() => this.handleChange(e.value)}
                      key={e.name}
                    >
                      {e.name}
                    </Button>
                  );
                })}
              </ButtonGroup>
            </Grid>
            <div className="pos">
              <Button
                variant="contained"
                color="primary"
                style={{ width: 200 }}
                onClick={this.handleClickOpen}
              >
                <ShoppingCartIcon />
                Buy
              </Button>
              <Dialog
                open={this.state.toggle}
                onClose={this.handleClickClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <form onSubmit={e => this.handleInvest(e)}>
                  <DialogTitle id="alert-dialog-title">
                    <div className="upcase weight">
                      <img src={this.state.small} alt="" /> {this.state.id}
                    </div>
                    <div className="align">
                      <AccountBalanceIcon />{" "}
                      <div className="upcase weight">Bank Account</div>
                    </div>
                  </DialogTitle>
                  <Divider />
                  <DialogTitle id="alert-dialog-title">
                    <div className="upcase weight">Amount</div>
                  </DialogTitle>
                  <DialogContent>
                    <div className="r">
                      <TextField
                        value={this.state.usd}
                        label="USD"
                        variant="outlined"
                        className={"upcase"}
                        required
                        onChange={e =>
                          this.handlePrices(+e.target.value, "usd")
                        }
                      />
                      <SyncAltIcon style={{ fontSize: 50, color: "black" }} />
                      <TextField
                        value={this.state.val}
                        label={this.state.symbol}
                        variant="outlined"
                        className={"upcase"}
                        required
                        onChange={e =>
                          this.handlePrices(+e.target.value, "val")
                        }
                      />
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button color="primary" type="submit">
                      invest
                    </Button>
                    <Button
                      onClick={this.handleClickClose}
                      color="primary"
                      autoFocus
                    >
                      close
                    </Button>
                  </DialogActions>
                </form>
              </Dialog>
            </div>
          </div>

          <div className="chart">
            <div style={{ width: "100%", height: 400 }}>
              <ResponsiveContainer>
                <AreaChart
                  data={this.state.data}
                  margin={{
                    top: 10,
                    right: 30
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="getdate" />
                  <YAxis domain={["auto", "auto"]} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="prices"
                    stroke="#8884d8"
                    fill="#82ca9d"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
