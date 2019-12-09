import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Container, CircularProgress, Box } from "@material-ui/core";
import CoinListAppBar from "../AppBar/CoinListAppBar";
import "semantic-ui-css/semantic.min.css";
import { Pagination } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export default function MaterialTableDemo() {
  const [loader, setLoader] = useState(false);
  const [data, setData] = React.useState([]);
  const [Page, setPage] = React.useState(1);
  const onChange = (e, pageInfo) => {
    setPage(pageInfo.activePage);
  };
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  });
  const circulatingFormat = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  useEffect(() => {
    setLoader(true);
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page=${Page}`
      )
      .then(response => {
        setLoader(false);
        setData(response.data);
      });
  }, [Page]);
  return (
    <div>
      <CoinListAppBar />
      <Box style={{ marginLeft: "35%" }}>
        <p
          style={{
            fontFamily: "Saira Semi Condensed, sans-serif",
            fontSize: 40,
            width: "100%",
            color: "white",
            textAlign: "left",
            borderLeft: "10px solid white",
            padding: "0px 20px"
          }}
        >
          Cryptocurrency Price Explorer
        </p>
      </Box>
      <Container>
        {loader ? (
          <div
            style={{
              paddingLeft: "25px",
              height: "70%",
              marginTop: 40,
              borderRadius: "0px",
              backgroundColor: "white",
              paddingTop: 400,
              paddingBottom: 304,
              borderLeft: "30px solid #6fc5d5"
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <MaterialTable
            title="Cryptocurrency Coin List"
            style={{
              paddingLeft: "25px",
              height: "70%",
              marginTop: 40,
              borderRadius: "0px",
              borderLeft: "30px solid #6fc5d5",
              boxShadow: "none"
            }}
            columns={[
              {
                title: "Rank",
                headerStyle: {
                  height: 10,
                  fontWeight: "bold"
                },
                field: "market_cap_rank"
              },
              {
                title: "Logo",
                headerStyle: {
                  height: 10,
                  fontWeight: "bold"
                },
                render: rowData => (
                  <NavLink
                    to={`/coindetail/${rowData.id}`}
                    style={{ cursor: "pointer" }}
                    className="name"
                  >
                    <img className="logo" src={rowData.image} alt="Img" />
                  </NavLink>
                )
              },
              {
                title: "Cryptocurrencies",
                headerStyle: {
                  height: 10,
                  fontWeight: "bold"
                },
                render: rowData => (
                  <NavLink
                    to={`/coindetail/${rowData.id}`}
                    style={{ color: "black", cursor: "pointer" }}
                    className="name"
                  >
                    {rowData.name}
                  </NavLink>
                )
              },

              {
                title: "Ticker",
                headerStyle: {
                  height: 10,
                  fontWeight: "bold"
                },
                render: rowData => <p className="symbol">{rowData.symbol}</p>
              },
              {
                title: "Current Price",
                headerStyle: {
                  height: 10,
                  fontWeight: "bold"
                },
                render: rowData => (
                  <p>{formatter.format(rowData.current_price)}</p>
                )
              },
              {
                title: "Market Cap",
                headerStyle: {
                  height: 10,
                  fontWeight: "bold"
                },
                render: rowData => <p>{formatter.format(rowData.market_cap)}</p>
              },
              {
                title: "Circulating Supply",
                headerStyle: {
                  height: 10,
                  fontWeight: "bold"
                },
                render: rowData => (
                  <span>
                    {circulatingFormat(Math.round(rowData.circulating_supply))}
                  </span>
                )
              }
            ]}
            data={data}
            options={{
              paging: false
            }}
          />
        )}
        <Pagination
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            borderLeft: "30px solid #6fc5d5"
          }}
          activePage={Page}
          onPageChange={onChange}
          totalPages={620}
          ellipsisItem={"..."}
        />
      </Container>
    </div>
  );
}
