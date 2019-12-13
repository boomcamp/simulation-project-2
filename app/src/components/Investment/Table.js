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
import { table2 } from "./Data";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
export default class Table extends Component {
  constructor() {
    super();
    this.state = {
      columns: [
        {
          title: "Coin",
          field: "crypto.id",
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
          title: "Total Investment",
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
          title: "Investment Left",
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
  // componentDidUpdate() {
  //   this.props.handleUpdate();
  // }
  render() {
    const {
      transList,
      loading,
      open,
      handleOnChange,
      handleSubmitSell,
      handleClose,
      currentTransaction,
      sellingAmount
    } = this.props;
    const data = currentTransaction;

    return (
      <React.Fragment>
        <TableCont>
          <Tabs
            defaultActiveKey="investments"
            transition={false}
            id="noanim-tab-example"
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "20px"
            }}
          >
            <Tab eventKey="investments" title="Investments">
              <MaterialTable
                title="List of Investments"
                columns={this.state.columns}
                data={transList
                  .reverse()
                  .filter(x => x.amount !== x.amountSold)}
                isLoading={loading}
              />
            </Tab>
            <Tab eventKey="log" title="Transaction Logs">
              <MaterialTable
                title="Recent Investments"
                columns={table2}
                data={transList
                  .reverse()
                  .filter(x => x.amount === x.amountSold)}
                isLoading={loading}
              />
            </Tab>
          </Tabs>
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
                  value={sellingAmount}
                  inputProps={{
                    min: 0,
                    max: data.amount - data.amountSold,
                    step: ".000000001"
                  }}
                  required
                  onChange={e =>
                    handleOnChange(+e.target.value, "sell", currentTransaction)
                  }
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
