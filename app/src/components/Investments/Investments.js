import React from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { MDBIcon } from "mdbreact";
import {
  investColumn,
  Title,
  Total,
  MainDiv,
  Table,
  BuySell,
  Img,
  Green,
  Red,
  BuyStyle,
  Container
} from "./Data";
import Buy from "../Buy/Buy";
import Modal from "../Modal/Modal";

export default class Investments extends React.Component {
  constructor() {
    super();
    this.state = {
      activeItem: "1",
      data: [],
      coin: {
        label: "Bitcoin (btc)",
        value: "bitcoin",
        name: "Bitcoin",
        symbol: "btc"
      },
      allCoins: [],
      toggleModal: false,
      columns: [
        {
          title: "Coin",
          field: "details.name",
          render: rowData => (
            <React.Fragment>
              <Tooltip title="Show Coin Details">
                <Link to={`details/${rowData.details.coinId}`}>
                  <Img src={rowData.details.image} alt="" />
                  {rowData.details.name}
                </Link>
              </Tooltip>
            </React.Fragment>
          )
        },
        {
          title: "Old Price",
          field: "old_price",
          render: rowData => (
            <React.Fragment>
              ${" "}
              {rowData.details.price.toLocaleString(undefined, {
                maximumFractionDigits: 2
              })}
            </React.Fragment>
          )
        },
        {
          title: "Current Price",
          field: "current_price",
          render: rowData => (
            <React.Fragment>
              {rowData.current_price ? (
                rowData.details.price >= rowData.current_price ? (
                  <Red>
                    ${" "}
                    {rowData.current_price.toLocaleString(undefined, {
                      maximumFractionDigits: 2
                    })}
                    <MDBIcon
                      icon="angle-down"
                      style={{ paddingLeft: "5px", fontSize: "16px" }}
                    />
                  </Red>
                ) : (
                  <Green>
                    ${" "}
                    {rowData.current_price.toLocaleString(undefined, {
                      maximumFractionDigits: 2
                    })}
                    <MDBIcon
                      icon="angle-up"
                      style={{ paddingLeft: "5px", fontSize: "16px" }}
                    />
                  </Green>
                )
              ) : (
                ""
              )}
            </React.Fragment>
          )
        },
        {
          title: "Amount Invested",
          field: "amount",
          render: rowData => <React.Fragment>$ {rowData.amount}</React.Fragment>
        },
        {
          title: "Estimated Profit/Loss",
          field: "profit",
          render: rowData => (
            <React.Fragment>
              {rowData.current_price * rowData.amount -
                rowData.details.price * rowData.amount >
              0 ? (
                <Green>
                  ${" "}
                  {rowData.current_price * rowData.amount -
                    rowData.details.price * rowData.amount}
                </Green>
              ) : rowData.current_price * rowData.amount -
                  rowData.details.price * rowData.amount ===
                0 ? (
                "$ " +
                (rowData.current_price * rowData.amount -
                  rowData.details.price * rowData.amount)
              ) : (
                <Red>
                  ${" "}
                  {rowData.current_price * rowData.amount -
                    rowData.details.price * rowData.amount}
                </Red>
              )}
            </React.Fragment>
          )
        },
        {
          title: "Profit/Loss",
          field: "amountSold",
          render: rowData => (
            <React.Fragment>
              $ {parseFloat(rowData.amountSold.toFixed(3))}
            </React.Fragment>
          )
        },
        {
          title: "Actions",
          field: "sell",
          render: rowData => (
            <React.Fragment>
              <Button
                variant="outlined"
                onClick={() => this.handleClickOpen(rowData)}
              >
                Sell
              </Button>
            </React.Fragment>
          )
        }
      ]
    };
  }
  componentDidMount = () => {
    this.fetchdata();
  };

