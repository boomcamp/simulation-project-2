import React, { useEffect, useState } from "react";
import axios from "axios";
import { Paper, Typography } from "@material-ui/core";
import "semantic-ui-css/semantic.min.css";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  paper: {
    width: "23%",
    height: "100%",
    color: "white",
    borderRadius: 10
  },
  topTitle: {
    height: "25%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    margin: "0 auto",
    boxShadow: "none",
    backgroundColor: "#6fc5d5"
  },
  typoTitle: {
    padding: 10,
    fontFamily: "Saira Semi Condensed, sans-serif",
    fontSize: 20
  },
  title: {
    fontFamily: "Saira Semi Condensed, sans-serif",
    fontSize: 40,
    color: "white",
    textAlign: "left",
    padding: "0px 20px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  mainCon: {
    width: "90%",
    height: "20vh",
    margin: "30px auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  root: {
    display: "flex"
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  white: {
    color: "white",
    fontSize: 16,
    marginRight: 40
  },
  appBar: {
    background: "transparent",
    border: "none",
    boxShadow: "none"
  }
}));

export default function BuySell(props) {
  const classes = useStyles();
  const { id } = useParams();
  const [buyLength, setBuyLength] = useState([]);
  const [sellLength, setSellLength] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [data, setData] = useState([]);
  const [balance, setBalance] = useState([]);

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then(response => {
      setData(response.data);
    });
  }, [id]);

  useEffect(() => {
    axios.get(`http://localhost:4000/transactions`).then(response => {
      let initBalance = 0;
      let fArray = response.data.filter(val => {
        return val.coinId === id;
      });
      fArray.forEach(newVal => {
        if (newVal.transaction === "Buy") initBalance += newVal.coinQuantity;
        else {
          initBalance -= newVal.coinQuantity;
        }
      });
      setBalance(initBalance.toFixed(2));

      setBuyLength(
        response.data.filter(val => {
          return val.coinId === id && val.transaction === "Buy";
        }).length
      );
      setSellLength(
        response.data.filter(val => {
          return val.coinId === id && val.transaction === "Sell";
        }).length
      );
      setTransaction(
        response.data.filter(val => {
          return val.coinId === id && val.transaction;
        }).length
      );
    });
  }, [id]);
  return (
    <div>
      <div
        style={{
          width: "90%",
          margin: "0 auto"
        }}
      >
        <div className={classes.mainCon}>
          <Paper className={classes.paper}>
            <Paper className={classes.topTitle}>
              <Typography className={classes.typoTitle}>Bought</Typography>
            </Paper>
            <Paper style={{ height: "80%", fontSize: 100 }}>
              <p style={{ color: "black", fontSize: "7vh" }}>
                {buyLength}
                <p style={{ fontSize: 24 }}>Transactions</p>
              </p>
            </Paper>
          </Paper>
          <Paper className={classes.paper}>
            <Paper className={classes.topTitle}>
              <Typography className={classes.typoTitle}>Sold</Typography>
            </Paper>
            <Paper style={{ height: "80%" }}>
              <p style={{ color: "black", fontSize: "7vh" }}>
                {sellLength}
                <p style={{ fontSize: 24 }}>Transactions</p>
              </p>
            </Paper>
          </Paper>
          <Paper className={classes.paper}>
            <Paper className={classes.topTitle}>
              <Typography className={classes.typoTitle}>
                Total Number of Transactions
              </Typography>
            </Paper>
            <Paper style={{ height: "80%" }}>
              <p style={{ color: "black", fontSize: "7vh" }}>
                {transaction}
                <p style={{ fontSize: 24 }}>Transactions</p>
              </p>
            </Paper>
          </Paper>{" "}
          <Paper className={classes.paper}>
            <Paper className={classes.topTitle}>
              <Typography className={classes.typoTitle}>
                {data.name} Balance
              </Typography>
            </Paper>
            <Paper style={{ height: "80%" }}>
              <p style={{ color: "black", fontSize: "7vh" }}>
                {balance}
                <p style={{ fontSize: 20 }}>{data.name}</p>
              </p>
            </Paper>
          </Paper>
        </div>
      </div>
    </div>
  );
}
