import React, { Component } from "react";
import MaterialTable from "material-table";
import Moment from "moment";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Sell from "./sell";
var commaNumber = require("comma-number");
export default class Investment extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
              {Moment(rowData.date).format("LLLL")}
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
                onClick={(e) => this.handleOpenSell(rowData)}
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
    axios
      .get(`${this.state.url}/?idname=${localStorage.getItem("id")}`)
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
  handleOpenSell = (e) => {

   this.setState({
     info: e
   })
    console.log("open");
    this.setState({
      openModal: true
    });
  };
  handleCloseSell = () => {
    console.log("close");
    this.setState({ openModal: false });
  };

  render() {
    return (
      <React.Fragment>
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
        <Sell info={this.state.info} openModal={this.state.openModal} close={this.handleCloseSell} />
      </React.Fragment>
    );
  }
}
