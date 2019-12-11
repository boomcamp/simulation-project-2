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
import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
// SNACKBAR
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import { amber, green } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import clsx from "clsx";
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  Crosshair,
  LineSeries
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

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Home() {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const [hidden, setHidden] = useState(false);
  const [time24h, setTime24h] = useState([]);
  const [value, setValue] = useState(false);
  // HANDLE DIALOG
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setInput({ usd: "", btc: "" });
  };
  //HANDLE ALIGNMENT
  const [alignment, setAlignment] = React.useState("24h");

  //HANDLE TYPE
  const [input, setInput] = useState({ usd: "", btc: "" });
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

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

  const render24hours = e => {
    axios({
      method: "get",
      url: `https://api.coingecko.com/api/v3/coins/${e.target.id}/market_chart?vs_currency=usd&days=1`
    })
      .then(response => {
        var data = [];

        response.data.prices.map(elem => {
          data.push({ x: elem[0], y: elem[1] });
        });
        setTime24h(data);
      })
      .catch(err => console.log(err));
  };

  const handleChangeDate = e => {
    axios({
      method: "get",
      url: `https://api.coingecko.com/api/v3/coins/${selected.id}/market_chart?vs_currency=usd&days=${e}`
    })
      .then(response => {
        var data = [];

        response.data.prices.map(elem => {
          data.push({ x: elem[0], y: elem[1] });
        });
        setTime24h(data);
      })
      .catch(err => console.log(err));
  };

  const handleUsd = e => {
    var btc = e.target.value / selected.market_data.current_price.usd;
    setInput({ usd: e.target.value, btc: btc });
  };

  const handleCoin = e => {
    var usd = e.target.value * selected.market_data.current_price.usd;
    setInput({ usd: usd, btc: e.target.value });
  };

  const confirmFn = e => {
    e.preventDefault();
    console.log(input.btc);

    handleClose();
    let today = `${new Date().toDateString()},  ${new Date().toLocaleTimeString()}`;
    let data = {
      coinID: selected.id,
      value: input.btc,
      date: today,
      coinName: selected.name,
      symbol: selected.symbol,
      image: selected.image,
      amount: `$${input.usd}`
    };
    axios({
      method: "POST",
      url: `http://localhost:4000/transactions`,
      data: data
    })
      .then(response => {
        setInput({ usd: "", btc: "" });
        handleClickSnack();
        console.log(response);
      })
      .catch(err => console.log(err));
  };

  const goBackFn = () => {
    setHidden(false);
    setSelected([]);
    renderData();
    setTime24h([]);
    setInput({ usd: "", btc: "" });
  };

  function MySnackbarContentWrapper(props) {
    const classes = useStyles1();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
      <SnackbarContent
        className={clsx(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}
        {...other}
      />
    );
  }

  const [open2, setOpen2] = React.useState(false);
  const handleClickSnack = () => {
    setOpen2(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen2(false);
  };

  return (
    <React.Fragment>
      {/* SNACKBAR */}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={open2}
        autoHideDuration={6000}
        onClose={() => handleCloseSnack()}
      >
        <MySnackbarContentWrapper
          onClose={() => handleCloseSnack()}
          variant="success"
          message="Succesfully bought a coin!"
        />
      </Snackbar>
      {/* END SNACKBAR */}
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
            {/* DIALOG */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
            >
              Invest <ArrowDropDownIcon />
            </Button>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <form onSubmit={confirmFn}>
                <DialogTitle id="alert-dialog-slide-title">
                  {`Invest on ${selected.name}? `}
                </DialogTitle>
                <DialogContent>
                  <Grid container spacing={1}>
                    <Grid item xs={5} className="goleft" zeroMinWidth>
                      <Typography variant="overline" gutterBottom noWrap>
                        Market Cap:
                      </Typography>
                      <Typography variant="overline" gutterBottom noWrap>
                        {selected.name} Price:
                      </Typography>
                    </Grid>
                    <Grid item xs={7} className="goleft" zeroMinWidth>
                      <Typography variant="button" gutterBottom noWrap>
                        Rank #{selected.market_cap_rank}
                      </Typography>
                      <Typography variant="button" gutterBottom noWrap>
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
                    </Grid>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item xs={5} zeroMinWidth>
                      <TextField
                        required
                        type="number"
                        id="outlined-basic"
                        label="usd"
                        variant="outlined"
                        value={input.usd}
                        onChange={e => handleUsd(e)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      zeroMinWidth
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "2em"
                      }}
                    >
                      =
                    </Grid>

                    <Grid item xs={6} zeroMinWidth>
                      <TextField
                        required
                        type="number"
                        id="outlined-basic"
                        label="Coin"
                        variant="outlined"
                        value={input.btc}
                        onChange={e => handleCoin(e)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">{selected.symbol}</InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button variant="contained" color="primary" type="submit">
                    Confirm
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
            {/* DIALOG */}
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
                <ToggleButtonGroup
                  value={alignment}
                  exclusive
                  onChange={handleAlignment}
                >
                  <ToggleButton
                    style={{ color: "black" }}
                    value="24h"
                    onClick={() => handleChangeDate(1)}
                  >
                    24h
                  </ToggleButton>
                  <ToggleButton
                    style={{ color: "black" }}
                    value="7d"
                    onClick={() => handleChangeDate(7)}
                  >
                    7d
                  </ToggleButton>
                  <ToggleButton
                    style={{ color: "black" }}
                    value="30d"
                    onClick={() => handleChangeDate(30)}
                  >
                    30d
                  </ToggleButton>
                  <ToggleButton
                    style={{ color: "black" }}
                    value="180d"
                    onClick={() => handleChangeDate(180)}
                  >
                    180d
                  </ToggleButton>
                  <ToggleButton
                    style={{ color: "black" }}
                    value="1y"
                    onClick={() => handleChangeDate(365)}
                  >
                    1y
                  </ToggleButton>
                  <ToggleButton
                    style={{ color: "black" }}
                    value="max"
                    onClick={() => handleChangeDate("max")}
                  >
                    max
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                marginTop: "1%"
              }}
            >
              <XYPlot
                onMouseLeave={() => setValue(false)}
                width={1150}
                height={500}
              >
                <HorizontalGridLines />
                <XAxis title="Date" xType="time" />
                <YAxis title="Price in USD" left={5} />
                <LineSeries
                  data={time24h}
                  animation={true}
                  onNearestX={d => {
                    setValue(d);
                  }}
                />
                {value && (
                  <Crosshair
                    values={[value]}
                    titleFormat={d => ({
                      title: "Date",
                      value: `${new Date(d[0].x).toDateString()},  ${new Date(
                        d[0].x
                      ).toLocaleTimeString()}`
                    })}
                    itemsFormat={d => [
                      {
                        title: "Price",
                        value: (
                          <NumberFormat
                            value={d[0].y}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                            decimalScale={"2"}
                          />
                        )
                      }
                    ]}
                  />
                )}
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
