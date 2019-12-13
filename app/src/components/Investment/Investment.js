import React from "react";
import { FaExchangeAlt } from "react-icons/fa";
import TextField from "@material-ui/core/TextField";
import Select from "react-select";
import {
  Div,
  Left,
  Right,
  Buy,
  Tracking,
  Label,
  Value,
  Button,
  Box,
  CryptoBtn,
  CryptoImg,
  CryptoName,
  Suggestions,
  Title,
  active,
  Convert,
  ConvertBox,
  Icon,
  History,
  ValueBox,
  Fresh,
  red,
  blue,
  green
} from "./Style";
import "../../App.css";
import Table from "./Table";
import { list } from "./Data";
import Axios from "axios";
import { toast } from "react-toastify";
const tempDate = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit"
}).format(Date.now());

export default class Investment extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPrice: null,
      cryptoValue: "",
      moneyValue: "",
      lastTrans: {},
      transList: [],
      sellingAmount: "",
      open: false,
      totalProfit: "",
      currentTransaction: {},
      cryptoList: [],
      crypto: {
        value: "bitcoin",
        label: "Bitcoin",
        unit: "btc"
      }
    };
  }
  handleClickOpen = val => {
    this.setState({
      open: true,
      currentTransaction: val
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };
  getData = () => {
    Axios.get("http://localhost:4000/transactions").then(res => {
      let sum = res.data.map(x => x.profit).reduce((a, b) => a + b, 0);
      const temp = res.data.map(x => {
        Axios.get(`https://api.coingecko.com/api/v3/coins/${x.crypto.id}`).then(
          res => {
            x["currentPrice"] = res.data.market_data.current_price.usd;
          }
        );
        return x;
      });
      this.setState({
        transList: temp,
        lastTrans: res.data[res.data.length - 1],
        totalProfit: sum
      });
      setTimeout(() => {
        this.setState({ loading: false });
      }, 1000);
    });
  };
  componentDidMount() {
    Axios.get("https://api.coingecko.com/api/v3/coins/bitcoin").then(res => {
      this.setState({
        currentPrice: res.data.market_data.current_price.usd
      });
    });
    this.getData();

    Axios.get("https://api.coingecko.com/api/v3/coins/list").then(res => {
      this.setState({
        cryptoList: res.data
      });
    });
  }

  handleCrypto = val => {
    this.setState({
      crypto: val
    });
    Axios.get(`https://api.coingecko.com/api/v3/coins/${val.value}`).then(
      res => {
        this.setState({
          currentPrice: res.data.market_data.current_price.usd
        });
        if (this.state.cryptoValue !== "") {
          this.setState({
            cryptoValue:
              this.state.moneyValue / res.data.market_data.current_price.usd
          });
        }
      }
    );
  };
  handleOnChange = (val, action, data) => {
    if (action === "money") {
      this.setState({
        moneyValue: val,
        cryptoValue: Number((val / this.state.currentPrice).toFixed(9))
      });
    } else if (action === "crypto") {
      this.setState({
        cryptoValue: val,
        moneyValue: val * this.state.currentPrice
      });
    } else {
      this.setState({
        sellingAmount: val
      });
      if (data) {
        if (data.amount < val) {
          toast.info(
            `Only ${data.amount} ${data.crypto.id} left on this investment!`,
            {
              position: toast.POSITION.TOP_CENTER
            }
          );
          this.setState({
            sellingAmount: data.amount - data.amountSold
          });
        }
      }
    }
  };
  handleSubmitInvest = e => {
    e.preventDefault();
    this.setState({ loading: true });
    Axios.get(
      `https://api.coingecko.com/api/v3/coins/${this.state.crypto.value}`
    )
      .then(res => {
        var obj = {
          id: this.state.crypto.value,
          img: res.data.image.large,
          unit: this.state.crypto.unit
        };
        Axios.post("http://localhost:4000/transactions", {
          crypto: obj,
          amount: Number(this.state.cryptoValue.toFixed(9)),
          price: this.state.currentPrice,
          amountSold: 0,
          profit: 0,
          dateSold: ""
        })
          .then(() => {
            this.setState({ moneyValue: "", cryptoValue: "" });
            this.getData();
            toast.info("Investment Successful!", {
              position: toast.POSITION.TOP_CENTER
            });
          })
          .catch(err =>
            toast.error(err.response.data, {
              position: toast.POSITION.TOP_CENTER
            })
          );
      })
      .catch(err => {
        toast.error(err.response.data, {
          position: toast.POSITION.TOP_CENTER
        });
      });
  };
  handleSubmitSell = (e, data) => {
    e.preventDefault();
    const temp =
      this.state.sellingAmount * data.currentPrice -
      this.state.sellingAmount * data.price;
    Axios.patch(`http://localhost:4000/transactions/${data.id}`, {
      amountSold: this.state.sellingAmount + data.amountSold,
      profit: temp + data.profit,
      dateSold: tempDate
    })
      .then(() => {
        this.setState({ open: false });
        this.getData();
        toast.info("Sold Successfully!", {
          position: toast.POSITION.TOP_CENTER
        });
      })
      .catch(err =>
        toast.error(err.response.data, {
          position: toast.POSITION.TOP_CENTER
        })
      );
  };
  render() {
    const { currency, loading, handleUpdate } = this.props;
    const cryptoList2 = this.state.cryptoList.map(x => {
      return { value: x.id, label: x.name, unit: x.symbol };
    });
    return (
      <Div>
        <Left>
          <Table
            transList={this.state.transList}
            loading={loading}
            handleOnChange={this.handleOnChange}
            handleSubmitSell={this.handleSubmitSell}
            handleClickOpen={this.handleClickOpen}
            handleClose={this.handleClose}
            open={this.state.open}
            currentTransaction={this.state.currentTransaction}
            sellingAmount={this.state.sellingAmount}
            handleUpdate={handleUpdate}
          />
        </Left>
        <Right>
          <Tracking>
            {this.state.lastTrans ? (
              <React.Fragment>
                <History>Last Investment:</History>
                <Label>
                  {this.state.lastTrans.crypto
                    ? this.state.lastTrans.crypto.id
                    : ""}{" "}
                  :
                  <ValueBox style={{ textTransform: "uppercase" }}>
                    {this.state.lastTrans.amount
                      ? Number(this.state.lastTrans.amount.toFixed(6))
                      : ""}{" "}
                    {this.state.lastTrans.crypto
                      ? this.state.lastTrans.crypto.unit
                      : ""}
                  </ValueBox>
                </Label>
                <Value style={{ margin: "0 0 10px 0" }}>
                  Price : <ValueBox>${this.state.lastTrans.price}</ValueBox>
                </Value>
                <History
                  style={{
                    padding: "20px 0 10px 0",
                    borderTop: "2px solid gray"
                  }}
                >
                  <Label style={{ padding: "0px" }}>
                    Total Profit/Loss:{" "}
                    <ValueBox
                      style={
                        this.state.totalProfit > 0
                          ? green
                          : this.state.totalProfit < 0
                          ? red
                          : blue
                      }
                    >
                      $
                      {this.state.totalProfit
                        ? Number(this.state.totalProfit.toFixed(4))
                        : 0}
                    </ValueBox>
                  </Label>
                </History>
              </React.Fragment>
            ) : (
              <Fresh>Invest to CryptoCurrency Now!</Fresh>
            )}
          </Tracking>

          <Buy>
            <Title>Investment: </Title>
            <Suggestions>
              {list.map(x => (
                <CryptoBtn
                  key={x.value}
                  onClick={() => this.handleCrypto(x)}
                  style={x.value === this.state.crypto.value ? active : {}}
                >
                  <CryptoImg src={x.icon} />
                  <CryptoName>{x.label}</CryptoName>
                </CryptoBtn>
              ))}
            </Suggestions>
            <form onSubmit={e => this.handleSubmitInvest(e)}>
              <Box>
                <Select
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                  options={cryptoList2}
                  value={this.state.crypto}
                  onChange={this.handleCrypto}
                />

                <Convert>
                  <ConvertBox>
                    <TextField
                      label={currency.label}
                      value={this.state.moneyValue}
                      onChange={e =>
                        this.handleOnChange(+e.target.value, "money")
                      }
                      type="number"
                      required
                      fullWidth
                      variant="outlined"
                    />
                  </ConvertBox>
                  <Icon>
                    <FaExchangeAlt />
                  </Icon>
                  <ConvertBox>
                    <TextField
                      label={this.state.crypto.label}
                      value={this.state.cryptoValue}
                      onChange={e =>
                        this.handleOnChange(+e.target.value, "crypto")
                      }
                      type="number"
                      required
                      fullWidth
                      variant="outlined"
                    />
                  </ConvertBox>
                </Convert>
              </Box>
              <Button type="submit">INVEST</Button>
            </form>
          </Buy>
        </Right>
      </Div>
    );
  }
}
