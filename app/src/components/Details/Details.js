import React from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
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
  months
} from "../Details/Data";

export default class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      details: []
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
                ? new_date.getMinutes() < 10
                  ? new_date.getHours() + ":0" + new_date.getMinutes()
                  : new_date.getHours() + ":" + new_date.getMinutes()
                : new_date.getDate() + " " + months[new_date.getMonth()],
            price: x[1]
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
            date:
              new_date.getMinutes() < 10
                ? new_date.getHours() + ":0" + new_date.getMinutes()
                : new_date.getHours() + ":" + new_date.getMinutes(),
            price: x[1]
          };
        });
        this.setState({
          data: temp
        });
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
            <AreaChart
              width={1050}
              height={400}
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
                tickFormatter={label => `${this.props.currency.unit}${label}`}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#8884d8"
                fill="#F0FFF0"
              />
            </AreaChart>
          </Chart>
          <Table>
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
      </MainDiv>
    );
  }
}
