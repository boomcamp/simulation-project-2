import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const useStyles = theme => ({
  price: {
    padding: "10px",
    justifyContent: "space-between"
  }
});
class headerContent extends Component {
  render() {
    const { classes } = this.props;

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    });
    return (
      <React.Fragment>
        <Typography variant="h3" className={classes.price}>
          <span>
            {" "}
            {formatter.format(this.props.details.market_data.current_price.usd)}
          </span>
        </Typography>
        <Typography variant="h5">
          <b> Market Cap:</b>
          <span>
            {" "}
            {formatter.format(this.props.details.market_data.market_cap.usd)}
          </span>
        </Typography>
        <Typography variant="h5">
          <b>24 Hour Trading Vol:</b>
          <span>
            {" "}
            {formatter.format(this.props.details.market_data.total_volume.usd)}
          </span>
        </Typography>
        <Typography variant="h5" noWrap>
          <b>24h High:</b>
          <span>
            {"  "}
            {formatter.format(this.props.details.market_data.high_24h.usd)}
          </span>
        </Typography>
        <Typography variant="h5" noWrap>
          <b>24h Low:</b>
          <span>
            {" "}
            {formatter.format(this.props.details.market_data.low_24h.usd)}
          </span>
        </Typography>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(headerContent);
