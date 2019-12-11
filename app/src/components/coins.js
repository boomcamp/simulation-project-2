import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Card from "@material-ui/core/Card";
import Chart from "./chart";
import {
  Menu,
  Table,
  Grid,
  Button,
  Icon,
  Header,
  Image,
  Modal,
  Input
} from "semantic-ui-react";
import Transaction from "./transaction";
const useStyles = theme => ({
  root: {
    padding: theme.spacing(3, 2),
    marginLeft: theme.spacing(18),
    maxWidth: 1450
  },
  name: {
    fontSize: "30px"
  },
  descripName: {
    fontSize: "25px"
  },
  logo: {
    maxHeight: 180
  },
  rank: {
    fontSize: "20px"
  },
  price: {
    fontSize: "35px",
    padding: "10px",
    justifyContent: "space-between"
  },
  details: {
    fontSize: "13px",
    textAlign: "center"
  },
  card: {
    minWidth: 275,
    padding: "20px"
  },

  supply: {
    fontSize: "18px"
  },
  vol: {
    fontSize: "18px"
  },
  receipt: {
    display: "flex",
    marginLeft: theme.spacing(38)
  }
});

class coins extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: {},
      details: {},
      chartData: [],
      price: null,
      quantity: ""
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${this.props.match.params.id}`
      )
      .then(res => {
        this.setState({ details: res.data });
        axios
          .get(
            `https://api.coingecko.com/api/v3/coins/${this.props.match.params.id}/market_chart?vs_currency=usd&days=1}`
          )
          .then(res => {
            var arr = res.data.prices.map(x => {
              return {
                name: new Date(x[0]).toLocaleDateString("en-US"),
                uv: x[1]
              };
            });
            this.setState({ chartData: arr });
          });
      });
  }

  handleClick = e => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${this.props.match.params.id}/market_chart?vs_currency=usd&days=${e}`
      )
      .then(res => {
        var arr = res.data.prices.map(x => {
          return {
            name: new Date(x[0]).toLocaleDateString("en-US"),
            uv: x[1]
          };
        });
        this.setState({ chartData: arr });
      });
  };
  handleChange = e => {
    if (e < 10) {
      this.setState({
        price: this.state.details.market_data.current_price.usd * e,
        quantity: e
      });
    } else {
      return false;
    }
  };
  onClick = e => {
    axios({
      method: `post`,
      url: `http://localhost:4000/transactions`,
      data: {
        name: this.state.details.name,
        price: this.state.details.market_data.current_price.usd,
        quantity: this.state.quantity,
        transaction: "buy"
      }
    }).then(res => {
      console.log(res);
    });
    alert("Successfully buy");
  };

  render() {
    const { classes } = this.props;

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    });
    const { activeItem } = this.state;

    return (
      <React.Fragment>
        {this.state.details.description ? (
          <Paper className={classes.root}>
            <Grid centered columns={2} padded="horizontally">
              <Grid.Column>
                <img
                  className={classes.logo}
                  src={this.state.details.image.large}
                  alt="/"
                />
                <Typography className={classes.name}>
                  {this.state.details.name}({this.state.details.symbol})
                </Typography>
                <Typography className={classes.rank}>
                  Market Cap: Rank#
                  <span>{this.state.details.market_cap_rank}</span>
                </Typography>
                <Typography>
                  Websites: {this.state.details.links.homepage}
                </Typography>
              </Grid.Column>
              <Grid.Column>
                <Typography className={classes.price}>
                  <span>
                    {" "}
                    {formatter.format(
                      this.state.details.market_data.current_price.usd
                    )}
                  </span>
                </Typography>
                <Typography className={classes.vol}>
                  <b> Market Cap:</b>
                  <span>
                    {" "}
                    {formatter.format(
                      this.state.details.market_data.market_cap.usd
                    )}
                  </span>
                </Typography>

                <Typography className={classes.vol}>
                  <b>24 Hour Trading Vol:</b>
                  <span>
                    {" "}
                    {formatter.format(
                      this.state.details.market_data.total_volume.usd
                    )}
                  </span>
                </Typography>
                <Typography className={classes.vol} noWrap>
                  <b>24h High</b>
                  <span>
                    {"  "}
                    {formatter.format(
                      this.state.details.market_data.high_24h.usd
                    )}
                  </span>
                </Typography>
                <Typography className={classes.vol} noWrap>
                  <b>24h Low:</b>
                  <span>
                    {" "}
                    {formatter.format(
                      this.state.details.market_data.low_24h.usd
                    )}
                  </span>
                </Typography>

                <Modal
                  size="large"
                  trigger={
                    <Button color="teal" onClick={e => this.handleClick()}>
                      Purchase
                    </Button>
                  }
                  centered={true}
                  closeIcon
                >
                  <Modal.Header>
                    <Typography className={classes.name}>
                      {this.state.details.name}({this.state.details.symbol})
                    </Typography>
                  </Modal.Header>

                  <Modal.Content image>
                    <span>
                      <Image
                        wrapped
                        size="medium"
                        src={this.state.details.image.large}
                        alt="/"
                      />
                    </span>

                    <Modal.Description>
                      <Header>
                        <Typography className={classes.price}>
                          <span>
                            {" "}
                            {formatter.format(
                              this.state.details.market_data.current_price.usd
                            )}
                          </span>
                        </Typography>
                      </Header>
                      <Input
                        placeholder="Quantity"
                        onChange={e => this.handleChange(e.target.value)}
                        min="1"
                        value={this.state.quantity}
                      />
                      <Button
                        color="teal"
                        labelPosition="right"
                        icon="cart"
                        content="Buy"
                        onClick={e => this.onClick()}
                      ></Button>
                    </Modal.Description>
                    <Modal.Description>
                      <Typography variant="h5">Item</Typography>
                      <div className="ui clearing divider"></div>

                      <Typography variant="h6">
                        Coin: {this.state.details.name}(
                        {this.state.details.symbol})
                      </Typography>
                      <Typography variant="h6">
                        Price:
                        <span>
                          {" "}
                          {formatter.format(
                            this.state.details.market_data.current_price.usd
                          )}
                        </span>
                      </Typography>
                      <Typography variant="h6">
                        Quantity:{" "}
                        <span>
                          {"  "}
                          {this.state.quantity}
                        </span>
                      </Typography>
                      <div className="ui clearing divider"></div>
                      <Typography variant="h5">
                        Total Price: {formatter.format(this.state.price)}
                      </Typography>
                    </Modal.Description>
                  </Modal.Content>
                </Modal>
              </Grid.Column>
            </Grid>

            <div className="ui clearing divider"></div>

            <Menu fluid widths={2}>
              <Menu.Item active name="OverView" />
              <Menu.Item name="Historical Transaction" />
            </Menu>
            <Card className={classes.card}>
              <Typography className={classes.descripName}>
                {this.state.details.name}({this.state.details.symbol})
              </Typography>
              <Typography
                className={classes.details}
                dangerouslySetInnerHTML={{
                  __html: this.state.details.description.en
                }}
              ></Typography>

              <Table celled fixed singleLine textAlign="center">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>24h</Table.HeaderCell>
                    <Table.HeaderCell>1 week</Table.HeaderCell>
                    <Table.HeaderCell>1 Month</Table.HeaderCell>
                    <Table.HeaderCell>6 Months</Table.HeaderCell>
                    <Table.HeaderCell>1 year</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      {" "}
                      {
                        this.state.details.market_data
                          .price_change_percentage_24h
                      }
                    </Table.Cell>
                    <Table.Cell>
                      {
                        this.state.details.market_data
                          .price_change_percentage_7d
                      }
                    </Table.Cell>
                    <Table.Cell>
                      {" "}
                      {
                        this.state.details.market_data
                          .price_change_percentage_30d
                      }
                    </Table.Cell>
                    <Table.Cell>
                      {
                        this.state.details.market_data
                          .price_change_percentage_200d
                      }
                    </Table.Cell>
                    <Table.Cell>
                      {
                        this.state.details.market_data
                          .price_change_percentage_1y
                      }
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>

              <Menu fluid widths={5}>
                <Menu.Item
                  name="1d"
                  day="1"
                  active={activeItem === "1"}
                  onClick={() => this.handleClick(1)}
                />
                <Menu.Item
                  day="7"
                  name="7d"
                  active={activeItem === "7d"}
                  onClick={() => this.handleClick(7)}
                />
                <Menu.Item
                  name="30d"
                  day="30"
                  active={activeItem === "30d"}
                  onClick={() => this.handleClick(30)}
                />
                <Menu.Item
                  name="200d"
                  day="200"
                  active={activeItem === "200d"}
                  onClick={() => this.handleClick(200)}
                />
                <Menu.Item
                  name="365d"
                  day="365"
                  active={activeItem === "365"}
                  onClick={() => this.handleClick(365)}
                />
              </Menu>
              <Chart chartData={this.state.chartData} />
              <Transaction />
            </Card>
          </Paper>
        ) : null}
      </React.Fragment>
    );
  }
}
export default withStyles(useStyles)(coins);
