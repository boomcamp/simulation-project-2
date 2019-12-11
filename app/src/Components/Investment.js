import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import MaterialTable from "material-table";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Header from "./Header";

function App() {
  const [coins, setCoins] = useState([]);
  const [state, setState] = React.useState({
    columns: [
      { title: "#", field: "id", defaultSort: "desc" },
      {
        title: "Coin",
        field: "image",
        render: state => (
          <img
            alt=""
            src={state.image.large}
            style={{ width: 30, borderRadius: "50%" }}
          />
        )
      },
      { title: "Name", field: "coinName" },
      { title: "Date", field: "date" },
      { title: "Amount", field: "amount"},
      { title: "Coin Amount", render: state => (
        `${state.value} ${state.symbol}`
      ) }
    ],
    data: []
  });

  useEffect(() => {
    renderData();
    renderTransactions();
  }, []);

  const renderData = () => {
    axios({
      method: "get",
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C1y`
    })
      .then(response => {
        setCoins(response.data);
        console.log(response.data);
      })
      .catch(err => console.log(err));
  };

  const renderTransactions = () => {
    axios({
      method: "get",
      url: `http://localhost:4000/transactions`
    })
      .then(response => {
        console.log(response.data);
        setState({ ...state, data: response.data });
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <Header />
      <CssBaseline />
      <Container maxWidth="xl" className="content-container">
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <MaterialTable
              options={{
                pageSizeOptions: [10, 20, 30],
                pageSize: 10
              }}
              title="Transactions"
              columns={state.columns}
              data={state.data}
            />
          </Grid>
          <Grid item xs={4}>
            asd
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
