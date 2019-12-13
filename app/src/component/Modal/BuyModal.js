import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import clsx from "clsx";
import styled from "styled-components";
import axios from "axios";

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    },
    textField: {
      width: 200
    }
  },

  input: {
    width: 485,
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));
const Convert = styled(OutlinedInput)`
  .MuiInputBase-input.Mui-disabled {
    color: black;
  }
`;
export default function BuyModal({ setOpenBuy, openBuy, details }) {
  const theme = useTheme();
  const classes = useStyles();
  const [payment, setPayment] = useState("Bank");
  const [values, setValues] = useState(0);
  const [balance, setBalance] = useState({});

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setOpenBuy(false);
    setValues(0);
  };

  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  const usd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  const handleChangeValues = event => {
    setValues(event.target.value);
  };

  const handleChangePayment = event => {
    setPayment(event.target.value);
  };
  useEffect(() => {
    axios.get(`http://localhost:4000/wallet`).then(res => {
      setBalance(res.data);
    });
  }, []);

  const addTransaction = () => {
    axios.patch(`http://localhost:4000/wallet`, {
      money: balance.money - parseInt(values)
    });
    axios
      .post(`http://localhost:4000/transactions`, {
        coin: details.localization.en,
        date: today,
        transaction: "Buy",
        paymentMethod: payment,
        price: details.market_data.current_price.usd,
        coinCountT: values / details.market_data.current_price.usd,
        coinCountU: values / details.market_data.current_price.usd,
        investment: parseInt(values)
      })
      .then(() => (window.location.href = "/transaction"))
      .catch(error => console.log(error));
  };
  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={openBuy}
        onClose={() => {
          if (!values) {
            handleClose();
          }
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Buy"}</DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <img src={details.image.small} alt="CoinImage"></img>
            <DialogContentText>{details.localization.en}</DialogContentText>
          </div>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="demo-customized-select-native">
              Payment Method
            </InputLabel>
            <NativeSelect
              id="demo-customized-select-native"
              value={payment}
              onChange={handleChangePayment}
              input={<BootstrapInput />}
            >
              <option value="Bank">Bank</option> />
              <option value="Visa">Visa</option>
              <option value="PayPal">PayPal</option>
              <option value="Worldpay">WorldpAy</option>
            </NativeSelect>
          </FormControl>
          <DialogContentText>{"Amount"}</DialogContentText>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center"
            }}
          >
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
            >
              <OutlinedInput
                type="number"
                id="outlined-adornment-weight"
                value={values === 0 ? "" : values}
                onChange={handleChangeValues}
                endAdornment={
                  <InputAdornment position="end">USD</InputAdornment>
                }
                aria-describedby="outlined-weight-

                lper-text"
                inputProps={{
                  "aria-label": "weight"
                }}
                labelWidth={0}
              />
            </FormControl>
            <SyncAltIcon />
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
            >
              <Convert
                disabled
                id="outlined-adornment-weight"
                value={
                  values === 0
                    ? " "
                    : (
                        values / details.market_data.current_price.usd
                      ).toLocaleString()
                }
                onChange={handleChangeValues}
                endAdornment={
                  <InputAdornment
                    style={{ textTransform: "uppercase" }}
                    position="end"
                  >
                    {details.symbol}
                  </InputAdornment>
                }
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight"
                }}
                labelWidth={0}
              />
            </FormControl>
          </div>
          <div
            style={{
              border: "1px lightgray solid",
              height: 50,
              borderRadius: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            className={classes.margin}
          >
            {values === 0 ? " " : usd.format(values)}
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="primary" onClick={addTransaction}>
            Confirm
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