  fetchdata = () => {
    this.setState({ loading: true });
    axios.get(`http://localhost:4000/transactions`).then(response => {
      const tempData = response.data.map(e => {
        axios
          .get(
            `https://api.coingecko.com/api/v3/simple/price?ids=${e.details.coinId}&vs_currencies=usd`
          )
          .then(response => {
            e.current_price = response.data[e.details.coinId].usd;
          });
        return e;
      });
      let sum = response.data.map(x => x.amountSold).reduce((a, b) => a + b, 0);
      this.setState({
        data: tempData,
        totalAmount: sum
      });
      setTimeout(() => this.setState({ loading: false }), 1000);
    });

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/list
  `
      )
      .then(response => this.setState({ allCoins: response.data }));
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/bitcoin
    `
      )
      .then(response => {
        this.setState({
          coinId: response.data.id,
          price: response.data.market_data.current_price.usd,
          image: response.data.image.large,
          name: response.data.name,
          symbol: response.data.symbol
        });
      });
  };

  componentDidUpdate() {
    if (this.state.updateLoading === true) {
      axios.get(`http://localhost:4000/transactions`).then(response => {
        let tempData = response.data.map(e => {
          axios
            .get(
              `https://api.coingecko.com/api/v3/simple/price?ids=${e.details.coinId}&vs_currencies=usd`
            )
            .then(response => {
              e.current_price = response.data[e.details.coinId].usd;
            });
          return e;
        });
        let sum = response.data
          .map(x => x.amountSold)
          .reduce((a, b) => a + b, 0);
        this.setState({
          data: tempData,
          totalAmount: sum
        });
        setTimeout(() => this.setState({ updateLoading: false }), 1000);
      });
    }
  }

  handleClickOpen = val => {
    this.setState({ toggleModal: true, currentData: val });
  };

  handleClose = () => {
    this.setState({ toggleModal: false });
  };

  handleChange = val => {
    this.setState({ amountSell: val });
  };

  handleCoins = val => {
    this.setState({
      coin: Object.assign({}, val)
    });
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${val.value}`)
      .then(response => {
        this.setState({
          coinId: response.data.id,
          price: response.data.market_data.current_price.usd,
          image: response.data.image.large,
          name: response.data.name,
          symbol: response.data.symbol
        });
      });
  };

  handleInvest = e => {
    e.preventDefault();
    this.setState({ updateLoading: true });
    this.setState({ loading: true });
    const tempDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(Date.now());
    const coinDetails = {
      coinId: this.state.coinId,
      price: this.state.price,
      image: this.state.image,
      name: this.state.name,
      symbol: this.state.symbol
    };
    const Obj = {
      date: tempDate,
      amount: this.props.amountValue,
      amountSold: 0,
      currency: "usd",
      details: coinDetails
    };
    axios
      .post(`http://localhost:4000/transactions`, Obj)
      .then(() => {
        toast.success(
          "$ " +
            Number(Math.round(this.props.amountValue + "e2") + "e-2") +
            " successfully invested in " +
            this.state.name
        );
        this.props.handleAmount(0, "amount", 0);
        this.props.handleAmount(0, "crypt", 0);
      })
      .catch(() => {
        toast.error("Try again later!");
      });
    setTimeout(() => this.setState({ loading: false }), 1000);
  };

  handleSell = (e, data) => {
    this.setState({ loading: true, toggleModal: false });
    e.preventDefault();
    axios
      .patch(`http://localhost:4000/transactions/${data.id}`, {
        amountSold:
          data.amountSold +
          (data.current_price * this.state.amountSell -
            data.details.price * this.state.amountSell),
        amount: data.amount - this.state.amountSell
      })
      .then(() =>
        axios.get(`http://localhost:4000/transactions`).then(response => {
          const tempData = response.data.map(e => {
            axios
              .get(
                `https://api.coingecko.com/api/v3/simple/price?ids=${e.details.coinId}&vs_currencies=usd`
              )
              .then(response => {
                e.current_price = response.data[e.details.coinId].usd;
              });
            return e;
          });
          let sum = response.data
            .map(x => x.amountSold)
            .reduce((a, b) => a + b, 0);
          this.setState({
            data: tempData,
            totalAmount: sum
          });
          toast.success("Successfully Sold!");
          setTimeout(() => this.setState({ loading: false }), 1000);
        })
      );
  };
  render() {
    return (
      <MainDiv>
        {this.state.currentData ? (
          <Modal
            toggleModal={this.state.toggleModal}
            handleChange={this.handleChange}
            handleClose={this.handleClose}
            handleSell={this.handleSell}
            data={this.state.currentData}
          />
        ) : (
          ""
        )}

        <Table>
          <div style={{ paddingBottom: "20px" }}>
            <MaterialTable
              title="Investment Tracking"
              columns={this.state.columns}
              data={this.state.data.filter(x => x.amount !== 0).reverse()}
              isLoading={this.state.loading}
            />
          </div>
          <MaterialTable
            title="Transaction Logs"
            columns={investColumn}
            data={this.state.data.filter(x => x.amount === 0).reverse()}
            isLoading={this.state.loading}
            options={{
              pageSizeOptions: [3, 5, 10],
              pageSize: 3
            }}
          />
        </Table>
        <Container>
          <BuySell>
            <Title>
              <h4 style={{ fontWeight: "bold" }}>Total Profit/Loss</h4>
            </Title>
            <Total>
              {this.state.totalAmount > 0 ? (
                <Green>
                  <h3>${parseFloat(this.state.totalAmount).toFixed(3)}</h3>
                </Green>
              ) : (
                <Red>
                  <h3>${parseFloat(this.state.totalAmount).toFixed(3)}</h3>
                </Red>
              )}{" "}
            </Total>
          </BuySell>
          <BuyStyle>
            <Title>
              <h4 style={{ fontWeight: "bold" }}>Invest Here</h4>
            </Title>
            <Buy
              allCoins={this.state.allCoins}
              coin={this.state.coin}
              handleCoins={this.handleCoins}
              handleAmount={this.props.handleAmount}
              amountValue={this.props.amountValue}
              cryptValue={this.props.cryptValue}
              price={this.state.price}
              handleInvest={this.handleInvest}
            />
          </BuyStyle>
        </Container>
      </MainDiv>
    );
  }
}
