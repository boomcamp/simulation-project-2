import React, { Component } from "react";
import { TableCont } from "./Style";
import MaterialTable from "material-table";
import { Span, Img } from "./Style";

export default class Table extends Component {
  constructor() {
    super();
    this.state = {
      columns: [
        {
          title: "Coin",
          field: "crypto",
          render: rowData => <Span>{rowData.crypto}</Span>
        },
        {
          title: "Amount",
          field: "amount",
          render: rowData => (
            <React.Fragment>
              ${rowData.amount ? rowData.amount.toFixed(3) : ""}
            </React.Fragment>
          )
        },
        {
          title: "Price",
          field: "price",
          render: rowData => (
            <React.Fragment>
              ${rowData.price ? rowData.price.toFixed(3) : ""}
            </React.Fragment>
          )
        },
        {
          title: "Current Price",
          field: "currentPrice"
        },
        {
          title: "Amount Sold",
          field: "amountSold"
        },
        {
          title: "Profit/Loss",
          field: "profit"
        },
        {
          title: "Action"
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
          data={transList}
          isLoading={loading}
        />
      </TableCont>
    );
  }
}
