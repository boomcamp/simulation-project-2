import React from "react";
import styled from "styled-components";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";
import { Sparklines, SparklinesLine } from "react-sparklines";

const Img = styled.img`
  height: 30px;
  padding-right: 20px;
`;
const Red = styled.span`
  color: red;
`;
const Green = styled.span`
  color: green;
`;
const Blue = styled.span`
  color: blue;
`;
export default class Table extends React.Component {
  constructor() {
    super();
    this.state = {
      columns: [
        {
          title: "#",
          field: "market_cap_rank"
        },
        {
          title: "Coin",
          field: "name",
          render: rowData => (
            <React.Fragment>
              <Link to={`details/${rowData.id}`}>
                <Img src={rowData.image} alt="" />
                {rowData.name}
              </Link>
            </React.Fragment>
          )
        },
        {
          title: "",
          field: "symbol",
          render: rowData => (
            <React.Fragment>
              <b>{rowData.symbol}</b>
            </React.Fragment>
          )
        },
        {
          title: "Price",
          field: "current_price",
          render: rowData => (
            <React.Fragment>
              {rowData.current_price === null ? (
                <Blue>{this.props.unit} 0</Blue>
              ) : (
                <Blue>
                  {this.props.unit}{" "}
                  {rowData.current_price.toLocaleString(undefined, {
                    maximumFractionDigits: 2
                  })}
                </Blue>
              )}
            </React.Fragment>
          )
        },
        {
          title: "1h",
          field: "price_change_percentage_1h_in_currency",
          render: rowData => (
            <React.Fragment>
              {rowData.price_change_percentage_1h_in_currency < 0 ? (
                <Red>
                  {Number(
                    Math.round(
                      rowData.price_change_percentage_1h_in_currency + "e2"
                    ) + "e-2"
                  )}
                  %
                </Red>
              ) : (
                <Green>
                  {Number(
                    Math.round(
                      rowData.price_change_percentage_1h_in_currency + "e2"
                    ) + "e-2"
                  )}
                  %
                </Green>
              )}
            </React.Fragment>
          )
        },
        {
          title: "24h",
          field: "price_change_percentage_24h_in_currency",
          render: rowData => (
            <React.Fragment>
              {rowData.price_change_percentage_24h_in_currency < 0 ? (
                <Red>
                  {Number(
                    Math.round(
                      rowData.price_change_percentage_24h_in_currency + "e2"
                    ) + "e-2"
                  )}
                  %
                </Red>
              ) : (
                <Green>
                  {Number(
                    Math.round(
                      rowData.price_change_percentage_24h_in_currency + "e2"
                    ) + "e-2"
                  )}
                  %
                </Green>
              )}
            </React.Fragment>
          )
        },
        {
          title: "7d",
          field: "price_change_percentage_7d_in_currency",
          render: rowData => (
            <React.Fragment>
              {rowData.price_change_percentage_7d_in_currency < 0 ? (
                <Red>
                  {Number(
                    Math.round(
                      rowData.price_change_percentage_7d_in_currency + "e2"
                    ) + "e-2"
                  )}
                  %
                </Red>
              ) : (
                <Green>
                  {Number(
                    Math.round(
                      rowData.price_change_percentage_7d_in_currency + "e2"
                    ) + "e-2"
                  )}
                  %
                </Green>
              )}
            </React.Fragment>
          )
        },
        {
          title: "24 Volume",
          field: "total_volume",
          render: rowData => (
            <React.Fragment>
              {rowData.total_volume === null ? (
                <Blue>{this.props.unit} 0</Blue>
              ) : (
                <Blue>
                  {this.props.unit}{" "}
                  {rowData.total_volume.toLocaleString(undefined, {
                    maximumFractionDigits: 2
                  })}
                </Blue>
              )}
            </React.Fragment>
          )
        },
        {
          title: "Circulating Supply",
          field: "circulating_supply",
          render: rowData => (
            <React.Fragment>
              {rowData.circulating_supply === null
                ? 0
                : rowData.circulating_supply.toLocaleString(undefined, {
                    maximumFractionDigits: 2
                  })}
            </React.Fragment>
          )
        },
        {
          title: "Mkt Cap",
          field: "market_cap",
          render: rowData => (
            <React.Fragment>
              {this.props.unit}{" "}
              {rowData.circulating_supply === null
                ? 0
                : rowData.market_cap.toLocaleString(undefined, {
                    maximumFractionDigits: 2
                  })}
            </React.Fragment>
          )
        },
        {
          title: "Last 7 Days",
          field: "name",
          render: rowData => (
            <React.Fragment>
              {rowData.price_change_percentage_7d_in_currency < 0 ? (
                <Sparklines data={rowData.sparkline_in_7d.price}>
                  <SparklinesLine color="red" style={{ fill: "none" }} />
                </Sparklines>
              ) : (
                <Sparklines data={rowData.sparkline_in_7d.price}>
                  <SparklinesLine color="green" style={{ fill: "none" }} />
                </Sparklines>
              )}
            </React.Fragment>
          )
        }
      ],
      data: []
    };
  }

  render() {
    return (
      <MaterialTable
        title="Top 100 Coins by Market Capitalization"
        columns={this.state.columns}
        data={this.props.getData}
        isLoading={this.props.isLoading}
        options={{
          search: false,
          paging: false
        }}
      />
    );
  }
}
