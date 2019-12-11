import React from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
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

const MainDiv = styled.div`
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

const Sell = styled.button`
  width: 100px;
  height: 25px;
  background-color: red;
  color: white;
`;

const Btn = styled.div`
  float: right;
  margin-right: 75px;
`;

const Div = styled.div`
  display: flex;
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
      value: ""
    };
  }

  componentDidMount = () => {
    axios
      .get(
        `
      https://api.coingecko.com/api/v3/coins/${this.props.match.params.id}`
      )
      .then(response => {
        this.setState({ details: response.data });
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
    this.setState({ toggleModal: false });
  };

  handleChange = e => {
    axios.get("https://api.coingecko.com/api/v3/exchange_rates").then(res => {
      console.log(res.data.rates);
    });
  };

  render() {
    return (
      <MainDiv>
        <Name>{this.state.details ? this.state.details.name : ""}</Name>
        <Rank>
          Market Cap Rank:
          {this.state.details ? this.state.details.market_cap_rank : ""}
        </Rank>
        <Btn>
          <Buy onClick={this.handleClickOpen}>Buy</Buy>
          <Sell>Sell</Sell>
        </Btn>
        <Dialog
          open={this.state.toggleModal}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Amount"}</DialogTitle>
          <DialogContent>
            <Div>
              <TextField
                onChange={e => this.handleChange(e.target.value)}
                id="outlined-basic"
                label="Amount"
                margin="normal"
                variant="outlined"
              />
              <FaExchangeAlt
                style={{
                  marginTop: 35,
                  marginRight: 10,
                  marginLeft: 10
                }}
              />
              <TextField
                id="outlined-basic"
                label="Amount"
                margin="normal"
                variant="outlined"
              />
            </Div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Invest
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
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
        <AreaChart
          width={1450}
          height={600}
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
      </MainDiv>
    );
  }
}
