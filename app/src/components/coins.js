import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import Chart from "./chart";
const useStyles = theme => ({
  root: {
    padding: theme.spacing(3, 2),
    marginLeft: theme.spacing(18),
    // background: "#304050",
    // color: "white"
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
  card1: {
    maxWidth: 75
  },
  main: {
    display: "flex",
    // flexDirection: "row",
    flexFlow: "row wrap",
    padding: theme.spacing(2)
  },
  container: {
    flex: 1,
    flexDirection: "row",
    marginLeft: theme.spacing(15)
  },
  container1: {
    flex: 1
  },
  container2: {
    marginLeft: theme.spacing(2),
    fontSize: "20px",
    margin: "30px",
    display: "flex"
  },
  supply: {
    fontSize: "18px"
  },
  vol: {
    fontSize: "18px"
  }
});

class coins extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: {},
      details: {},
      circulating_supply: ""
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
            <div className={classes.main}>
              <div className={classes.container}>
                {/* <Card className={classes.logo}> */}
                <img
                  className={classes.logo}
                  src={this.state.details.image.large}
                />
                {/* </Card> */}

                <Typography className={classes.name}>
                  {this.state.details.name}({this.state.details.symbol})
                </Typography>
                <Typography className={classes.rank}>
                  Market Cap: Rank#
                  <span>{this.state.details.market_cap_rank}</span>
                </Typography>
                <Typography>
                  Websites:{" "}
                  <Link
                    to="`${this.state.details.links.homepage}`"
                    path="http://www.bitcoin.org"
                  >
                    {this.state.details.links.homepage}
                  </Link>
                </Typography>
              </div>
              <div className={classes.container1}>
                <Typography className={classes.price}>
                  <span>
                    {" "}
                    {formatter.format(
                      this.state.details.market_data.current_price.usd
                    )}
                  </span>
                </Typography>
                <div className={classes.container2}>
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
                </div>
                <div className={classes.container2}>
                  <Typography className={classes.vol}>
                    <b>Circulating supply:</b>
                    <span>
                      {"  "}
                      {formatter.format(
                        this.state.details.market_data.low_24h.usd
                      )}
                    </span>
                  </Typography>
                  <Typography className={classes.vol} noWrap>
                    <b>24h Low/24h High:</b>
                    <span>
                      {"  "}
                      {formatter.format(
                        this.state.details.market_data.high_24h.usd
                      )}{" "}
                      /{" "}
                      {formatter.format(
                        this.state.details.market_data.low_24h.usd
                      )}
                    </span>
                  </Typography>
                  {/* <Typography className={classes.vol}>
                    <b>24h High:</b>
                    <span>
                      {"  "}
                      {formatter.format(
                        this.state.details.market_data.low_24h.usd
                      )}
                    </span>
                  </Typography> */}
                </div>
              </div>
            </div>
            <div class="ui clearing divider"></div>
            <div class="ui one item menu">
              <a class="item active">Overview</a>
              {/* <a class="item">Chart</a> */}
            </div>
            <Card className={classes.card}>
              <Typography className={classes.descripName}>
                {this.state.details.name}({this.state.details.symbol})
              </Typography>
              <Typography className={classes.details}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: this.state.details.description.en
                  }}
                ></p>
              </Typography>
              <table class="ui celled padded table">
                <thead>
                  <tr>
                    <th class="single line">24h</th>
                    <th>1 week</th>
                    <th>1 Month</th>
                    <th>6 Months</th>
                    <th>1 Year</th>
                  </tr>
                </thead>
                <tbody>
                  <td>
                    {this.state.details.market_data.price_change_percentage_24h}
                  </td>
                  <td>
                    {this.state.details.market_data.price_change_percentage_7d}
                  </td>
                  <td>
                    {this.state.details.market_data.price_change_percentage_30d}
                  </td>
                  /
                  <td>
                    {
                      this.state.details.market_data
                        .price_change_percentage_200d
                    }
                  </td>
                  <td>
                    {this.state.details.market_data.price_change_percentage_1y}
                  </td>
                </tbody>
              </table>
              <div class="ui clearing divider"></div>
              <div class="ui five item menu">
                <a class="item active">24h</a>
                <a class="item ">7d</a>
                <a class="item ">30d</a>
                <a class="item ">200d</a>
                <a class="item ">1y</a>
              </div>
              <Chart />
            </Card>
          </Paper>
        ) : null}
      </React.Fragment>
    );
  }
}
export default withStyles(useStyles)(coins);
