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
import ButtonGroup from "@material-ui/core/ButtonGroup";
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
  BackContainer
} from "../Details/Data";
import Modal from "../Modal/Modal";
export default class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      details: [],
      toggleModal: false
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

  handleInvest = e => {
    this.setState({ toggleModal: false });
    e.preventDefault();
    const tempDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(Date.now());
    const coinDetails = {
      coinId: this.props.match.params.id,
      price: this.state.current_price,
      image: this.state.logo,
      name: this.state.details.name,
      symbol: this.state.details.symbol
    };
    const Obj = {
      date: tempDate,
      amount: this.props.amountValue,
      amountSold: 0,
      currency: this.props.currency.value,
      details: coinDetails
    };
    axios
      .post(`http://localhost:4000/transactions`, Obj)
      .then(() => {
        toast.success(
          this.props.currency.unit +
            " " +
            Number(Math.round(this.props.amountValue + "e2") + "e-2") +
            " successfully invested in " +
            this.state.details.name
        );
        this.props.handleAmount(0, "amount", 0);
        this.props.handleAmount(0, "crypt", 0);
        this.props.history.push("/investments");
      })
      .catch(() => {
        toast.error("Try again later!");
      });
  };

  render() {
    return (
      <MainDiv>
        <BackContainer>
          <Button
            variant="outlined"
            style={{ width: "100px" }}
            onClick={this.props.history.goBack}
          >
            Back
          </Button>
        </BackContainer>
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
                style={{ width: "400px", height: "47px" }}
                onClick={this.handleClickOpen}
              >
                <MDBIcon icon="money-bill" className="mr-1" /> Buy
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
        <Modal
          toggleModal={this.state.toggleModal}
          handleClose={this.handleClose}
          handleInvest={this.handleInvest}
          logo={this.state.logo}
          name={this.state.details.name}
          handleAmount={this.props.handleAmount}
          amountValue={this.props.amountValue}
          cryptValue={this.props.cryptValue}
          price={this.state.current_price}
          symbol={this.state.details.symbol}
          details={"details"}
        />
      </MainDiv>
    );
  }
}
