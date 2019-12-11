import React from "react";
import { Pagination } from "semantic-ui-react";
import styled from "styled-components";
import MaterialTable from "material-table";
import { Link, Route, Switch } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
const Red = styled.p`
  color: red;
`;
const Green = styled.p`
  color: green;
`;

const Page = styled.div`
  display: flex;
  padding-bottom: 10px;
`;

const Div = styled.div`
  width: 100%;
  height: 100%;
`;

export default class coinDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      columns: [
        {
          title: "#",
          field: "market_cap_rank",
          cellStyle: rowData => ({
            fontWeight: "bold",
            fontSize: 15,
            paddingBottom: 30
          })
        },
        {
          title: "Coin Name",
          field: "name",
          render: rowData => (
            <React.Fragment>
              <img className="logo" src={rowData.image} alt="" />
              <Link key={rowData.id} to={`chartInfo/${rowData.id}`}>
                <Tooltip TransitionComponent={Zoom} title="Show Price Chart">
                  <button
                    style={{
                      color: "darkblue",
                      fontSize: 17,
                      paddingBottom: 20,
                      background: "transparent",
                      border: "transparent",
                      cursor: "pointer"
                    }}
                  >
                    {rowData.name}
                  </button>
                </Tooltip>
              </Link>
              <Switch>
                <Route />
              </Switch>
            </React.Fragment>
          )
        },
        {
          title: "Symbol",
          field: "symbol",
          cellStyle: rowData => ({ fontWeight: "bold", fontSize: 15 })
        },
        {
          title: "Price",
          field: "current_price",
          cellStyle: rowData => ({ color: "purple", fontSize: 15 })
        },
        {
          title: "1hr",
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
          title: "Market Cap",
          field: "market_cap"
        }
      ],
      data: [],
      url:
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&page=1&per_page=100&price_change_percentage=1h%2C24h%2C7d",
      activePage: 1
    };
  }

  render() {
    return (
      <MainDiv>
        <Page>
          <Pagination
            activePage={this.props.activePage}
            onPageChange={this.props.handleOnChange}
            totalPages={62}
            ellipsisItem={null}
          />
        </Page>
        <Div>
          <MaterialTable
            title="COIN LIST"
            columns={this.state.columns}
            data={this.props.coinData}
            options={{
              paging: false,
              search: false
            }}
          />
        </Div>
      </MainDiv>
    );
  }
}
