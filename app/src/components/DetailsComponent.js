import React, { Component } from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "@material-ui/core";
import Background from "./background.jpg";
import axios from "axios";
import "./details.css";
import Chart from "./chart";
import Buy from "./buy";
import Sell from "./sell"
var commaNumber = require("comma-number");
export default class details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: [],

      data: null
    };
  }

  componentWillReceiveProps() {
    this.setState({ details: this.props.details });

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${localStorage.getItem("id")}`
      )
      .then(res => {
        this.setState({
          data: res.data,
          rowone:
            res.data.market_data.price_change_percentage_1h_in_currency.usd,
          rowtwo: res.data.market_data.price_change_percentage_24h,
          rowthree:
            res.data.market_data.price_change_percentage_7d_in_currency.usd,
          rowfour:
            res.data.market_data.price_change_percentage_14d_in_currency.usd,
          rowfive:
            res.data.market_data.price_change_percentage_30d_in_currency.usd,
          rowsix:
            res.data.market_data.price_change_percentage_1y_in_currency.usd
        });
      });
      if(this.state.details){
        localStorage.setItem("currentPrice",this.state.details.current_price)
      }
  }

  render() {

    return (
      <React.Fragment>
        <div
          style={{
            backgroundImage: `url(${Background})`,
            height: 700,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        >
          <DialogTitle id="alert-dialog-title">
            <img src={this.props.image} alt="" />
          </DialogTitle>
          <DialogContent>
            {/* main div */}
            <div
              style={{
                display: "fl  ex",
                justifyContent: "center"
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <div>
                  <img
                    src={this.props.details ? this.props.details.image : null}
                    style={{
                      height: "120px"
                    }}
                    alt=""
                  />
                  <h1
                    style={{
                      color: "white",
                      display: "flex",
                      fontSize: "40px "
                    }}
                  >
                    {this.state.details ? this.state.details.name : null}
                    <p
                      style={{
                        fontSize: "20px "
                      }}
                    >
                      {this.state.details
                        ? "(" + this.state.details.symbol + ")"
                        : null}
                    </p>
                  </h1>
                </div>
                <div>
                  <h1 style={{ color: "white", fontSize: "100px" }}>
                    {this.state.details
                      ? "$" + commaNumber(this.state.details.current_price)
                      : null}
                  </h1>
                </div>
                <div>
                  <h2 style={{ color: "white" }}>CURRENT PRICE</h2>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "70px",
                    border: "solid 1px  white",
                    padding: "20px"
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        color: "white",
                        textAlign: "center",
                        margin: "0 50px 0 50px",
                        paddingRight: "100px",
                        borderRight: "solid 1px"
                      }}
                    >
                      <span
                        style={{
                          fontSize: 15
                        }}
                      >
                        MARKET CAP
                      </span>
                      <br />
                      <h1>
                        {this.props.details
                          ? "$" + commaNumber(this.props.details.market_cap)
                          : null}
                      </h1>
                    </div>
                    <div
                      style={{
                        color: "white",
                        textAlign: "center",
                        margin: "0 50px 0 50px",
                        paddingRight: "100px",
                        borderRight: "solid 1px"
                      }}
                    >
                      <span
                        style={{
                          fontSize: 15
                        }}
                      >
                        24 Hour Trading Vol
                      </span>
                      <br />
                      <h1>
                        {this.state.data
                          ? "$" +
                            commaNumber(
                              this.state.data.market_data.total_volume.usd
                            )
                          : null}
                      </h1>
                    </div>
                    <div
                      style={{
                        color: "white",
                        textAlign: "center",
                        margin: "0 50px 0 50px",
                        paddingRight: "100px",
                        borderRight: "solid 1px"
                      }}
                    >
                      <span
                        style={{
                          fontSize: 15
                        }}
                      >
                        24h Low / 24h high
                      </span>
                      <br />
                      <h1>
                        {this.state.data
                          ? "$" +
                            commaNumber(
                              this.state.data.market_data.low_24h.usd
                            ) +
                            "/" +
                            "$" +
                            commaNumber(
                              this.state.data.market_data.high_24h.usd
                            )
                          : null}
                      </h1>
                    </div>
                    <div
                      style={{
                        color: "white",
                        textAlign: "center",
                        margin: "0 50px 0 50px"
                      }}
                    >
                      <span
                        style={{
                          fontSize: 15
                        }}
                      >
                        Circulating Supply
                      </span>
                      <br />
                      <h1>
                        {this.state.details
                          ? "$" +
                            commaNumber(this.state.details.circulating_supply)
                          : null}
                      </h1>
                    </div>
                  </div>
                </div>
                <Buy details={this.state.details} />
                <div
                  style={{
                    color: "black",
                    fontSize: "20px",
                    marginTop: 20,
                    letterSpacing: 2,
                    fontFamily: "Lato,'Helvetica",
                    textAlign: "justify",
                    lineHeight: 1.5,
                    width: "95%"
                  }}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: this.state.data
                        ? this.state.data.description.en
                        : null
                    }}
                  />
                </div>
              </div>
            </div>
          </DialogContent>

          <Chart
            rowone={this.state.rowone}
            rowtwo={this.state.rowtwo}
            rowthree={this.state.rowthree}
            rowfour={this.state.rowfour}
            rowfive={this.state.rowfive}
            rowsix={this.state.rowsix}
          />

          <DialogActions>
            <Button
              onClick={this.props.close}
              variant="contained"
              color="primary"
              autoFocus
            >
              Close
            </Button>
          </DialogActions>
        </div>
        {/* <Sell details={this.props.details}/> */}
      </React.Fragment>
    );
  }
}
