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
import Axios from "axios";

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
    width: 493,
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
export default function SellModal({ setOpenSell, openSell, details }) {
  const theme = useTheme();
  const classes = useStyles();
  const [payment, setPayment] = useState("Bank");
  const [coins, setCoins] = useState("");
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState(0);
  const [profit, setProfit] = useState(0);
  const [loss, setLoss] = useState(0);
  const [coinUpdate, setCoinUpdate] = useState(0);

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setOpenSell(false);
    setAmount("");
    setCoins("");
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

  const handleChangePayment = event => {
    setPayment(event.target.value);
  };

  useEffect(() => {
    Axios.get(`http://localhost:4000/transactions`).then(res => {
      setWallet(...res.data);
    });
  }, []);

  const addTransaction = () => {
    Axios.patch(`http://localhost:4000/transactions/${wallet.id}`, {
      coinCountU: coinUpdate
    });
    Axios.post(`http://localhost:4000/transactions`, {
      coin: details.localization.en,
      date: today,
      transaction: "Sell",
      deposit: payment,
      profit: profit,
      loss: loss,
      coinCountSell: coins,
      amount: amount
    })
      .then(() => (window.location.href = "/transaction"))
      .catch(error => console.log(error));
  };
  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={openSell}
        onClose={() => {
          if (!amount) {
            handleClose();
          }
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Sell"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{"Sell From"}</DialogContentText>
          <FormControl style={{ width: 533, marginLeft: 8 }}>
            <OutlinedInput
              id="outlined-adornment-weight"
              startAdornment={
                <InputAdornment position="start">
                  <img
                    src={details.image.small}
                    style={{ width: 30, marginRight: 20 }}
                    alt="bitcoin"
                  ></img>
                  <div>{details.localization.en} Wallet</div>
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginRight: 30
                    }}
                  >
                    {wallet.coinCountU}
                    <small>
                      =
                      {usd.format(
                        details.market_data.current_price.usd *
                          wallet.coinCountU
                      )}
                    </small>
                  </div>
                </InputAdornment>
              }
              aria-describedby="outlined-weight-

                lper-text"
              inputProps={{
                "aria-label": "weight"
              }}
              labelWidth={0}
            />
          </FormControl>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="demo-customized-select-native">
              Deposit To
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
                value={amount}
                onChange={e => {
                  setAmount(e.target.value);
                  setCoins(
                    (
                      e.target.value / details.market_data.current_price.usd
                    ).toLocaleString()
                  );
                }}
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
                type="number"
                id="outlined-adornment-weight"
                value={coins}
                onChange={e => {
                  setCoins(e.target.value);
                  setCoinUpdate(wallet.coinCountT - e.target.value);
                  setAmount(
                    e.target.value * details.market_data.current_price.usd
                  );
                  const CurrentPrice = Math.ceil(
                    e.target.value * details.market_data.current_price.usd
                  );
                  const Investment = Math.ceil(e.target.value * wallet.price);

                  if (Investment < CurrentPrice) {
                    setProfit(CurrentPrice - Investment);
                  } else {
                    setLoss(CurrentPrice - Investment);
                  }
                }}
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
              justifyContent: "center",
              width: 533,
              margin: "0 auto"
            }}
          >
            {amount === 0 ? " " : usd.format(amount)}
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
