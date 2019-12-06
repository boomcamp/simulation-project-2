import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
// import TablePagination from "@material-ui/core/TablePagination";
import axios from "axios";
import { Redirect } from "react-router-dom";
const useStyles = theme => ({
  root: {
    width: "100%"
  },
  tableWrapper: {
    maxHeight: 649,
    overflow: "auto"
  },
  image: {
    maxHeight: 30,
    maxWidth: 30
  }
});
class main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: true,
      id: "",
      coinsList: [],
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
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      )
      .then(res =>
        this.setState({
          coinsList: res.data
        })
      );
  }
  handleClick = id => {
    console.log(id);
    this.setState({
      redirect: false,
      id: id
    });
    this.props.history.push(`/coins/${id}`);
  };

  render() {
    const { classes } = this.props;

    if (this.state.redirect) {
      return (
        <div className={classes.card}>
          <Paper className={classes.root}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {this.state.columns.map(column => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      className={classes.head}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.coinsList.map(column => {
                  return (
                    <TableRow
                      key={column.id}
                      onClick={() => this.handleClick(column.id)}
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
          </Paper>
        </div>
      );
    } else {
      return <Redirect push to={`/coins/${this.state.id}`} />;
    }
  }
}

export default withStyles(useStyles)(main);
