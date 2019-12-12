import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import MaterialTable from "material-table";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Typography from "@material-ui/core/Typography";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import NumberFormat from "react-number-format";

import Header from "./Header";

function App() {
  const [totalinvestment, setTotalInvestment] = useState([]);
  const [coins, setCoins] = useState([]);
  const [state, setState] = React.useState({
    columns: [
      { title: "Trans #", field: "id", defaultSort: "desc" },
      // {
      //   title: "Coin",
      //   field: "image",
      //   render: state => (
      // <img
      //   alt=""
      //   src={state.image.large}
      //   style={{ width: 30, borderRadius: "50%" }}
      // />
      //   )
      // },
      // { title: "Name", field: "coinName" },
      {
        title: "Coin Amount",
        render: state => `${state.value} ${state.symbol}`
      },
      { title: "Amount", render: state => `$${state.amount}` },
      { title: "Price Before", render: state => `$${state.priceBefore}` },
      { title: "Date", field: "date" },
      {
        title: "Coin Balance",
        render: state => `${state.coinBalance} ${state.symbol}`
      },
      {
        title: "Track",
        render: state => (
          <Button color="secondary" onClick={() => selectFn(state.id)}>
            <VisibilityIcon />
          </Button>
        )
      }
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
      })
      .catch(err => console.log(err));
  };

  const renderTransactions = () => {
    axios({
      method: "get",
      url: `http://localhost:4000/transactions`
    })
      .then(response => {
        setState({ ...state, data: response.data });

        let result = response.data.reduce((c, v) => {
          const num = parseFloat(v.coinBalance);
          c[v.coinName] = (c[v.coinName] || 0) + num;
          return c;
        }, {});

        let newData = [];

        // console.log(result);
        for (var key in result) {
          newData.push({ coinName: key, totalValue: result[key] });
        }
        setTotalInvestment(newData);

        // // first, convert data into a Map with reduce
        // let counts = response.data.reduce((prev, curr) => {
        //   let count = prev.get(curr.coinName) || 0;
        //   prev.set(curr.coinName, curr.value + count);
        //   return prev;
        // }, new Map());

        // // then, map your counts object back to an array
        // let reducedObjArr = [...counts].map(([coinName, totalValue]) => {
        //   return { coinName, totalValue };
        // });

        // console.log(reducedObjArr);
      })
      .catch(err => console.log(err));
  };

  const [hidden, setHidden] = useState(false);

  const handleHide = () => {
    setHidden(false);
    setSelected([]);
    setCoinSelected([]);
  };

  const [selected, setSelected] = useState([]);
  const [coinSelected, setCoinSelected] = useState([]);
  const [percentage, setPercentage] = useState({
    percentChange: 0,
    profitloss: 0
  });

  const selectFn = e => {
    setHidden(true);
    axios({
      method: "get",
      url: `http://localhost:4000/transactions/${e}`
    }).then(response => {
      setSelected(response.data);
      let coinIde = response.data.coinID;
      let priceBefore = response.data.priceBefore;
      let amount = response.data.amount;
      axios({
        method: "get",
        url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C1y`
      })
        .then(response => {
          var filteredCoin = response.data.filter(function(coin) {
            return coin.id === coinIde;
          });
          setCoinSelected(filteredCoin);

          var percentChange = filteredCoin[0].current_price - priceBefore;
          percentChange = (percentChange / priceBefore) * 100;
          var profitloss = (percentChange / 100) * amount;
          setPercentage({
            percentChange: percentChange,
            profitloss: profitloss
          });
        })
        .catch(err => console.log(err));
    });
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
          {/* COIN BALANCE */}
          <Grid
            item
            xs={4}
            style={{
              backgroundColor: "#f4f4f4",
              display: hidden ? "none" : null
            }}
          >
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                My Coin Wallet
              </Typography>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Typography
                  variant="h7"
                  gutterBottom
                  style={{ fontWeight: "bold" }}
                >
                  Coin
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="h7"
                  gutterBottom
                  style={{ fontWeight: "bold" }}
                >
                  Balance
                </Typography>
              </Grid>

              {totalinvestment.map(data => (
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    {data.coinName}
                  </Grid>
                  <Grid item xs={6}>
                    {data.totalValue}
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
          {/* END COIN BALANCE */}

          {/* COIN INFO */}
          <Grid
            item
            xs={4}
            style={{
              backgroundColor: "#f4f4f4",
              display: hidden ? null : "none"
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Button onClick={handleHide} style={{ float: "right" }}>
                  <CancelPresentationIcon />
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <img
                  alt=""
                  src={selected.image ? selected.image.large : null}
                  style={{ width: 50 }}
                />
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ fontWeight: "bold" }}
                >
                  {selected.coinName}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Invested ${selected.amount} for {selected.value}
                  {selected.symbol}
                </Typography>
              </Grid>
              <Grid container spacing={2} style={{ marginTop: "1%" }}>
                <Grid
                  item
                  xs={4}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  Date Purchased:
                </Grid>
                <Grid item xs={6}>
                  {selected.date}
                </Grid>
                <Grid
                  item
                  xs={4}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  Price of coin when bought:
                </Grid>
                <Grid item xs={6}>
                  ${selected.priceBefore} / {selected.symbol}
                </Grid>
                <Grid
                  item
                  xs={4}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  Current coin price:
                </Grid>
                <Grid item xs={6}>
                  ${coinSelected[0] ? coinSelected[0].current_price : null} /{" "}
                  {selected.symbol}
                </Grid>
              </Grid>
              <Grid container spacing={1} style={{ marginTop: "2%" }}>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Typography variant="h4" gutterBottom>
                    If you sell this coin now you {percentage.percentChange > 0 ? "earn" : "lose"}{" "}
                  </Typography> 
                  <Typography variant="h3" gutterBottom>
                    
                    <NumberFormat
                      value={percentage.profitloss}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={percentage.profitloss < 0 ? "$" : "+$"}
                      decimalScale={"2"}
                      style={{
                        color: percentage.profitloss < 0 ? "red" : "green"
                      }}
                    />
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    <NumberFormat
                      value={percentage.percentChange}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={"2"}
                      suffix={
                        percentage.percentChange < 0
                          ? "% decreased"
                          : "% increased"
                      }
                      style={{
                        color: percentage.percentChange < 0 ? "red" : "green"
                      }}
                    />
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* END COIN INFO */}
        </Grid>
      </Container>
    </>
  );
}

export default App;
