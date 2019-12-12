import React, { Component } from "react";
import { TableCont } from "./Style";
import MaterialTable from "material-table";
import {
  Span,
  Span2,
  Img,
  blue,
  red,
  green,
  CoinName,
  ImgCont,
  arrow
} from "./Style";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
export default class Table extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      columns: [
        {
          title: "Coin",
          field: "crypto",
          render: rowData => (
            <CoinName>
              <ImgCont>
                <Img src={rowData.crypto.img} />
              </ImgCont>
              <Span>{rowData.crypto.id}</Span>
            </CoinName>
          )
        },
        {
          title: "Amount Bought",
          field: "amount",
          render: rowData => (
            <React.Fragment>
              <Span2>
                {rowData.amount ? Number(rowData.amount.toFixed(9)) : 0}{" "}
                {rowData.crypto.unit ? rowData.crypto.unit : ""}
              </Span2>
            </React.Fragment>
          )
        },
        {
          title: "Amount Left",
          render: rowData => (
            <React.Fragment>
              <Span2>
                {Number((rowData.amount - rowData.amountSold).toFixed(9))}{" "}
                {rowData.crypto.unit ? rowData.crypto.unit : ""}
              </Span2>
            </React.Fragment>
          )
        },
        {
          title: "Price",
          field: "price",
          render: rowData => (
            <span style={blue}>
              ${rowData.price ? Number(rowData.price.toFixed(3)) : 0}
            </span>
          )
        },
        {
          title: "Current Price",
          field: "currentPrice",
          render: rowData => (
            <React.Fragment>
              <span
                style={
                  rowData.currentPrice > rowData.price
                    ? green
                    : rowData.currentPrice === rowData.price
                    ? blue
                    : red
                }
              >
                $
                {rowData.currentPrice
                  ? Number(rowData.currentPrice.toFixed(3))
                  : 0}
                {rowData.currentPrice > rowData.price ? (
                  <FaArrowAltCircleUp style={arrow} />
                ) : rowData.currentPrice < rowData.price ? (
                  <FaArrowAltCircleDown style={arrow} />
                ) : (
                  ""
                )}
              </span>
            </React.Fragment>
          )
        },
        {
          title: "Amount Sold",
          field: "amountSold",
          render: rowData => (
            <Span2>
              {rowData.amountSold ? Number(rowData.amountSold.toFixed(9)) : 0}{" "}
              {rowData.crypto.unit ? rowData.crypto.unit : ""}
            </Span2>
          )
        },
        {
          title: "Profit/Loss",
          field: "profit",
          render: rowData => (
            <span
              style={
                rowData.profit > 0 ? green : rowData.profit < 0 ? red : blue
              }
            >
              ${rowData.profit ? Number(rowData.profit.toFixed(3)) : 0}
            </span>
          )
        },
        {
          render: rowData => {
            return (
              <span>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => this.props.handleClickOpen(rowData)}
                >
                  Sell
                </Button>
              </span>
            );
          }
        }
      ]
    };
  }
  render() {
    const {
      transList,
      loading,
      open,
      handleOnChange,
      handleSubmitSell,
      handleClose,
      currentTransaction
    } = this.props;
    const data = currentTransaction;
    console.log(transList.filter(x => x.price !== x.currentPrice));
    return (
      <React.Fragment>
        <TableCont>
          <MaterialTable
            title="List of Investments"
            columns={this.state.columns}
            data={transList.reverse()}
            isLoading={loading}
          />
        </TableCont>
        {data ? (
          <Dialog open={open} onClose={() => handleClose()}>
            <form onSubmit={e => handleSubmitSell(e, data)}>
              <DialogTitle>Start Selling</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter the amount you desire.
                </DialogContentText>

                <TextField
                  autoFocus
                  label="Amount"
                  fullWidth
                  type="number"
                  variant="outlined"
                  inputProps={{
                    min: 0,
                    max: data.amount - data.amountSold,
                    step: ".000000001"
                  }}
                  required
                  onChange={e => handleOnChange(+e.target.value, "sell")}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleClose()} color="primary">
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}
