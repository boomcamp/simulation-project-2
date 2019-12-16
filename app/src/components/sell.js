import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { Image, Modal, Input, Grid, Button } from "semantic-ui-react";
import { withStyles } from "@material-ui/core";
import { message } from "antd";
import axios from "axios";

const useStyle = theme => ({
  content: {
    height: "300px",
    width: "100%"
  }
});

class modal extends Component {
  constructor() {
    super();

    this.state = {
      quantity: "",
      totalprice: 0,
      wallet: null
    };
  }
  componentDidMount() {
    axios.get(`http://localhost:4001/wallet/1`).then(response => {
      this.setState({
        wallet: response.data.amount
      });
      // console.log(response.data);
    });
  }

  handleChange = e => {
    this.props.total >= e.target.value
      ? this.setState({
          quantity: e.target.value,
          totalprice:
            this.props.details.market_data.current_price.usd * e.target.value
        })
      : message.error("Not enough Coin");
  };
  handleSellClick = () => {
    var total = this.state.wallet - this.state.totalprice;

    axios
      .patch(`http://localhost:4001/wallet/1`, {
        amount: total
      })
      .then(res => {
        this.setState({
          wallet: res.data.amount
        });
      });
  };
  handleSellClick = () => {
    axios({
      method: `post`,
      url: `http://localhost:4001/transactions`,
      data: {
        name: this.props.details.name,
        price: this.props.details.market_data.current_price.usd,
        totalPrice: this.state.totalprice,
        quantity: -this.state.quantity,
        transaction: "sell"
      }
    });
    this.setState({
      quantity: "",
      totalprice: ""
    });
    message.success("Successfully sell");
  };
  render() {
    const { classes } = this.props;
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    });
    return (
      <React.Fragment>
        <Modal.Header>
          <Typography variant="h4">
            Wallet: {formatter.format(this.state.wallet)}
          </Typography>
        </Modal.Header>
        <Modal.Content>
          <div className="ui clearing divider"></div>
          <div className={classes.content}>
            <Grid columns={2}>
              <Grid.Column>
                <Image
                  wrapped
                  size="medium"
                  src={this.props.details.image.large}
                  alt="/"
                />
                <Typography variant="h4">
                  {this.props.details.name}({this.props.details.symbol})
                </Typography>
              </Grid.Column>
              <Grid.Column>
                {" "}
                <Typography variant="h6">
                  Total Coin: <span>{this.props.total}</span>
                </Typography>
                <Typography variant="h6">
                  Price:
                  <span>
                    {" "}
                    {formatter.format(
                      this.props.details.market_data.current_price.usd
                    )}
                  </span>
                </Typography>
                <Typography variant="h6">Quantity:</Typography>
                <Input
                  placeholder="Quantity"
                  onChange={e => this.handleChange(e)}
                  min="1"
                  value={this.state.quantity}
                />
                <Typography variant="h6">Total price:</Typography>
                <Input value={this.state.totalprice} />
                <Button color="teal" onClick={e => this.handleSellClick()}>
                  Sell
                </Button>
              </Grid.Column>
            </Grid>
          </div>
        </Modal.Content>
      </React.Fragment>
    );
  }
}
export default withStyles(useStyle)(modal);
