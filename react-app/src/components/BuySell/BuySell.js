import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Container,
  Button,
  Paper,
  Typography,
  TextField,
  AppBar,
  Toolbar,
  InputAdornment
} from "@material-ui/core";
import "semantic-ui-css/semantic.min.css";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink, useParams } from "react-router-dom";
import TrendingUpOutlinedIcon from "@material-ui/icons/TrendingUpOutlined";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import Buy from "../Buy/Buy";
import Sell from "../Sell/Sell";
import Swal from "sweetalert2";

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
    padding: "0px 20px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  mainCon: {
    width: "90%",
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

export const CoinContext = React.createContext();
export const FormatterContext = React.createContext();

export default function BuySell(props) {
  const classes = useStyles();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [price, setPrice] = useState([]);
  const [symbol, setSymbol] = useState([]);
  const [image, setImage] = useState([]);
  const [coin, setCoin] = useState(0);
  const [amount, setAmount] = useState(0);
  const [sellCoin, setSellCoin] = useState(0);
  const [sellAmount, setSellAmount] = useState(0);
  const [buyBtn, setBuyBtn] = useState(false);
  const [sellBtn, setSellBtn] = useState(false);
  const [balance, setBalance] = useState();
  const [error, setError] = useState(false);
  const [newBalance, setNewBalance] = useState(false);
  const [coinId, setCoinId] = useState([]);

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then(response => {
      setData(response.data);
      setPrice(response.data.market_data.current_price.usd);
      setSymbol(response.data.symbol);
      setImage(response.data.image.small);
      setCoinId(response.data.id);
    });
  }, [id]);

  let totalSellAmount = sellCoin * +price;

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
      setBalance(initBalance.toFixed(6));
    });
  });

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
      <CoinContext.Provider
        value={{
          value: [data],
          value2: [price],
          value3: [symbol],
          value4: [image],
          value5: [coinId]
        }}
      >
        <FormatterContext.Provider value={formatter}>
          <Buy
            amount={amount}
            coin={coin}
            cancel={handleBuy}
            setAmount={setAmount}
            setCoin={setCoin}
          />
        </FormatterContext.Provider>
      </CoinContext.Provider>
    );
  }

  let sell;

  if (sellBtn) {
    if (balance <= 0 || error === true) {
      Swal.fire({
        icon: "error",
        title: `Unable to Sell ${data.name}`,
        text: `Insufficient ${data.name} Shares`
      });
    } else {
      sell = (
        <CoinContext.Provider
          value={{
            value: [data],
            value2: [price],
            value3: [symbol],
            value4: [image],
            value5: [coinId]
          }}
        >
          <FormatterContext.Provider value={formatter}>
            <Sell
              sellAmount={sellAmount}
              sellCoin={sellCoin}
              newBalance={newBalance}
              balance={balance}
              cancel={handleSell}
              setSellAmount={setSellAmount}
              setSellCoin={setSellCoin}
            />
          </FormatterContext.Provider>
        </CoinContext.Provider>
      );
    }
  }

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
              to="/coinlist"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button className={classes.white}>
                <MonetizationOnOutlinedIcon />
                Coin List
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
      <Container style={{ width: "100%" }}>
        <Container className={classes.mainCon}>
          <Paper className={classes.paper}>
            <Paper className={classes.topTitle}>
              <Typography className={classes.typoTitle}>Buy</Typography>
            </Paper>
            <Paper style={{ height: "85%" }}>
              <Paper
                style={{
                  height: "35%",
                  padding: 10,
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
                      var estNet =
                        +e.target.value -
                        (+e.target.value + -e.target.value * 0.01) * 0.01;
                      setAmount(estNet / price);
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
                        <InputAdornment
                          style={{ textTransform: "uppercase" }}
                          position="start"
                        >
                          {symbol}
                        </InputAdornment>
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
              <Paper style={{ paddingBottom: 20 }}>
                <div className={classes.subtitleDiv}>
                  <span className={classes.subtitle}>
                    <p style={{ textTransform: "uppercase" }}>
                      EST. NET ({symbol})
                    </p>{" "}
                  </span>
                  <span className={classes.value}>
                    {formatter.format(+coin - (+coin + -coin * 0.01) * 0.01)}
                  </span>
                </div>
                <div className={classes.subtitleDiv}>
                  <span className={classes.subtitle}>
                    <p style={{ textTransform: "uppercase" }}></p>
                    Coin Base Fee (1%)
                  </span>
                  <span className={classes.value}>
                    {formatter.format((+coin + -coin * 0.01) * 0.01)}
                  </span>
                </div>
                <div className={classes.subtitleDiv}>
                  <span className={classes.subtitle}> Amount:</span>
                  <span className={classes.value}>
                    {formatter.format(coin)}
                  </span>
                </div>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#6fc5d5" }}
                  onClick={handleBuy}
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
            <Paper style={{ height: "85%" }}>
              <Paper
                style={{
                  height: "35%",
                  padding: 10,
                  display: "flex",
                  paddingTop: 20
                }}
              >
                <div className={classes.inputDiv}>
                  <TextField
                    id="outlined-start-adornment"
                    label="Quantity"
                    error={error}
                    helperText={error ? "Not Enough Balance" : ""}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          {props.symbol}
                        </InputAdornment>
                      )
                    }}
                    variant="outlined"
                    type="number"
                    value={sellCoin}
                    onChange={e => {
                      if (+e.target.value > +balance) {
                        setError(true);
                      } else {
                        setSellAmount(props.price * +e.target.value);
                        setNewBalance(+balance - +e.target.value);
                        setError(false);
                      }
                      if (e.target.value > -1) {
                        setSellCoin(+e.target.value);
                      }
                    }}
                  />
                </div>
              </Paper>
              <Paper style={{ paddingBottom: 20 }}>
                <div className={classes.subtitleDiv}>
                  <span className={classes.subtitle}>
                    <p style={{ textTransform: "uppercase" }}>
                      {"\xa0" + data.symbol + "\xa0"}
                    </p>{" "}
                    Quantity:
                  </span>
                  <span className={classes.value}>{sellCoin}</span>
                </div>
                <div className={classes.subtitleDiv}>
                  <span className={classes.subtitle}>
                    <p style={{ textTransform: "uppercase" }}>
                      Current {data.symbol} Shares
                    </p>
                  </span>
                  <span className={classes.value}>{balance}</span>
                </div>
                <div className={classes.subtitleDiv}>
                  <span className={classes.subtitle}>Total Earnings:</span>
                  <span className={classes.value}>
                    {formatter.format(totalSellAmount)}
                  </span>
                </div>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#6fc5d5" }}
                  onClick={handleSell}
                >
                  Sell now
                </Button>
              </Paper>
            </Paper>
          </Paper>
        </Container>
        {buy ? buy : sell}
      </Container>
    </div>
  );
}
