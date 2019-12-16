import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Card from "@material-ui/core/Card";
import Chart from "./chart";
import {
  Menu,
  Grid,
  Button,
  Header,
  Image,
  Modal,
  Input
} from "semantic-ui-react";
import Sell from "./sell";
import Content from "./content";
import { message } from "antd";
import HeaderContent from "./headerContent";

const useStyles = theme => ({
  root: {
    padding: theme.spacing(3, 2),
    marginLeft: theme.spacing(18),
    maxWidth: 1450
  },
  card: {
    minWidth: 275,
    padding: "20px"
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
      quantity: "",
      open: false,
      totalcoin: "",
      totalCoins: [],
      sellaction: false,
      wallet: [],
      prevWallet: [],
      disableButton: true
    };
  }

  componentDidMount() {
    var coinName = localStorage.getItem("name");
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
          .then(ress => {
            var arr = ress.data.prices.map(x => {
              return {
                name: new Date(x[0]).toLocaleDateString("en-US"),
                uv: x[1]
              };
            });
            this.setState({ chartData: arr });
          });
      })
      .then(
        axios.get("http://localhost:4001/transactions").then(res => {
          res.data.forEach(item => {
            if (item.name === coinName) {
              this.setState({
                totalCoins: this.state.totalCoins.concat(
                  parseInt(item.quantity)
                )
              });
            }
          });
        })
      )
      .catch(err => console.log(err));
  }
  changeAmountValue(e) {
    let totalwallet = this.state.wallet - this.state.price;
    this.setState({
      wallet: totalwallet
    });
  }

  handlePurchaseClick = e => {
    axios.get(`http://localhost:4001/wallet`).then(res => {
      let { amount } = res.data[0];
      this.setState({
        wallet: amount,
        prevWallet: amount
      });
    });
  };
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
    this.setState({ disableButton: false });
    if (e.target.value) {
      if (e.target.value < 10) {
        let totalwallet = this.state.wallet - this.state.price;
        this.setState(
          {
            price:
              this.state.details.market_data.current_price.usd * e.target.value,
            quantity: e.target.value,
            wallet: totalwallet
          },
          () => {
            this.changeAmountValue();
          }
        );
      } else {
        return false;
      }
    } else {
      this.setState(
        {
          price:
            this.state.details.market_data.current_price.usd * e.target.value,
          quantity: e.target.value,
          wallet: this.state.prevWallet
        },
        () => {
          this.changeAmountValue();
        }
      );
    }
  };

  onClick = e => {
    if (this.state.wallet >= this.state.details.market_data.current_price.usd) {
      axios({
        method: `post`,
        url: `http://localhost:4001/transactions`,
        data: {
          name: this.state.details.name,
          price: this.state.details.market_data.current_price.usd,
          totalPrice: this.state.price,
          quantity: this.state.quantity,
          transaction: "buy"
        }
      }).then(res => {
        axios
          .patch(`http://localhost:4001/wallet/1`, {
            amount: this.state.wallet
          })
          .then(response => {});
        message.success("Transaction complete");
        this.setState({ quantity: "", disableButton: true });
      });
    } else {
      message.error("Not enough wallet balance");
    }
  };
  closeModal() {
    this.setState({
      quantity: "",
      disableButton: true
    });
  }
  render() {
    var total = this.state.totalCoins.reduce((a, b) => a + b, 0);
    const { classes } = this.props;
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    });
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
                <Typography variant="h3">
                  {this.state.details.name}({this.state.details.symbol})
                </Typography>
                <Typography variant="h6" className={classes.rank}>
                  Market Cap: Rank#
                  <span>{this.state.details.market_cap_rank}</span>
                </Typography>
                <Typography variant="h6">
                  Websites: {this.state.details.links.homepage}
                </Typography>
              </Grid.Column>
              <Grid.Column className={classes.column}>
                <HeaderContent details={this.state.details} />
                <Typography variant="h5">
                  <b>
                    Total coin:
                    <span> {total ? total : "Not enough coins"}</span>
                  </b>
                </Typography>
                <Modal
                  size="large"
                  trigger={
                    <Button
                      color="teal"
                      onClick={e => this.handlePurchaseClick()}
                    >
                      Purchase
                    </Button>
                  }
                  centered={true}
                  onClose={() => this.closeModal()}
                  closeIcon
                >
                  <Modal.Header>
                    <Typography variant="h3" className={classes.name}>
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
                        <Typography variant="h2" className={classes.price}>
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
                        onChange={e => this.handleChange(e)}
                        min="1"
                        value={this.state.quantity}
                      />
                      <Button
                        color="teal"
                        labelPosition="right"
                        disabled={this.state.disableButton}
                        icon="cart"
                        content="Buy"
                        onClick={e => this.onClick()}
                      ></Button>
                    </Modal.Description>
                    <Modal.Description>
                      <Typography variant="h5">
                        Wallet: {formatter.format(this.state.wallet)}
                      </Typography>
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
                <Modal
                  trigger={
                    total ? (
                      <Button color="teal" onClick={e => this.handleSellClick}>
                        Sell
                      </Button>
                    ) : null
                  }
                  size="tiny"
                  closeIcon
                >
                  <Modal.Content>
                    <Sell
                      total={total}
                      details={this.state.details}
                      quantity={this.state.quantity}
                      price={this.state.price}
                      wallets={this.state.wallet}
                    />
                  </Modal.Content>
                </Modal>
              </Grid.Column>
            </Grid>

            <div className="ui clearing divider"></div>

            <Menu fluid widths={1}>
              <Menu.Item active name="OverView" />
            </Menu>
            <Card className={classes.card}>
              <Content details={this.state.details} />
              <Menu fluid widths={5}>
                <Menu.Item
                  name="1d"
                  day="1"
                  onClick={() => this.handleClick(1)}
                />
                <Menu.Item
                  day="7"
                  name="7d"
                  onClick={() => this.handleClick(7)}
                />
                <Menu.Item
                  name="30d"
                  day="30"
                  onClick={() => this.handleClick(30)}
                />
                <Menu.Item
                  name="200d"
                  day="200"
                  onClick={() => this.handleClick(200)}
                />
                <Menu.Item
                  name="365d"
                  day="365"
                  onClick={() => this.handleClick(365)}
                />
              </Menu>
              <Chart chartData={this.state.chartData} />
            </Card>
          </Paper>
        ) : null}
      </React.Fragment>
    );
  }
}
export default withStyles(useStyles)(coins);
