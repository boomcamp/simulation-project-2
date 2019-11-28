import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Pagination } from "semantic-ui-react";
import { Cont, Div, Cont2, Cont3 } from "./Style";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
import { Img, Red, Blue, Green, Span } from "./Style";
import "semantic-ui-css/semantic.min.css";
import MaterialTable from "material-table";
import Select from "react-select";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
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
            <Link to={`/details/${rowData.id}`}>
              <Img src={rowData.image} />
              {rowData.name}
            </Link>
          )
        },
        {
          field: "symbol",
          render: rowData => <Span>{rowData.symbol}</Span>
        },
        {
          title: "Price",
          field: "current_price",
          render: rowData => (
            <Blue>
              {this.props.currency.unit} {rowData.current_price}
            </Blue>
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
          title: "24hr",
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
          title: "24h Volume",
          field: "total_volume",
          render: rowData => (
            <Blue>
              {this.props.currency.unit} {rowData.total_volume}
            </Blue>
          )
        },
        {
          title: "Circulating Supply",
          field: "circulating_supply",
          render: rowData => (
            <React.Fragment>{rowData.circulating_supply}</React.Fragment>
          )
        },
        {
          title: "Mkt Cap",
          field: "market_cap",
          render: rowData => (
            <React.Fragment>
              {this.props.currency.unit} {rowData.market_cap}
            </React.Fragment>
          )
        },
        {
          title: "Last 7 days",
          field: "sparkline_in_7d",
          render: rowData => (
            <Sparklines
              data={rowData.sparkline_in_7d.price}
              limit={50}
              style={{ height: "20px" }}
            >
              <SparklinesLine
                color={
                  rowData.price_change_percentage_7d_in_currency < 0
                    ? "red"
                    : "green"
                }
              />
              <SparklinesSpots />
            </Sparklines>
          )
        }
      ]
    };
  }

  render() {
    const {
      handleDetails,
      handleSelect,
      currency,
      data,
      loading,
      handlePagination,
      currentPage,
      currencies
    } = this.props;
    const money = Object.keys(currencies).map(x => {
      return {
        value: x,
        label: currencies[x].name,
        unit: currencies[x].unit
      };
    });
    return (
      <Div>
        <Cont2>
          <Cont3>
            <Select
              menuPortalTarget={document.body}
              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
              options={money}
              value={currency}
              onChange={handleSelect}
            />
          </Cont3>
          <Pagination
            activePage={currentPage}
            onPageChange={handlePagination}
            totalPages={62}
            ellipsisItem={null}
            style={{ margin: "0 0 5px 0" }}
          />
        </Cont2>
        <Cont>
          <MaterialTable
            title="Top 100 Coins by Market Capitalization"
            options={{
              paging: false
            }}
            columns={this.state.columns}
            data={data}
            isLoading={loading}
            onRowClick={handleDetails}
          />
        </Cont>
      </Div>
    );
  }
}
