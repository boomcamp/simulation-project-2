import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Card from "@material-ui/core/Card";
import { textAlign, display, flexbox } from "@material-ui/system";

const useStyles = theme => ({
  root: {
    padding: theme.spacing(3, 2)
  },
  name: {
    fontSize: "30px"
  },
  logo: {
    maxHeight: 70,
    minWidth: 50
  },
  price: {
    fontSize: "20px"
  },
  details: {
    fontSize: "13px",
    textAlign: "center"
  },
  card: {
    minWidth: 275,
    padding: "20px"
  },
  card1: {
    maxWidth: 75
  },
  container: {
    display: "flex",
    flexDirection: "column"
  },
  links: {
    fontSize: "15px"
  }
});

class coins extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: {},
      details: {}
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${this.props.match.params.id}`
      )
      .then(res => {
        this.setState({ details: res.data });
      });
  }

  render() {
    const { classes } = this.props;
    // console.log(this.state.details);
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    });
    return (
      <React.Fragment>
        {this.state.details.description ? (
          <Paper className={classes.root}>
            <Card className={classes.card1}>
              <img
                className={classes.logo}
                src={this.state.details.image.large}
              />
            </Card>

            <Typography className={classes.name}>
              {this.state.details.name}({this.state.details.symbol})
            </Typography>
            <div className={classes.container}>
              <Typography className={classes.price}>
                Market Cap: Rank#
                {this.state.details.market_cap_rank}
              </Typography>
              <Typography className={classes.links}>
                Market Price:
                {formatter.format(
                  this.state.details.market_data.current_price.usd
                )}
              </Typography>
              <Typography className={classes.links}>
                24 Hour Trading Vol:
                {formatter.format(
                  this.state.details.market_data.total_volume.usd
                )}
              </Typography>
              <Typography className={classes.links}>
                24h Low / 24h High:
                {formatter.format(this.state.details.market_data.high_24h.usd)}
              </Typography>
              <Typography className={classes.links}>
                24h High:
                {formatter.format(this.state.details.market_data.high_24h.usd)}
              </Typography>
            </div>
            <Card className={classes.card}>
              <Typography className={classes.details}>
                {this.state.details.description.en}
              </Typography>
            </Card>
            <Typography></Typography>
          </Paper>
        ) : null}
      </React.Fragment>
    );
  }
}
export default withStyles(useStyles)(coins);
