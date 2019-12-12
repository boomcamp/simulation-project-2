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
import Sell from "./Sell";
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
                {Number((rowData.amount - rowData.amountSold).toFixed(9))}
              </Span2>
            </React.Fragment>
          )
        },
        {
          title: "Price",
          field: "price",
          render: rowData => (
            <React.Fragment>
              ${rowData.price ? Number(rowData.price.toFixed(3)) : 0}
            </React.Fragment>
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
            <React.Fragment>
              ${rowData.amountSold ? Number(rowData.amountSold.toFixed(9)) : 0}
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
          render: rowData => (
            <span>
              {rowData.crypto.id}
              <Sell
                data={rowData}
                handleOnChange={this.props.handleOnChange}
                handleSubmitSell={this.props.handleSubmitSell}
                handleClickOpen={this.props.handleClickOpen}
                handleClose={this.props.handleClose}
                open={this.props.open}
              />
            </span>
          )
        }
      ]
    };
  }
  render() {
    const { transList, loading } = this.props;
    return (
      <TableCont>
        <MaterialTable
          title="List of Investments"
          columns={this.state.columns}
          data={transList.reverse()}
          isLoading={loading}
        />
      </TableCont>
    );
  }
}
