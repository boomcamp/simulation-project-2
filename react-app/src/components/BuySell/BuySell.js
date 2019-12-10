import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  CircularProgress,
  Button,
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment
} from "@material-ui/core";
import "semantic-ui-css/semantic.min.css";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink, useParams } from "react-router-dom";
import { AppBar, Toolbar } from "@material-ui/core";
import TrendingUpOutlinedIcon from "@material-ui/icons/TrendingUpOutlined";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";

const useStyles = makeStyles(theme => ({
  paper: {
    width: "45%",
    height: "65%",
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
    // borderLeft: "10px solid white",
    padding: "0px 20px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  mainCon: {
    width: "90%",
    height: "50vh",
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

export default function BuySell() {
  const classes = useStyles();
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [price, setPrice] = useState([]);
  const [symbol, setSymbol] = useState([]);
  const [image, setImage] = useState([]);
  const [coin, setCoin] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    setLoader(true);
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then(response => {
      setData(response.data);
      setPrice(response.data.market_data.current_price.usd);
      setSymbol(response.data.symbol);
      setImage(response.data.image.small);
      console.log(response.data);
    });
  }, [id]);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  });
  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <NavLink
              to={`/coindetail/${id}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button className={classes.white}>
                <img src={image} alt="img" style={{ height: 20, width: 20 }} />
                {"\xa0" + data.name} Details
              </Button>
            </NavLink>
            <NavLink
              to="/investment-tracking"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button className={classes.white}>
                <TrendingUpOutlinedIcon />
                Investment Tracking
              </Button>
            </NavLink>
          </Toolbar>
        </AppBar>
      </div>
      <Paper
        style={{
          backgroundColor: "transparent",
          width: "100vh",
          boxShadow: "none",
          display: "flex",
          margin: "0 auto"
        }}
      >
        <Typography className={classes.title}>
          <img src={image} alt="img" style={{ width: 60 }} />
          {"\xa0" + data.name} Buy / Sell
        </Typography>
      </Paper>
      <Container className={classes.mainCon}>
        <Paper className={classes.paper}>
          <Paper className={classes.topTitle}>
            <Typography className={classes.typoTitle}>Buy</Typography>
          </Paper>
          <Paper style={{ height: "85%" }}>
            <Paper
              style={{
                height: "35%",
                padding: 20,
                display: "flex",
                paddingTop: 20
              }}
            >
              <div className={classes.inputDiv}>
                <TextField
                  label="Amount"
                  id="outlined-start-adornment"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">&#36;</InputAdornment>
                    )
                  }}
                  variant="outlined"
                  value={coin}
                  type="number"
                  onChange={e => {
                    setAmount(e.target.value / price);
                    setCoin(e.target.value);
                  }}
                />
              </div>
              <div style={{ marginTop: 26 }}>
                <SwapHorizIcon />
              </div>
              <div className={classes.inputDiv}>
                <TextField
                  id="outlined-start-adornment"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">{symbol}</InputAdornment>
                    )
                  }}
                  variant="outlined"
                  type="number"
                  value={amount}
                  onChange={e => {
                    setCoin(e.target.value * price);
                    setAmount(e.target.value);
                  }}
                />
              </div>
            </Paper>
            <Paper style={{ height: "65%" }}>
              <div className={classes.subtitleDiv}>
                <span className={classes.subtitle}>
                  Current
                  <p style={{ textTransform: "uppercase" }}>
                    {"\xa0" + data.symbol + "\xa0"}
                  </p>{" "}
                  Price:
                </span>
                <span className={classes.value}>{formatter.format(price)}</span>
              </div>
              <div className={classes.subtitleDiv}>
                <span className={classes.subtitle}>Total:</span>
                <span className={classes.value}>{formatter.format(coin)}</span>
              </div>
              <Button
                variant="contained"
                style={{ backgroundColor: "#6fc5d5" }}
              >
                Buy now
              </Button>
            </Paper>
          </Paper>
        </Paper>
        <Paper className={classes.paper}>
          <Paper className={classes.topTitle}>
            <Typography className={classes.typoTitle}>Sell</Typography>
          </Paper>
          {/* <Paper style={{ height: "90%" }}>
            <Paper style={{ height: "45%", padding: 20 }}>
              <div className={classes.inputDiv}>
                <span className={classes.inputTitle}>RATE:</span>
                <TextField
                  id="outlined-number"
                  type="number"
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                />
              </div>
              <div className={classes.inputDiv}>
                <span className={classes.inputTitle}>AMOUNT:</span>
                <TextField
                  id="outlined-number"
                  type="number"
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                />
              </div>
            </Paper>
            <Paper
              style={{
                height: "55%",
                padding: 20
              }}
            >
              <div className={classes.subtitleDiv}>
                <span className={classes.subtitle}>Est. Net BTC:</span>
                <span className={classes.value}>$0.00</span>
              </div>
              <div className={classes.subtitleDiv}>
                <span className={classes.subtitle}>Est. Fee BTC: (0.15%)</span>
                <span className={classes.value}>$0.00</span>
              </div>
              <div className={classes.subtitleDiv}>
                <span className={classes.subtitle}>Est. Total BTC:</span>
                <span className={classes.value}>$0.00</span>
              </div>
              <Button
                variant="contained"
                style={{ backgroundColor: "#6fc5d5", marginTop: 20 }}
              >
                Sell now
              </Button>
            </Paper>
          </Paper> */}
        </Paper>
      </Container>
    </div>
  );
}
