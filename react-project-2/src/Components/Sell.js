import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import TextField from "@material-ui/core/TextField";
import pic from "../assets/images/im.jpg";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles(theme => ({
   buysell: {
      width: "21vw",
      height: "29vh",
      margin: "0vh 0vw 0vh 0.5vw",
      zIndex: 3000
   },
   bs: {
      background: "#342b7e4f",
      width: "7vw",
      height: "40vh",
      marginLeft: "1vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
   },
   button: {
      width: "5vw",
      marginTop: "1vh",
      background: "#695dcb",
      color: "white"
   },
   buy: {
      marginTop: "0.5vh",
      background: "#342b7ebf",
      color: "white",
      padding: "2px",
      width: "5vw",
      overflow: "auto"
   },
   div: {
      marginTop: "2vh",
      marginBottom: "0vh"
   },
   name: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "1vh",
      width: "30vw",
      background: "#342b7e",
      color: "white",
      textAlign: "center",
      padding: "4px",
      borderRadius: "20px"
   },
   payment: {
      display: "flex",
      alignItems: "center",
      marginTop: "3vh"
   },
   account: {
      background: "#342b7e",
      color: "white",
      padding: "5px",
      borderRadius: "20px"
   },
   hr: {
      border: "1px solid #342b7e",
      width: "29vw",
      marginTop: "1vh"
   },
   textfield: {
      background: "white",
      width: "22vw",
      marginTop: "0.7vh",
      height: "0.5vh"
   }
}));

export default function AcccessibleTable(props) {
   const classes = useStyles();
   const [data, setData] = React.useState([]);
   const [image, setImage] = React.useState([]);
   const [price, setPrice] = React.useState([]);
   const [symbol, setSymbol] = React.useState([]);
   const [balance, setBalance] = React.useState([]);
   const [amount, setAmount] = useState("");
   const [earn, setEarn] = useState("");
   const [error, setError] = useState(false);

   let { id } = useParams();

   useEffect(() => {
      Axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then(response => {
         setData(response.data);
         setImage(response.data.image);
         setPrice(response.data.market_data.current_price);
         setSymbol(response.data.symbol);
         console.log(response.data);
      });
   }, [id]);

   useEffect(() => {
      Axios.get(`http://localhost:4000/transactions`).then(response => {
         let initBalance = 0;
         let fArray = response.data.filter(val => {
            return val.coinID === id;
         });
         fArray.forEach(newVal => {
            console.log(newVal.coinQuantity);
            if (newVal.transaction === "buy") initBalance += newVal.coinQuantity;
            else initBalance -= newVal.coinQuantity;
         });
         setBalance(initBalance);
      });
   }, [id]);

   const circulatingFormat = num => {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
   };

   const handleBuy = () => {
      props.confirmSell(true);
      props.handleDisplay(false);
   };

   return (
      <Fade in>
         <div>
            <div className={classes.name}>
               <Typography style={{ fontSize: "18px" }}>
                  Sell <b>{data.name}</b>
               </Typography>
            </div>
            <p>
               Current Price:{" "}
               <b
                  style={{
                     fontSize: "18px",
                     textDecoration: "underline",
                     color: "#342b7e"
                  }}
               >
                  ${!price.usd ? "0.00" : Math.round(price.usd * 1000) / 1000}
               </b>
            </p>

            <div className={classes.payment}>
               <b>
                  <p style={{ fontSize: "16px" }}>
                     Current{" "}
                     <span
                        style={{
                           textTransform: "Capitalize",
                           paddingRight: "3px",
                           color: "purple"
                        }}
                     >
                        {data.name}
                     </span>
                     Balance
                  </p>
               </b>
            </div>
            <Typography
               style={{
                  marginTop: "1vh",
                  display: "flex",
                  alignItems: "center",
                  padding: "5px",
                  paddingLeft: "2vw"
               }}
            >
               <AccountBalanceWalletIcon className={classes.account} />{" "}
               <span style={{ paddingLeft: "5px" }}>
                  {balance}
                  <span style={{ paddingLeft: "2px", textTransform: "uppercase" }}>
                     {symbol}
                  </span>
               </span>
            </Typography>
            <hr className={classes.hr} />

            <div style={{ display: "flex" }}>
               <div className={classes.bs}>
                  <img src={image.small} style={{ marginTop: "2vh" }} alt="coin" />
                  <h3 style={{ textTransform: "uppercase" }}>{symbol}</h3>
                  <p>
                     <span style={{ textTransform: "uppercase" }}>
                        {symbol} = {Math.round(price.usd * 10000) / 10000}
                     </span>
                  </p>

                  <div className={classes.div} style={{ marginBottom: "0vh" }}>
                     <Typography>
                        <span style={{ textTransform: "uppercase" }}>{data.symbol} </span>
                        Quantity:
                     </Typography>
                     <Typography className={classes.buy}>
                        {Math.round(amount * 1000) / 1000}
                     </Typography>
                  </div>

                  <div className={classes.div} style={{ marginBottom: "2vh" }}>
                     <Typography>Total Earnings:</Typography>
                     <Typography className={classes.buy}>
                        ${circulatingFormat(Math.round(earn * 1000) / 1000)}
                     </Typography>
                  </div>

                  <Button
                     variant="contained"
                     className={classes.button}
                     onClick={handleBuy}
                  >
                     SELL
                  </Button>
               </div>
               <p
                  style={{
                     position: "absolute",
                     left: "22vw",
                     zIndex: 3000,
                     fontSize: "12px"
                  }}
               >
                  Quantity:
               </p>
               <div className={classes.buysell}>
                  <div
                     className={classes.buysell}
                     style={{
                        height: "6vh",
                        marginBottom: "3vh",
                        marginTop: "2vh",
                        background: "white",
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "center"
                     }}
                  >
                     <TextField
                        id="outlined-number"
                        ant="outlined"
                        type="number"
                        error={error}
                        helperText={error ? "Not enough balance" : ""}
                        className={classes.textfield}
                        value={amount}
                        variant="outlined"
                        onChange={e => {
                           if (e.target.value > balance) {
                              setError(true);
                           } else {
                              setAmount(e.target.value);
                              props.handleSellQuantity(e.target.value);
                              props.handleCoinDifference(balance - e.target.value);
                              setEarn(e.target.value * price.usd);
                              setError(false);
                           }
                        }}
                        InputProps={{
                           endAdornment: (
                              <InputAdornment position="start">{symbol}</InputAdornment>
                           )
                        }}
                     />
                  </div>

                  <img src={pic} className={classes.buysell} />
               </div>
            </div>
         </div>
      </Fade>
   );
}
