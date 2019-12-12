import React, { useEffect, useState } from "react";
import axios from "axios";
import { Paper, Typography } from "@material-ui/core";
import "semantic-ui-css/semantic.min.css";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink, useParams } from "react-router-dom";
import Buy from "../Buy/Buy";
import Sell from "../Sell/Sell";

const useStyles = makeStyles(theme => ({
  paper: {
    width: "45%",
    height: "100%",
    color: "white",
    borderRadius: 10
  },
  topTitle: {
    height: "15%",
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
    width: "100%",
    height: "25vh",
    margin: "20px auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  subtitleDiv: {
    fontFamily: "Saira Semi Condensed, sans-serif",
    display: "flex",
    flexDirection: "column",
    margin: "0 auto"
  },
  subtitle: {
    fontSize: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  inputDiv: {
    width: "100%",
    display: "inline-grid",
    flexDirection: "row",
    justifyContent: "center",
    margin: 10
  },
  inputTitle: {
    fontFamily: "Saira Semi Condensed, sans-serif",
    fontSize: 15,
    fontWeight: "bold",
    textTransform: "uppercase"
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
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [price, setPrice] = useState([]);
  const [symbol, setSymbol] = useState([]);
  const [image, setImage] = useState([]);
  const [coin, setCoin] = useState(null);
  const [amount, setAmount] = useState(0);
  const [sellCoin, setSellCoin] = useState(null);
  const [sellAmount, setSellAmount] = useState(0);
  const [buyBtn, setBuyBtn] = useState(false);
  const [sellBtn, setSellBtn] = useState(false);

  useEffect(() => {
    setLoader(true);
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then(response => {
      setData(response.data);
      setPrice(response.data.market_data.current_price.usd);
      setSymbol(response.data.symbol);
      setImage(response.data.image.small);
      //   console.log(response.data);
    });
  }, [id]);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  });

  const handleBuy = val => {
    setBuyBtn(val);
  };
  const handleSell = val => {
    setSellBtn(val);
  };

  let buy;
  if (buyBtn) {
    buy = (
      <Buy
        amount={amount}
        coin={coin}
        cancel={handleBuy}
        setAmount={setAmount}
        setCoin={setCoin}
      />
    );
  }

  let sell;

  if (sellBtn) {
    sell = <Sell amount={amount} coin={coin} cancel={handleSell} />;
  }
  return (
    <div>
      <div style={{ width: "80%", margin: "0 auto" }}>
        <div className={classes.mainCon}>
          <Paper className={classes.paper}>
            <Paper className={classes.topTitle}>
              <Typography className={classes.typoTitle}>Buy</Typography>
            </Paper>
          </Paper>
          <Paper className={classes.paper}>
            <Paper className={classes.topTitle}>
              <Typography className={classes.typoTitle}>Sell</Typography>
            </Paper>
          </Paper>
        </div>
      </div>
    </div>
  );
}
