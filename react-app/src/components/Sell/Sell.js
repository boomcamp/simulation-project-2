import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Paper, Typography } from "@material-ui/core";
import "semantic-ui-css/semantic.min.css";
import { NavLink, useParams } from "react-router-dom";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import CreditCardIcon from "@material-ui/icons/CreditCard";

export default function BuySell(props) {
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [price, setPrice] = useState([]);
  const [symbol, setSymbol] = useState([]);
  const [image, setImage] = useState([]);
  const [balance, setBalance] = useState([]);

  let coinval = props.coin;
  let coinfee = props.coin * 0.1;
  let totalfee = +coinval + +coinfee;

  useEffect(() => {
    setLoader(true);
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then(response => {
      setData(response.data);
      setPrice(response.data.market_data.current_price.usd);
      setSymbol(response.data.symbol);
      setImage(response.data.image.small);
      // console.log(response.data);
    });
  }, [id]);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  });
  useEffect(() => {
    axios.get(`http/localhost:4000/transactions`).then(response => {
      let initBalance = 0;
      let fArray = response.data.filter(val => {
        return val.coinId === id;
      });
      fArray.forEach(newVal => {
        console.log(newVal.coinQuantity);
        if (newVal.transaction === "buy") initBalance += newVal.coinQuantity;
      });
      setBalance(initBalance);
    });
  }, [id]);

  return (
    <Paper
      style={{
        width: "70%",
        height: "45vh",
        backgroundColor: "white",
        margin: "0 auto",
        marginTop: 20,
        borderRadius: 10
      }}
    >
      <Paper style={{ height: "100%" }}>
        <Paper style={{ boxShadow: "none" }}>
          <Typography
            style={{
              display: "flex",
              flexDirection: "column",
              paddingTop: 30
            }}
          >
            <span style={{ letterSpacing: 5, textTransform: "uppercase" }}>
              You are Selling{" "}
            </span>
            <span
              style={{
                textTransform: "uppercase",
                fontSize: 24,
                fontWeight: "bold"
              }}
            >
              {Math.round(props.amount * 10000) / 10000} {data.symbol}
            </span>
            <span style={{ padding: "10px 0px 10px 0px" }}>
              @ {formatter.format(price)} per{" "}
              <span style={{ textTransform: "uppercase" }}>{data.symbol}</span>
            </span>
            <hr style={{ borderColor: "grey", width: "90%", marginTop: 10 }} />
          </Typography>
        </Paper>
        <Paper style={{ boxShadow: "none" }}>
          <Typography
            style={{
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div style={{ display: "flex" }}>
              <div
                style={{
                  borderRight: "2px solid gray",
                  height: "28vh",
                  width: "30%",
                  display: "flex",
                  flexDirection: "column",
                  paddingTop: 50
                }}
              >
                <div>
                  <span>Payment Method</span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      margin: "0 auto"
                    }}
                  >
                    <AccountBalanceIcon />
                    <span>Bank</span>
                  </div>
                </div>

                <div style={{ paddingTop: 20 }}>
                  <span>Deposit To</span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      margin: "0 auto"
                    }}
                  >
                    <CreditCardIcon />
                    <span style={{ textTransform: "uppercase" }}>
                      {data.symbol + "\xa0"}
                    </span>
                    <span>Wallet</span>
                  </div>
                </div>
              </div>

              <div style={{ width: "20%", height: "10vh", paddingTop: 20 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <span style={{ textTransform: "uppercase" }}>
                    {Math.round(props.amount * 10000) / 10000} {data.symbol}
                  </span>
                  <span style={{ textTransform: "uppercase" }}>
                    Coin Base Fee
                  </span>
                  <span
                    style={{
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      fontSize: 18
                    }}
                  >
                    Total
                  </span>
                </div>
              </div>

              <div style={{ width: "30%", height: "10vh", paddingTop: 20 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly"
                  }}
                >
                  <span>........................................ </span>
                  <span>........................................ </span>
                  <span style={{ fontWeight: "bold" }}>
                    ........................................{" "}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      marginTop: 50
                    }}
                  >
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#6fc5d5" }}
                    >
                      Confirm Buy
                    </Button>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#6fc5d5" }}
                      onClick={() => props.cancel(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>

              <div style={{ width: "20%", height: "10vh", paddingTop: 20 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly"
                  }}
                >
                  <span>{formatter.format(coinval)}</span>
                  <span>{formatter.format(coinfee)}</span>
                  <span style={{ fontWeight: "bold", fontSize: 18 }}>
                    {formatter.format(totalfee)}
                  </span>
                </div>
              </div>
            </div>
          </Typography>
        </Paper>
      </Paper>
    </Paper>
  );
}
