import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ReactHtmlParser from "react-html-parser";
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
  MDBIcon
} from "mdbreact";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import {
  MainDiv,
  Container,
  ContainerTwo,
  Filter,
  Logo,
  Description,
  Chart,
  Table,
  days,
  Buttons,
  Amount
} from "../Details/Data";
import { Divider } from "semantic-ui-react";

export default class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      details: [],
      toggleModal: false,
      cryptValue: "",
      amountValue: ""
    };
  }

  handleChart = value => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${this.props.match.params.id}/market_chart?vs_currency=${this.props.currency.value}&days=${value}`
      )
      .then(response => {
        const temp = response.data.prices.map(x => {
          const new_date = new Date(x[0]);
          return {
            date:
              value === 1
                ? new Intl.DateTimeFormat("en-US", {
                    hour: "2-digit",
                    minute: "2-digit"
                  }).format(new_date)
                : new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit"
                  }).format(new_date),
            price: Number(Math.round(x[1] + "e2") + "e-2")
          };
        });
        this.setState({
          data: temp
        });
      });
  };

  componentDidMount = () => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${this.props.match.params.id}`
      )
      .then(response => {
        this.setState({
          details: response.data,
          logo: response.data.image.large,
          desc: response.data.description.en,
          current_price:
            response.data.market_data.current_price[this.props.currency.value],
          market_cap:
            response.data.market_data.market_cap[this.props.currency.value],
          trade_vol:
            response.data.market_data.total_volume[this.props.currency.value],
          price_change_24hr: response.data.market_data.price_change_24h,
          high_24hr:
            response.data.market_data.high_24h[this.props.currency.value],
          low_24hr: response.data.market_data.low_24h[this.props.currency.value]
        });
      });

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${this.props.match.params.id}/market_chart?vs_currency=${this.props.currency.value}&days=1`
      )
      .then(response => {
        const temp = response.data.prices.map(x => {
          const new_date = new Date(x[0]);
          return {
            date: new Intl.DateTimeFormat("en-US", {
              hour: "2-digit",
              minute: "2-digit"
            }).format(new_date),
            price: Number(Math.round(x[1] + "e2") + "e-2")
          };
        });
        this.setState({
          data: temp
        });
      });
  };

  handleClickOpen = () => {
    this.setState({ toggleModal: true });
  };

  handleClose = () => {
    this.setState({ toggleModal: false });
  };

  handleAmount = (val, option) => {
    const crypt =
      option === "amount"
        ? val / this.state.current_price
        : val * this.state.current_price;
    option === "amount"
      ? this.setState({
          cryptValue: crypt,
          amountValue: val
        })
      : this.setState({
          amountValue: crypt,
          cryptValue: val
        });
  };

  handleInvest = e => {
    e.preventDefault();
    const tempDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(Date.now());
    const coinDetails = {
      coin: this.props.match.params.id,
      price: this.state.current_price,
      image: this.state.logo,
      name: this.state.details.name,
      symbol: this.state.details.symbol
    };
    const Obj = {
      date: tempDate,
      invested: this.state.cryptValue,
      amount: this.state.amountValue,
      currency: this.props.currency.value,
      details: coinDetails
    };
    axios
      .post(`http://localhost:4000/transactions`, Obj)
      .then(() => {
        toast.success(
          this.props.currency.unit +
            " " +
            Number(Math.round(this.state.amountValue + "e2") + "e-2") +
            " successfully invested in " +
            this.state.details.name
        );
      })
      .catch(() => {
        toast.error("Try again later!");
      });
  };
  render() {
    return (
      <MainDiv>
        <Container>
          <Logo>
            <img
              src={this.state.logo}
              alt=""
              style={{ width: "210px", height: "200px", paddingRight: "15px" }}
            />
            <p
              style={{
                fontSize: "30px",
                fontWeight: "bold"
              }}
            >
              {this.state.details.name}({this.state.details.symbol})
            </p>
          </Logo>
          <Description>
            <p style={{ fontSize: "16px" }}>
              {ReactHtmlParser(this.state.desc)}
            </p>
          </Description>
        </Container>
        <ContainerTwo>
          <Chart>
            <Filter>
              <ButtonGroup
                size="small"
                aria-label="small outlined button group"
              >
                {days.map(x => {
                  return (
                    <Button
                      onClick={() => this.handleChart(x.value)}
                      key={x.name}
                    >
                      {x.name}
                    </Button>
                  );
                })}
              </ButtonGroup>
            </Filter>
            <div style={{ width: "100%", height: 400 }}>
              <ResponsiveContainer>
                <AreaChart
                  data={this.state.data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis
                    domain={["auto", "auto"]}
                    tickFormatter={label =>
                      `${this.props.currency.unit}${label}`
                    }
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#8884d8"
                    fill="#F0FFF0"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Chart>
          <Table>
            <Buttons>
              <MDBBtn
                color="info"
                style={{ width: "150px", height: "47px" }}
                onClick={this.handleClickOpen}
              >
                <MDBIcon icon="money-bill" className="mr-1" /> Buy
              </MDBBtn>
              <MDBBtn color="danger" style={{ width: "150px", height: "47px" }}>
                <MDBIcon icon="exchange-alt" className="ml-1" /> Sell
              </MDBBtn>
            </Buttons>
            <MDBTable>
              <MDBTableHead>
                <tr>
                  <th>Quick Stats</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <td>{this.state.details.name} Price</td>
                  <td>
                    {this.props.currency.unit} {this.state.current_price}
                  </td>
                </tr>
                <tr>
                  <td>Market Cap</td>
                  <td>
                    {this.props.currency.unit} {this.state.market_cap}
                  </td>
                </tr>
                <tr>
                  <td>Trading Volume </td>
                  <td>
                    {this.props.currency.unit} {this.state.trade_vol}
                  </td>
                </tr>
                <tr>
                  <td>Market Cap Rank </td>
                  <td>#{this.state.details.market_cap_rank}</td>
                </tr>
                <tr>
                  <td>24hr High</td>
                  <td>
                    {this.props.currency.unit} {this.state.high_24hr}
                  </td>
                </tr>
                <tr>
                  <td>24hr Low </td>
                  <td>
                    {this.props.currency.unit} {this.state.low_24hr}
                  </td>
                </tr>
                <tr>
                  <td>24hr Price Change </td>
                  <td>
                    {this.props.currency.unit} {this.state.price_change_24hr}
                  </td>
                </tr>
                <tr>
                  <td>Last Updated</td>
                  <td>{this.state.details.last_updated}</td>
                </tr>
              </MDBTableBody>
            </MDBTable>
          </Table>
        </ContainerTwo>
        <Dialog open={this.state.toggleModal} onClose={this.handleClose}>
          <form onSubmit={e => this.handleInvest(e)}>
            <DialogTitle>
              <img
                src={this.state.logo}
                alt=""
                style={{ width: "60px", height: "50px", paddingRight: "15px" }}
              />
              {this.state.details.name}
            </DialogTitle>
            <DialogContent>
              <select
                className="custom-select"
                style={{ width: "500px", height: "42px" }}
              >
                <option value="10">Payment Method</option>
                <option value="10">Visa</option>
                <option value="50">MasterCard</option>
                <option value="100">Bank Transfer</option>
              </select>
              <Divider />
              <Typography
                variant="h6"
                component="h6"
                style={{ paddingBottom: "10px" }}
              >
                Amount
              </Typography>
              <Amount>
                <TextField
                  label={this.props.currency.value}
                  variant="outlined"
                  style={{ textTransform: "uppercase" }}
                  value={this.state.amountValue}
                  onChange={e => this.handleAmount(+e.target.value, "amount")}
                />
                <MDBIcon icon="exchange-alt" style={{ padding: "20px" }} />
                <TextField
                  label={this.state.details.symbol}
                  variant="outlined"
                  style={{ textTransform: "uppercase" }}
                  value={this.state.cryptValue}
                  onChange={e => this.handleAmount(+e.target.value, "crypt")}
                />
              </Amount>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
                onClick={this.handleClose}
                autoFocus
              >
                Invest
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </MainDiv>
    );
  }
}
