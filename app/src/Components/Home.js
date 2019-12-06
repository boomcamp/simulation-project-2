import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import MaterialTable from "material-table";
import axios from "axios";
import Header from "./Header";
import NumberFormat from "react-number-format";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  AreaSeries
} from "react-vis";

const useStyles = makeStyles({
  avatar: {
    margin: 10
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  }
});

function Home() {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const [hidden, setHidden] = useState(false);
  const [time24h, setTime24h] = useState({
    data: [
      {}
    ],
  })

  const [state, setState] = React.useState({
    columns: [
      { title: "#", field: "market_cap_rank" },
      {
        title: "Coin",
        field: "image",
        render: state => (
          <img
            alt=""
            src={state.image}
            style={{ width: 30, borderRadius: "50%" }}
          />
        )
      },
      {
        title: "Name",
        field: "name",
        render: state => (
          <span id={state.id} className="name-c" onClick={e => renderRedir(e)}>
            {state.name}
          </span>
        )
      },
      {
        title: "Symbol",
        field: "symbol",
        render: state => (
          <span id={state.id} className="name-c" onClick={e => renderRedir(e)}>
            {state.symbol}
          </span>
        )
      },

      {
        title: "Price",
        field: "current_price",
        cellStyle: {
          color: "Blue"
        },
        render: state => (
          <NumberFormat
            value={state.current_price}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            decimalScale={"2"}
          />
        )
      },

      {
        title: "1h",
        field: "price_change_percentage_1h_in_currency",
        render: state => (
          <NumberFormat
            value={state.price_change_percentage_1h_in_currency}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={"2"}
            suffix={"%"}
            style={{
              color:
                state.price_change_percentage_1h_in_currency < 0
                  ? "red"
                  : "green"
            }}
          />
        )
      },
      {
        title: "24h",
        field: "price_change_percentage_24h_in_currency",
        render: state => (
          <NumberFormat
            value={state.price_change_percentage_24h_in_currency}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={"2"}
            suffix={"%"}
            style={{
              color:
                state.price_change_percentage_24h_in_currency < 0
                  ? "red"
                  : "green"
            }}
          />
        )
      },

      {
        title: "7d",
        field: "price_change_percentage_7d_in_currency",
        render: state => (
          <NumberFormat
            value={state.price_change_percentage_7d_in_currency}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={"2"}
            suffix={"%"}
            style={{
              color:
                state.price_change_percentage_7d_in_currency < 0
                  ? "red"
                  : "green"
            }}
          />
        )
      },

      {
        title: "Circulating Supply",
        field: "circulating_supply",
        render: state => (
          <NumberFormat
            value={state.circulating_supply}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={"0"}
            decimalSeparator={""}
          />
        )
      },
      {
        title: "Mkt Cap",
        field: "market_cap",
        render: state => (
          <NumberFormat
            value={state.market_cap}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        )
      }
    ],
    data: []
  });

  useEffect(() => {
    renderData();
  }, []);

  const renderData = () => {
    axios({
      method: "get",
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C1y`
    })
      .then(response => {
        setState({
          ...state,
          data: response.data
        });
      })
      .catch(err => console.log(err));
  };

  const renderRedir = e => {
    setHidden(true);
    render24hours(e);
    axios({
      method: "get",
      url: `https://api.coingecko.com/api/v3/coins/${e.target.id}?market_data=true&developer_data=false`
    })
      .then(response => {
        setSelected(response.data);
      })
      .catch(err => console.log(err));
  };

  const render24hours = e =>{
    axios({
      method: "get",
      url: `https://api.coingecko.com/api/v3/coins/${e.target.id}/market_chart?vs_currency=usd&days=1`
    })
      .then(response => {
        // setTime24h(response.data.prices)

        
        // var ts = new Date(response.data.prices[0][0]);
        // console.log(ts.toLocaleTimeString())
        response.data.prices.forEach(element => {
          setTime24h({
            ...time24h,
            data: {x: element[0], y: element[1]}
          })
        })
        // console.log(response.data.prices)
      })
      .catch(err => console.log(err));
  }

  const goBackFn = () => {
    setHidden(false);
    setSelected([]);
    renderData();
  };

  return (
    <React.Fragment>
      <Header />
      <CssBaseline />
      <Container
        maxWidth="xl"
        className="content-container"
        style={{ display: hidden ? "none" : null }}
      >
        <MaterialTable
          options={{
            pageSizeOptions: [10, 20, 30],
            pageSize: 10
          }}
          title="Coins List"
          columns={state.columns}
          data={state.data}
        />
      </Container>

      <Container
        maxWidth="lg"
        className="content2-container"
        style={{ display: hidden ? null : "none" }}
      >
        <Button onClick={goBackFn}>Coins</Button>/ {` ${selected.name}`}
        <Container maxWidth="lg" className="content3-container">
          <div className="sec-head">
            <Avatar
              alt=""
              src={selected.image ? selected.image.large : ""}
              className={classes.bigAvatar}
            />
            <Typography variant="h4" gutterBottom>
              {selected.name} ({selected.symbol})
            </Typography>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h4"
              gutterBottom
              style={{ marginRight: "10px" }}
            >
              {selected.market_data ? (
                <NumberFormat
                  value={selected.market_data.current_price.usd}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  decimalScale={"2"}
                />
              ) : null}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {selected.market_data ? (
                <NumberFormat
                  value={selected.market_data.price_change_percentage_24h}
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={"1"}
                  suffix={"%"}
                  style={{
                    color:
                      selected.market_data.price_change_percentage_24h < 0
                        ? "red"
                        : "green"
                  }}
                />
              ) : null}
            </Typography>
          </div>
        </Container>
        <Container maxWidth="lg" className="content4-container">
          <div className="info-cont">
            <Grid container spacing={1}>
              <Grid item xs={1} className="goleft" zeroMinWidth>
                <Typography variant="overline" gutterBottom noWrap>
                  Market Cap
                </Typography>
                <Typography variant="overline" gutterBottom noWrap>
                  Website
                </Typography>
              </Grid>
              <Grid item xs={3} className="goleft" zeroMinWidth>
                <Typography variant="overline" gutterBottom noWrap>
                  Rank #{selected.market_cap_rank}
                </Typography>
                <Typography variant="overline" gutterBottom noWrap>
                  {selected.links ? selected.links.homepage[0] : null}
                </Typography>
              </Grid>
            </Grid>
          </div>
        </Container>
        <Container maxWidth="lg" className="content4-container">
          Overview
          <Grid container spacing={0} style={{ marginTop: "1%" }}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom noWrap>
                {selected.name} ({selected.symbol})
              </Typography>
              <Typography variant="body2" gutterBottom>
                <div
                  className="Container"
                  dangerouslySetInnerHTML={{
                    __html: selected.description
                      ? selected.description.en
                      : null
                  }}
                ></div>
              </Typography>
              <Grid
                container
                spacing={0}
                direction="row"
                justify="center"
                alignItems="flex-start"
                style={{ marginTop: "1%" }}
              >
                <Grid item xs={2} className="mini-table">
                  24h
                </Grid>
                <Grid item xs={2} className="mini-table">
                  7d
                </Grid>
                <Grid item xs={2} className="mini-table">
                  14d
                </Grid>
                <Grid item xs={2} className="mini-table">
                  30d
                </Grid>
                <Grid item xs={2} className="mini-table">
                  60d
                </Grid>
                <Grid item xs={2} className="mini-table">
                  1y
                </Grid>
              </Grid>

              <Grid
                container
                spacing={0}
                direction="row"
                justify="center"
                alignItems="flex-start"
              >
                <Grid item xs={2} className="mini-table">
                  {selected.market_data ? (
                    <NumberFormat
                      value={selected.market_data.price_change_percentage_24h}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={"1"}
                      suffix={"%"}
                      style={{
                        color:
                          selected.market_data.price_change_percentage_24h < 0
                            ? "red"
                            : "green"
                      }}
                    />
                  ) : null}
                </Grid>
                <Grid item xs={2} className="mini-table">
                  {selected.market_data ? (
                    <NumberFormat
                      value={selected.market_data.price_change_percentage_7d}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={"1"}
                      suffix={"%"}
                      style={{
                        color:
                          selected.market_data.price_change_percentage_7d < 0
                            ? "red"
                            : "green"
                      }}
                    />
                  ) : null}
                </Grid>
                <Grid item xs={2} className="mini-table">
                  {selected.market_data ? (
                    <NumberFormat
                      value={selected.market_data.price_change_percentage_14d}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={"1"}
                      suffix={"%"}
                      style={{
                        color:
                          selected.market_data.price_change_percentage_14d < 0
                            ? "red"
                            : "green"
                      }}
                    />
                  ) : null}
                </Grid>
                <Grid item xs={2} className="mini-table">
                  {selected.market_data ? (
                    <NumberFormat
                      value={selected.market_data.price_change_percentage_30d}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={"1"}
                      suffix={"%"}
                      style={{
                        color:
                          selected.market_data.price_change_percentage_30d < 0
                            ? "red"
                            : "green"
                      }}
                    />
                  ) : null}
                </Grid>
                <Grid item xs={2} className="mini-table">
                  {selected.market_data ? (
                    <NumberFormat
                      value={selected.market_data.price_change_percentage_60d}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={"1"}
                      suffix={"%"}
                      style={{
                        color:
                          selected.market_data.price_change_percentage_60d < 0
                            ? "red"
                            : "green"
                      }}
                    />
                  ) : null}
                </Grid>
                <Grid item xs={2} className="mini-table">
                  {selected.market_data ? (
                    <NumberFormat
                      value={selected.market_data.price_change_percentage_1y}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={"1"}
                      suffix={"%"}
                      style={{
                        color:
                          selected.market_data.price_change_percentage_1y < 0
                            ? "red"
                            : "green"
                      }}
                    />
                  ) : null}
                </Grid>
              </Grid>
            </Grid>

            {/* CHART */}
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1%"
              }}
            >
              <Grid item>
                <ButtonGroup
                  size="small"
                  aria-label="small outlined button group"
                >
                  <Button>Price</Button>
                </ButtonGroup>
              </Grid>

              <Grid item>
                <ButtonGroup
                  size="small"
                  aria-label="small outlined button group"
                >
                  <Button>24h</Button>
                  <Button>7d</Button>
                  <Button>30d</Button>
                  <Button>180d</Button>
                  <Button>1y</Button>
                  <Button>Max</Button>
                </ButtonGroup>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                marginTop: "1%"
              }}
            >
              <XYPlot width={1000} height={500}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <AreaSeries
                  className="area-series-example"
                  curve="curveNatural"
                  data={[
                    {  x: 1, y: 10 },{ x: 2, y: 9 },
                  ]}
                />
              </XYPlot>
            </Grid>
            {/* END CHART */}
          </Grid>
        </Container>
      </Container>
    </React.Fragment>
  );
}

export default Home;
