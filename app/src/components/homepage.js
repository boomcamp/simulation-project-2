import React, { Component } from "react";
import axios from "axios";
import { Pagination } from "semantic-ui-react";
import MaterialTable from "material-table";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Dialog from '@material-ui/core/Dialog';
import "semantic-ui-css/semantic.min.css";
import { Link } from "react-router-dom";
import Details from './details'
var commaNumber = require('comma-number')
export default class Homepage extends Component {
  
  constructor() {
    super();
    this.state = {
      id: [],
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

          render: rowData => <img src={rowData.image} style={{ width: 30 }} />
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
            <Link
              style={{ textDecoration: "none", color: "black" }}
              // to={`/details`}
               onClick={()=>{
                this.handleClick(rowData)
              }}
            >
              {rowData.name}
            </Link>
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
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/details`} onClick={()=>{
                this.handleClick(rowData.id)
              }}
            > 
              {rowData.symbol}
            </Link>
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
          render: rowData => <span>{commaNumber(rowData.circulating_supply)}</span>
          
          
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
    this.handleClose = this.handleClose.bind(this)
  }
  componentDidMount = () => {
    axios.get(this.state.url).then(response => {
      // console.log("aaa",response.data)
      this.setState({
        data: response.data
      });
      console.log("mount", response);
    });
  };
  componentDidUpdate = () => {
    axios.get(this.state.url).then(response => {
      this.setState({
        data: response.data
      });
      // console.log("asdsa",response);
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
  handleClick=(e)=>{
    this.setState({open: true})
    // localStorage.setItem("id", e);
    // console.log(e)
    
  }

  handleClose() {
    this.setState({open: false})
  }

  render() {
    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <Grid item xl={1}>
              <Typography variant="h6">Barya ni NOR</Typography>
            </Grid>

            <Grid item xl={1}>
              <span>Current Page||{this.state.activePage} </span>
            </Grid>
          </Toolbar>
        </AppBar>

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
              // flexGrow:9
              // marginLeft:"80vw"
            }}
            activePage={this.state.activePage}
            onPageChange={this.handleOnChange}
            totalPages={248}
            ellipsisItem={null}
          />
        </Grid>
        <Details open={this.state.open} close={this.handleClose} />
      </React.Fragment>
    );
  }
}
