import React from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import styled from "styled-components";
import axios from "axios";
import { ButtonGroup } from "semantic-ui-react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import { FaExchangeAlt } from "react-icons/fa";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainDiv = styled.div`
  display: "flex";
  margin: 0 auto;
  padding: 10px;
  box-shadow: 5px 10px 8px #888888;
`;

const Handle = styled.button`
  width: 25;
  height: 25;
  font-size: 15px;
  margin-left: 60px;
  border: transparent;
  &:hover {
    color: black;
    background-color: rgb(235, 155, 6);
  }
  &:focus {
    color: black;
    background-color: rgb(235, 155, 6);
  }
`;

const Name = styled.div`
  color: black;
  font-size: 35px;
  margin-left: 60px;
  margin-top: 15px;
  margin-bottom: 15px;
  font-weight: bold;
`;

const Rank = styled.div`
  color: black;
  font-size: 20px;
  margin-left: 60px;
  margin-top: 10px;
  margin-bottom: 30px;
  font-weight: bold;
`;

const Buy = styled.button`
  width: 100px;
  height: 25px;
  background-color: lightgreen;
`;

const Btn = styled.div`
  float: right;
  margin-right: 20px;
`;

const Div = styled.div`
  display: flex;
`;

const Back = styled.button`
  border: transparent;
  margin-left: 60px;
`;

const days = [
  { name: "24 hours", value: 1 },
  { name: "1 Week", value: 7 },
  { name: "1 Month", value: 30 },
  { name: "6 Months", value: 180 },
  { name: "1 Year", value: 360 },
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

export default class chartInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      toggleModal: false,
      data: [],
      current: "",
      usd: ""
    };
  }

  componentDidMount = () => {
    axios
      .get(
        `
      https://api.coingecko.com/api/v3/coins/${this.props.match.params.id}`
      )
      .then(response => {
        this.setState({
          details: response.data,
          price: response.data.market_data.current_price.usd,
          name: response.data.name,
          invested: "",
          image: response.data.image.small
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

  changeHandler = value => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${this.props.match.params.id}/market_chart?vs_currency=usd&days=${value}`
      )
      .then(result => {
        const date = result.data.prices.map(e => {
          const newDate = new Date(e[0]);
          return {
            getdate:
              value === 1
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
    this.setState({ toggleModal: true });
  };

  handleClose = () => {
    this.setState({ toggleModal: false, current: "", usd: "" });
  };

  currencyChange = (value, price) => {
    if (price === "current") {
      this.setState({
        usd: value * this.state.price,
        current: value
      });
    } else {
      this.setState({
        current: value / this.state.price,
        usd: value
      });
    }
  };

  investHandler = e => {
    e.preventDefault();
    this.setState({
      toggleModal: false
    });
    axios
      .post("http://localhost:4000/transactions", {
        coinName: this.state.details.name,
        price: this.state.details.market_data.current_price.usd,
        invested: this.state.usd,
        amountSold: 0,
        coinId: this.state.details.id,
        profit: 0,
        image: this.state.image
      })
      .then(() =>
        toast.success(
          "Investment Successful ! Go to Investment Tracking for details!"
        )
      )
      .catch(err => toast.error(err.response.data));
  };

  render() {
    return (
      <MainDiv>
        <Back onClick={() => this.props.history.goBack()}>Back</Back>

        <ToastContainer />
        <Name>{this.state.details ? this.state.details.name : ""}</Name>
        <Rank>
          Market Cap Rank:
          {this.state.details ? this.state.details.market_cap_rank : ""}
        </Rank>
        <Btn>
          <Buy onClick={this.handleClickOpen}>Buy</Buy>
        </Btn>
        <Dialog
          open={this.state.toggleModal}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form onSubmit={e => this.investHandler(e)}>
            <DialogTitle id="alert-dialog-title">{"Amount"}</DialogTitle>

            <DialogContent>
              <Div>
                <TextField
                  label="USD"
                  margin="normal"
                  value={this.state.usd}
                  required
                  variant="outlined"
                  onChange={e => this.currencyChange(+e.target.value, "usd")}
                />
                <FaExchangeAlt
                  style={{
                    marginTop: 35,
                    marginRight: 10,
                    marginLeft: 10
                  }}
                />
                <TextField
                  onChange={e =>
                    this.currencyChange(+e.target.value, "current")
                  }
                  label={this.state.name}
                  value={this.state.current}
                  margin="normal"
                  variant="outlined"
                  required
                />
              </Div>
            </DialogContent>
            <DialogActions>
              <Button type="submit" color="primary" onClick={this.notify}>
                Invest
              </Button>

              <Button onClick={this.handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        <ButtonGroup>
          {days.map(e => {
            return (
              <Handle onClick={() => this.changeHandler(e.value)} key={e.name}>
                {e.name}
              </Handle>
            );
          })}
        </ButtonGroup>
        <div style={{ width: "100%", height: 600 }}>
          <ResponsiveContainer>
            <AreaChart
              data={this.state.data}
              margin={{ top: 5, right: 20, bottom: 10, left: 0 }}
            >
              <Area
                type="monotone"
                dataKey="prices"
                stroke="#8884d8"
                strokeWidth={4}
                dot={false}
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="getdate" />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </MainDiv>
    );
  }
}
