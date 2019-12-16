import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Pagination } from "semantic-ui-react";
import Grid from "@material-ui/core/Grid";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
const useStyles = theme => ({
  root: {
    width: "100%"
  },
  head: {
    backgroundColor: "#304050",
    color: "white"
  },
  tableWrapper: {
    maxHeight: 649,
    overflow: "auto"
  },
  image: {
    maxHeight: 30,
    maxWidth: 30
  },
  row: {
    color: "white"
  }
});
class main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: true,
      id: [],
      activePage: 1,
      coinsList: [],
      page: [],
      columns: [
        { id: "market_cap_rank", label: "Rank", minWidth: 10 },
        { id: "image", label: "Logo", minWidth: 50, align: "center" },
        { id: "name", label: "Name", minWidth: 170 },
        { id: "symbol", label: "Symbol", minWidth: 170 },
        { id: "current_price", label: "Current Price", minWidth: 170 },
        {
          id: "price_change_2   4h",
          label: "Price Change 24Hrs",
          minWidth: 170
        },
        { id: "circulating_supply", label: "Ciculating Supply", minWidth: 170 },
        { id: "last_updated", label: "Last Updated", minWidth: 170 }
      ]
    };
  }
  componentDidMount() {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&page=1&per_page=500`
      )
      .then(res =>
        this.setState({
          coinsList: res.data
        })
      );
  }
  handleClick = id => {
    this.setState({
      redirect: false,
      id: id.id
    });
    localStorage.setItem("name", id.name);
    this.props.history.push(`/coins/${id.id}`);
  };
  handleOnChange = (e, pageInfo) => {
    console.log();
    this.setState({
      activePage: pageInfo.activePage,
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20&page=${pageInfo.activePage.toString()}`
    });
  };
  render() {
    const { classes } = this.props;

    if (this.state.redirect) {
      return (
        <div className={classes.card}>
          <Paper className={classes.root}>
            <Table
              className={classes.table}
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  {this.state.columns.map(column => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      className={classes.head}
                      color="inherit"
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody className={classes.table}>
                {this.state.coinsList.map(column => {
                  return (
                    <TableRow
                      key={column.id}
                      onClick={() => this.handleClick(column)}
                      className={classes.row}
                    >
                      <TableCell>{column.market_cap_rank}</TableCell>
                      <TableCell align="center">
                        <img
                          className={classes.image}
                          src={column.image}
                          alt="/"
                        />
                      </TableCell>
                      <TableCell>{column.name}</TableCell>
                      <TableCell>{column.symbol}</TableCell>
                      <TableCell>{column.current_price}</TableCell>
                      <TableCell>{column.price_change_24h}</TableCell>
                      <TableCell>{column.circulating_supply}</TableCell>
                      <TableCell>{column.last_updated}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
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
          </Paper>
        </div>
      );
    } else {
      return <Redirect push to={`/coins/${this.state.id}`} />;
    }
  }
}

export default withStyles(useStyles)(main);
