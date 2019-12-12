import React from "react";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";
import { Pagination } from "semantic-ui-react";
import "../../App.css";

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "#", field: "market_cap_rank" },
        {
          title: "Coin",
          field: "id",
          render: rowData => (
            <div className="weight">
              {" "}
              <img src={rowData.image} alt="" className="resize" />
              <Link key={rowData.id} to={`/coin/${rowData.id}`}>
                {rowData.name}
              </Link>
            </div>
          )
        },
        {
          title: "",
          field: "symbol",
          render: rowData => <div className="upcase"> {rowData.symbol}</div>
        },
        {
          title: "Current Price",
          field: "current_price",
          render: rowData => (
            <React.Fragment>
              {rowData.current_price === null ? (
                <div>$0</div>
              ) : (
                <div>
                  $
                  {rowData.current_price.toLocaleString(undefined, {
                    maximumFractionDigits: 2
                  })}
                </div>
              )}
            </React.Fragment>
          )
        },
        {
          title: "1h",
          field: "price_change_percentage_1h_in_currency",
          render: rowData => (
            <React.Fragment>
              {rowData.price_change_percentage_1h_in_currency === null ? (
                <div>?</div>
              ) : (
                <div>
                  {rowData.price_change_percentage_1h_in_currency < 0 ? (
                    <div className="r">
                      {rowData.price_change_percentage_1h_in_currency.toLocaleString(
                        undefined,
                        {
                          maximumFractionDigits: 2
                        }
                      )}
                      %
                    </div>
                  ) : (
                    <div className="g">
                      {rowData.price_change_percentage_1h_in_currency.toLocaleString(
                        undefined,
                        {
                          maximumFractionDigits: 2
                        }
                      )}
                      %
                    </div>
                  )}
                </div>
              )}
            </React.Fragment>
          )
        },
        {
          title: "24h",
          field: "price_change_percentage_24h_in_currency",
          render: rowData => (
            <React.Fragment>
              {rowData.price_change_percentage_24h_in_currency === null ? (
                <div>?</div>
              ) : (
                <div>
                  {rowData.price_change_percentage_24h_in_currency < 0 ? (
                    <div className="r">
                      {rowData.price_change_percentage_24h_in_currency.toLocaleString(
                        undefined,
                        {
                          maximumFractionDigits: 2
                        }
                      )}
                      %
                    </div>
                  ) : (
                    <div className="g">
                      {rowData.price_change_percentage_24h_in_currency.toLocaleString(
                        undefined,
                        {
                          maximumFractionDigits: 2
                        }
                      )}
                      %
                    </div>
                  )}
                </div>
              )}
            </React.Fragment>
          )
        },
        {
          title: "7d",
          field: "price_change_percentage_7d_in_currency",
          render: rowData => (
            <React.Fragment>
              {rowData.price_change_percentage_7d_in_currency === null ? (
                <div>?</div>
              ) : (
                <div>
                  {rowData.price_change_percentage_7d_in_currency < 0 ? (
                    <div className="r">
                      {rowData.price_change_percentage_7d_in_currency.toLocaleString(
                        undefined,
                        {
                          maximumFractionDigits: 2
                        }
                      )}
                      %
                    </div>
                  ) : (
                    <div className="g">
                      {rowData.price_change_percentage_7d_in_currency.toLocaleString(
                        undefined,
                        {
                          maximumFractionDigits: 2
                        }
                      )}
                      %
                    </div>
                  )}
                </div>
              )}
            </React.Fragment>
          )
        },
        {
          title: "24h Volume",
          field: "total_volume",
          render: rowData => (
            <React.Fragment>
              {rowData.total_volume === null ? (
                <div>$0</div>
              ) : (
                <div>
                  $
                  {rowData.total_volume.toLocaleString(undefined, {
                    maximumFractionDigits: 2
                  })}
                </div>
              )}
            </React.Fragment>
          )
        },
        {
          title: "Circulating Supply",
          field: "circulating_supply",
          render: rowData => (
            <React.Fragment>
              {rowData.circulating_supply === null ? (
                <div>0</div>
              ) : (
                <div>
                  {rowData.circulating_supply.toLocaleString(undefined, {
                    maximumFractionDigits: 2
                  })}
                </div>
              )}
            </React.Fragment>
          )
        },
        {
          title: "Mkt Cap",
          field: "market_cap",
          render: rowData => (
            <React.Fragment>
              {rowData.market_cap === null ? (
                <div>?</div>
              ) : (
                <div>
                  $
                  {rowData.market_cap.toLocaleString(undefined, {
                    maximumFractionDigits: 2
                  })}
                </div>
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
      <div className="table-cont">
        <Pagination
          activePage={this.props.activePage}
          onPageChange={this.props.handleChange}
          totalPages={126}
          ellipsisItem={null}
        />
        <MaterialTable
          title="List of Coins by Market Capitalization"
          columns={this.state.columns}
          data={this.props.coinData}
          options={{ search: false, paging: false }}
        />
      </div>
    );
  }
}
