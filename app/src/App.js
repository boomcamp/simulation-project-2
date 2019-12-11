import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter } from "react-router-dom";
import axios from "axios";
import SideNav from "./components/SideNav/SideNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      currency: {
        value: "usd",
        label: "US Dollar",
        unit: "$"
      },
      loading: true,
      currentPage: 1,
      currencies: [],
      cryptoList: [],
      crypto: {
        value: "bitcoin",
        label: "Bitcoin",
        unit: "btc"
      },
      currentPrice: null,
      cryptoValue: "",
      moneyValue: "",
      lastTrans: {},
      transList: []
    };
  }
  componentDidMount() {
    Axios.get("http://localhost:4000/transactions").then(res => {
      this.setState({
        transList: res.data.map(x => {
          axios
            .get(`https://api.coingecko.com/api/v3/coins/${x.crypto}`)
            .then(res => {
              x["currentPrice"] = res.data.market_data.current_price.usd;
            });
          return x;
        }),
        lastTrans: res.data[res.data.length - 1]
      });
      setTimeout(() => {
        this.setState({ loading: false });
      }, 1000);
    });
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&page=1&per_page=100&price_change_percentage=1h%2C24h%2C7d&sparkline=true"
      )
      .then(res => {
        setTimeout(() => {
          this.setState({
            data: res.data,
            loading: false
          });
        }, 500);
      });

    axios.get("https://api.coingecko.com/api/v3/exchange_rates").then(res => {
      this.setState({
        currencies: res.data.rates
      });
    });
    axios.get("https://api.coingecko.com/api/v3/coins/list").then(res => {
      this.setState({
        cryptoList: res.data
      });
    });
    axios.get("https://api.coingecko.com/api/v3/coins/bitcoin").then(res => {
      this.setState({
        currentPrice: res.data.market_data.current_price.usd
      });
    });
  }
  handlePagination = (e, page) => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    var temp = this.state.currency;
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${temp.value}&page=${page.activePage}&per_page=100&price_change_percentage=1h%2C24h%2C7d&sparkline=true`
      )
      .then(res => {
        setTimeout(() => {
          this.setState({
            data: res.data,
            currentPage: page.activePage,
            loading: false
          });
        }, 500);
      });
  };
  handleSelect = val => {
    this.setState({
      currency: val,
      loading: true
    });
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${val.value}&page=${this.state.currentPage}&per_page=100&price_change_percentage=1h%2C24h%2C7d&sparkline=true`
      )
      .then(res => {
        setTimeout(() => {
          this.setState({
            data: res.data,
            loading: false
          });
        }, 500);
      });
  };
  handleCrypto = val => {
    this.setState({
      crypto: val
    });
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${val.value}`)
      .then(res => {
        this.setState({
          currentPrice: res.data.market_data.current_price.usd
        });
        if (this.state.cryptoValue !== "") {
          this.setState({
            cryptoValue:
              this.state.moneyValue / res.data.market_data.current_price.usd
          });
        }
      });
  };
  handleOnChange = (val, action) => {
    if (action === "money") {
      this.setState({
        moneyValue: val,
        cryptoValue: val / this.state.currentPrice
      });
    } else {
      this.setState({
        cryptoValue: val,
        moneyValue: val * this.state.currentPrice
      });
    }
  };
  handleSubmitInvest = e => {
    e.preventDefault();
    this.setState({ loading: true });
    Axios.post("http://localhost:4000/transactions", {
      crypto: this.state.crypto.value,
      amount: this.state.cryptoValue,
      price: this.state.currentPrice,
      amountSold: 0,
      profit: 0
    })
      .then(() => {
        toast.info("Investment Successful!", {
          position: toast.POSITION.TOP_CENTER
        });
      })
      .catch(err =>
        toast.error(err.response.data, {
          position: toast.POSITION.TOP_CENTER
        })
      );
    Axios.get("http://localhost:4000/transactions").then(res => {
      this.setState({
        transList: res.data.map(x => {
          axios
            .get(`https://api.coingecko.com/api/v3/coins/${x.crypto}`)
            .then(res => {
              x["currentPrice"] = res.data.market_data.current_price.usd;
            });
          return x;
        }),
        lastTrans: res.data[res.data.length - 1]
      });
    });
    Axios.get("http://localhost:4000/transactions").then(res => {
      setTimeout(() => {
        this.setState({
          lastTrans: res.data[res.data.length - 1],
          loading: false
        });
      }, 1000);
    });
  };
  render() {
    return (
      <HashRouter>
        <ToastContainer />
        <SideNav
          data={this.state.data}
          loading={this.state.loading}
          currency={this.state.currency}
          handleSelect={this.handleSelect}
          handlePagination={this.handlePagination}
          currentPage={this.state.currentPage}
          currencies={this.state.currencies}
          cryptoList={this.state.cryptoList}
          crypto={this.state.crypto}
          handleCrypto={this.handleCrypto}
          currentPrice={this.state.currentPrice}
          cryptoValue={this.state.cryptoValue}
          moneyValue={this.state.moneyValue}
          handleOnChange={this.handleOnChange}
          handleSubmitInvest={this.handleSubmitInvest}
          lastTrans={this.state.lastTrans}
          transList={this.state.transList}
        />
      </HashRouter>
    );
  }
}
