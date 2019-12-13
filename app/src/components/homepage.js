import React, { Component } from "react";
import axios from "axios";
import { Pagination } from "semantic-ui-react";
import MaterialTable from "material-table";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import "semantic-ui-css/semantic.min.css";
import Details from "./details";
import AppBarComponent from "./common-components/AppBar";
var commaNumber = require("comma-number");
export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartArr: [],
      id: null,
      image: "",
      currentprice: "",
      loading: true,
      open: false,
      data: [],
      url:
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&page=1&per_page=25",
      activePage: 1,
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
              onClick={() => this.handleClick(rowData)}
            />
          )
        },
        {
          title: "Name",
          field: "name",

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
              onClick={() => this.handleClick(rowData)}
            >
              {rowData.name}
            </span>
          )
        },
        {
          title: "Symbol",
          field: "symbol",

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
              onClick={() => this.handleClick(rowData)}
            >
              {rowData.symbol}
            </span>
          )
        },
        {
          title: "Market Cap",
          field: "market_cap",

          cellStyle: {
            textAlign: "center"
          },
          headerStyle: {
            backgroundColor: "#01579b",
            textAlign: "center",
            color: "white",
            fontSize: "15px"
          },
          render: rowData => <span>${commaNumber(rowData.market_cap)}</span>
        },
        {
          title: "Circulating Supply",
          field: "circulating_supply",

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
            <span>{commaNumber(rowData.circulating_supply)}</span>
          )
        },
        {
          title: "Current Price",
          field: "current_price",

          cellStyle: {
            textAlign: "center"
          },
          headerStyle: {
            backgroundColor: "#01579b",
            textAlign: "center",
            color: "white",
            fontSize: "15px"
          },
          render: rowData => <span>${commaNumber(rowData.current_price)}</span>
        }
      ]
    };
  }
  componentDidMount = () => {
    axios.get(this.state.url).then(response => {
      this.setState({
        data: response.data
      });
    });

    axios
      .get( `http://localhost:4000/wallet`)
      .then(res =>{
        res.data.map(amounts =>{
      localStorage.setItem("wallet", amounts.amount)
        })
      })
  };

  componentDidUpdate = () => {
    axios.get(this.state.url).then(response => {
      this.setState({
        data: response.data
      });
    });
  };

  handleOnChange = (e, pageInfo) => {
    this.setState({
      activePage: pageInfo.activePage,
      url:
        `${this.state.url}` +
        `&per_page=25&page=${pageInfo.activePage.toString()}`
    });
  };
  handleClick = e => {
    
    this.setState({ open: true, id: e });
    localStorage.setItem("id", e.id);
    localStorage.setItem("symbol", e.symbol);
  };

  handleClose = () => {
    this.setState({ open: false });
    
  };

  render() {

    return (
      <React.Fragment>
        <AppBarComponent activePage={this.state.activePage} />

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
        <Grid container justify="flex-end">
          <Pagination
            style={{
              position: "fixed",
              bottom: 0
            }}
            activePage={this.state.activePage}
            onPageChange={this.handleOnChange}
            totalPages={248}
            ellipsisItem={null}
          />
        </Grid>
        
        <Details open={this.state.open} close={this.handleClose} image={this.state.image} id={this.state.id} />
       
      </React.Fragment>
    );
  }
}
