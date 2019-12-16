import React, { Component } from "react";
import MaterialTable from "material-table";
import Moment from "moment";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Sell from "./sell";
import { Snackbar } from "@material-ui/core";
var commaNumber = require("comma-number");
export default class Investment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: "",
      sum: 0,
      totalWallet: 0,
      snackbarState: false,
      snackbarMessage: "",
      inputAmount: "",
      priceNow: 0,
      info: "",
      url: "http://localhost:4000/transactions",
      openModal: false,
      columns: [
        {
          title: "Coin logo",
          field: "image",

          cellStyle: {
            textAlign: "center"
          },
          headerStyle: {
            backgroundColor: "#01579b",
            textAlign: "center",
            color: "white",
            fontSize: "15px"
          },

          render: rowData => (
            <img
              src={rowData.image}
              style={{ width: 30, cursor: "pointer" }}
              alt=""
            />
          )
        },
        {
          title: "Name",
          field: "idname",

          cellStyle: {
            textAlign: "center"
          },
          headerStyle: {
            backgroundColor: "#01579b",
            textAlign: "center",
            color: "white",
            fontSize: "15px"
          },

          render: rowData => (
            <span
              style={{
                textDecoration: "none",
                color: "black",
                cursor: "pointer"
              }}
            >
              {rowData.idname}
            </span>
          )
        },
        {
          title: "Price",
          field: "current",

          cellStyle: {
            textAlign: "center"
          },
          headerStyle: {
            backgroundColor: "#01579b",
            textAlign: "center",
            color: "white",
            fontSize: "15px"
          },

          render: rowData => (
            <span
              style={{
                textDecoration: "none",
                color: "black",
                cursor: "pointer"
              }}
            >
              ${commaNumber(rowData.current) + " " + rowData.symbol}
            </span>
          )
        },
        {
          title: "Amount",
          field: "amount",

          cellStyle: {
            textAlign: "center"
          },
          headerStyle: {
            backgroundColor: "#01579b",
            textAlign: "center",
            color: "white",
            fontSize: "15px"
          },

          render: rowData => (
            <span
              style={{
                textDecoration: "none",
                color: "black",
                cursor: "pointer"
              }}
            >
              {rowData.amount}
            </span>
          )
        },
        {
          title: "Total USD",
          field: "sum",

          cellStyle: {
            textAlign: "center"
          },
          headerStyle: {
            backgroundColor: "#01579b",
            textAlign: "center",
            color: "white",
            fontSize: "15px"
          },

          render: rowData => (
            <span
              style={{
                textDecoration: "none",
                color: "black",
                cursor: "pointer"
              }}
            >
              ${commaNumber(rowData.sum)}
            </span>
          )
        },
        {
          title: "Date",
          field: "date",

          cellStyle: {
            textAlign: "center"
          },
          headerStyle: {
            backgroundColor: "#01579b",
            textAlign: "center",
            color: "white",
            fontSize: "15px"
          },

          render: rowData => (
            <span
              style={{
                textDecoration: "none",
                color: "black",
                cursor: "pointer"
              }}
            >
              {rowData.date}
            </span>
          )
        },

        {
          title: "Sell",
          field: "sell",

          cellStyle: {
            textAlign: "center"
          },
          headerStyle: {
            backgroundColor: "#01579b",
            textAlign: "center",
            color: "white",
            fontSize: "15px"
          },

          render: rowData => (
            <span
              style={{
                textDecoration: "none",
                color: "black",
                cursor: "pointer"
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={e => this.handleOpenSell(rowData)}
              >
                Sell
              </Button>
            </span>
          )
        }
      ]
    };

  }
  componentDidMount = () => {
    console.log(this.state.url)
    axios
      .get(`${this.state.url}?idname=${localStorage.getItem("id")}&&type=buy`)
      .then(response => {
        this.setState({
          data: response.data
        });
      });
  };

  // componentDidUpdate = () => {
  //   axios.get(this.state.url).then(response => {
  //     this.setState({
  //       data: response.data
  //     });
  //   });
  // };
  handleCloseSnackbar = () => {
    this.setState({ snackbarState: false, snackbarMessage: "" });
  };
  handleOpenSnackbar = (message, color) => {
    this.setState({
      snackbarState: true,
      snackbarMessage: message,
      backgroundColor: color ? color : ""
    });
  };
  handleOpenSell = e => {
    axios.get(`http://localhost:4000/wallet/1`, {}).then(res => {
      this.setState({
        totalWallet: res.data.amount
      });
    });
    this.setState({
      info: e
    });
    console.log("open");
    this.setState({
      openModal: true
    });
  };
  handleCloseSell = () => {
    console.log("close");
    this.setState({ openModal: false, inputAmount: "" });
    axios
      .get(`${this.state.url}/?idname=${localStorage.getItem("id")}&&type=buy`)
      .then(response => {
        this.setState({
          data: response.data
        });
        console.log(this.state.data.amount);
      });
  };

  handleClick = () => {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const min = new Date().getMinutes();
    const sec = new Date().getSeconds();

    let totalAmount = this.state.info.amount - this.state.inputAmount;
    let amountSell = this.state.info.current * this.state.inputAmount;
    let totalSell = this.state.info.sum - amountSell;

    let totalCoinsWallet = this.state.totalWallet + amountSell;
    localStorage.setItem("wallet", totalCoinsWallet);

    if (
      this.state.info.amount < this.state.inputAmount ||
      this.state.inputAmount == 0
    ) {
      this.handleOpenSnackbar("Invalid amount", "red ");
    } else {
      this.handleOpenSnackbar("Successfully Sell", "darkgreen");

      if (
        parseInt(this.state.info.amount) === parseInt(this.state.inputAmount)
      ) {
        this.handleOpenSnackbar("This coin has been Sold", "darkgreen");
        axios.patch(`http://localhost:4000/wallet/1`, {
          amount: totalCoinsWallet
        });
        //post sell
        axios
        .post(`http://localhost:4000/transactions`, {
          date:
          date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec,
          amount: this.state.amount,
          sum: amountSell,
          symbol: localStorage.getItem("symbol"),
          idname: localStorage.getItem("id"),
          current: localStorage.getItem("currentPrice"),
          type: 'sell'
        })
        .then(res => {
          // console.log(res);
        });
    this.setState({
      amount:"",
      sum:""
    })

        axios
          .delete(`http://localhost:4000/transactions/${this.state.info.id}`)
          .then(res => {
            this.handleCloseSell();
          });
        this.setState({
          inputAmount: ""
        });
      } else {
        this.handleOpenSnackbar("Successfully Sell", "darkgreen");

         //post sell
         axios
         .post(`http://localhost:4000/transactions`, {
           date:
           date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec,
           amount: this.state.amount,
           sum: amountSell,
           symbol: localStorage.getItem("symbol"),
           idname: localStorage.getItem("id"),
           current: localStorage.getItem("currentPrice"),
           type: 'sell'
         })
         .then(res => {
           // console.log(res);
         });
     this.setState({
       amount:"",
       sum:""
     })
        

        axios.patch(`http://localhost:4000/wallet/1`, {
          amount: totalCoinsWallet
        });
        ////post sell
        // axios.post(`http://localhost:4000/wallet/1`, {
        //   amount: amountSell
        // });


        axios
          .patch(`http://localhost:4000/transactions/${this.state.info.id}`, {
            amount: totalAmount,
            sum: totalSell
          })
          .then(res => {
            this.handleCloseSell();
          });
        this.setState({
          inputAmount: ""
        });
      }
    }
  };
  handleChange = e => {
    this.setState({
      inputAmount: e.target.value
    });
  };

  render() {
    return (
      <React.Fragment>
        <Snackbar
          ContentProps={{
            style: {
              backgroundColor: this.state.backgroundColor
            }
          }}
          open={this.state.snackbarState}
          message={
            <span style={{ display: "flex", alignItems: "center" }}>
              {this.state.snackbarMessage}
            </span>
          }
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          autoHideDuration={2000}
          onClose={this.handleCloseSnackbar}
        />
        <MaterialTable
          options={{
            paging: false
          }}
          style={{
            paddingBottom: 40
          }}
          title=" "
          columns={this.state.columns}
          data={this.state.data}
        />
        <Sell
          amount={this.state.info.amount}
          info={this.state.info}
          openModal={this.state.openModal}
          close={this.handleCloseSell}
          handleClick={this.handleClick}
          inputAmount={this.state.inputAmount}
          handleChange={this.handleChange}
        />
      </React.Fragment>
    );
  }
}
