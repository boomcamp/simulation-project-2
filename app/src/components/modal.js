import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
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
import Typography from "@material-ui/core/Typography";
import axios from "axios";
const useStyles = theme => ({
  price: {
    fontSize: "35px",
    padding: "10px",
    justifyContent: "space-between"
  },
  receipt: {
    display: "flex",
    marginLeft: theme.spacing(38)
  }
});

class modal extends Component {
  constructor() {
    super();

    this.state = {
      id: {},
      details: {}
    };
  }

  render() {
    const { classes } = this.props;

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    });
    return (
      <React.Fragment>
        {this.state.details.description ? (
          <Modal
            size="large"
            trigger={
              <Button color="teal" possitive>
                Purchase
              </Button>
            }
            centered={true}
            closeIcon
          >
            <Modal.Header></Modal.Header>
            <Modal.Content image>
              <span>
                <Image
                  wrapped
                  size="medium"
                  src={this.state.details.image}
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
                  action={{
                    color: "teal",
                    labelPosition: "left",
                    icon: "cart",
                    content: "Buy"
                  }}
                  actionPosition="right"
                  placeholder="Quantity"
                  type="number"
                />
              </Modal.Description>
              <Modal.Description>
                <Typography className={classes.vol}>Item</Typography>
                <div className="ui clearing divider"></div>

                <Typography>
                  Coin: {this.state.details.name}({this.state.details.symbol})
                </Typography>
                <Typography>Quantity:</Typography>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        ) : null}
      </React.Fragment>
    );
  }
}
export default withStyles(useStyles)(modal);
