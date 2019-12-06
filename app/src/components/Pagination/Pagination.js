import React from "react";
import axios from "axios";
import { Pagination } from "semantic-ui-react";
import styled from "styled-components";
import MaterialTable from "material-table";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
const data = [{ name: "Page A", uv: 200, pv: 2400, amt: 2400 }];

const MainDiv = styled.div``;
const Red = styled.p`
  color: red;
`;
const Green = styled.p`
  color: green;
`;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      columns: [
        {
          title: "Coin Name",
          field: "name",
          render: rowData => (
            <React.Fragment>
              <img className="logo" src={rowData.image} alt="" />
              {rowData.name}
            </React.Fragment>
          )
        },
        { title: "Symbol", field: "symbol" },
        {
          title: "Price",
          field: "current_price"
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
        },
        {
          title: "Market Cap Rank",
          field: "market_cap_rank"
        }
      ],
      data: [],
      url:
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&page=1&per_page=100&price_change_percentage=1h%2C24h%2C7d",
      activePage: 1
    };
  }
  componentDidMount = () => {
    axios
      .get(
        this.state.url +
          `&per_page=100
      }&page=1`
      )
      .then(response => {
        this.setState({ data: response.data });
      });
  };
  handleOnChange = (e, pageInfo) => {
    e.preventDefault();
    this.setState({ isLoading: true, data: [] });
    axios
      .get(
        this.state.url +
          `&per_page=${
            this.state.dataPerPage
          }&page=${pageInfo.activePage.toString()}`
      )
      .then(response => {
        setTimeout(
          this.setState({
            isLoading: false,
            data: response.data,
            activePage: pageInfo.activePage,
            url:
              `${this.state.url}` +
              `&per_page=${
                this.state.dataPerPage
              }&page=${pageInfo.activePage.toString()}`
          }),
          1000
        );
      });
  };

  render() {
    return (
      <MainDiv>
        <MaterialTable
          title="COIN LIST"
          columns={this.state.columns}
          data={this.state.data}
          detailPanel={[
            {
              tooltip: "Show Coin Details",
              render: rowData => {
                return (
                  <div
                    style={{
                      height: 400,
                      paddingLeft: 20,
                      paddingTop: 20,
                      fontSize: 20,
                      color: "white",
                      backgroundColor: "rgb(235, 155, 6)"
                    }}
                  >
                    <h1>{rowData.name}</h1>
                    <div
                      style={{
                        marginRight: 25,
                        float: "right"
                      }}
                    >
                      <LineChart width={600} height={300} data={data}>
                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="name" />
                        <YAxis />
                      </LineChart>
                    </div>
                  </div>
                );
              }
            }
          ]}
          options={{
            paging: false,
            search: false
          }}
          onRowClick={(event, rowData, togglePanel) => togglePanel()}
        />
        <Pagination
          activePage={this.state.activePage}
          onPageChange={this.handleOnChange}
          totalPages={62}
          ellipsisItem={null}
        />
      </MainDiv>
    );
  }
}
