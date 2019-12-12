import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import TextField from "@material-ui/core/TextField";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import checkout from "../assets/images/crypt.jpg";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles(theme => ({
   buysell: {
      width: "21vw",
      height: "30vh",
      margin: "0vh 0vw 0vh 0.5vw",
      zIndex: 3000
   },
   bs: {
      background: "#9f8ca94f",
      width: "7vw",
      height: "40vh",
      marginLeft: "1vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
   },
   button: {
      width: "5vw",
      marginTop: "1vh"
   },
   buy: {
      marginTop: "0.5vh",
      background: "#2f2871bf",
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
      background: "#6a407f",
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
      background: "purple",
      color: "white",
      padding: "5px",
      borderRadius: "20px"
   },
   hr: {
      border: "1px solid purple",
      width: "29vw",
      marginTop: "1vh"
   },
   textfield: {
      background: "white",
      width: "8vw",
      marginTop: "2vh"
   }
}));

export default function AcccessibleTable(props) {
   const classes = useStyles();
   const [data, setData] = React.useState([]);
   const [image, setImage] = React.useState([]);
   const [price, setPrice] = React.useState([]);
   const [symbol, setSymbol] = React.useState([]);
   const [coin, setCoin] = useState("");
   const [amount, setAmount] = useState("");
   //    const [cancel, setCancel] = useState(false);

   let { id } = useParams();

   useEffect(() => {
      Axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then(
         response => {
            setData(response.data);
            setImage(response.data.image);
            setPrice(response.data.market_data.current_price);
            setSymbol(response.data.symbol);
            console.log(response.data);
         }
      );
   }, [id]);

   const circulatingFormat = num => {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
   };

   const handleBuy = () => {
      props.confirm(true);
      props.handleDisplay(false);
   };

   return (
      <Fade in>
         <div>
            <div className={classes.name}>
               <Typography style={{ fontSize: "18px" }}>
                  Buy <b>{data.name}</b>
               </Typography>
            </div>
            <p>
               Current Price:{" "}
               <b
                  style={{
                     fontSize: "18px",
                     textDecoration: "underline",
                     color: "#6a407f"
                  }}
               >
                  ${!price.usd ? "0.00" : Math.round(price.usd * 1000) / 1000}
               </b>
            </p>

            <div className={classes.payment}>
               <b>
                  <p style={{ fontSize: "16px" }}>Payment Method</p>
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
               <AccountBalanceIcon className={classes.account} />{" "}
               <span style={{ paddingLeft: "5px" }}>Bank Account</span>
            </Typography>
            <hr className={classes.hr} />

            <div style={{ display: "flex" }}>
               <div className={classes.bs}>
                  <img
                     src={image.small}
                     style={{ marginTop: "2vh" }}
                     alt="coin"
                  />
                  <h3 style={{ textTransform: "uppercase" }}>{symbol}</h3>
                  <p>
                     <span style={{ textTransform: "uppercase" }}>
                        {symbol} ={" "}
                        {circulatingFormat(
                           Math.round(price.usd * 10000) / 10000
                        )}
                     </span>
                  </p>

                  <div className={classes.div} style={{ marginBottom: "0vh" }}>
                     <Typography>
                        <span style={{ textTransform: "uppercase" }}>
                           {data.symbol}{" "}
                        </span>
                        Total:
                     </Typography>
                     <Typography className={classes.buy}>
                        {Math.round(amount * 1000) / 1000}
                     </Typography>
                  </div>

                  <div className={classes.div} style={{ marginBottom: "2vh" }}>
                     <Typography>Total:</Typography>
                     <Typography className={classes.buy}>
                        ${circulatingFormat(Math.round(coin * 1000) / 1000)}
                     </Typography>
                  </div>

                  <Button
                     variant="contained"
                     color="primary"
                     className={classes.button}
                     onClick={handleBuy}
                  >
                     BUY
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
                  Amount:
               </p>
               <div className={classes.buysell}>
                  <Paper
                     className={classes.buysell}
                     style={{
                        height: "6vh",
                        marginBottom: "2vh",
                        marginTop: "2vh",
                        background: "white",
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "center"
                     }}
                  >
                     <TextField
                        id="outlined-number"
                        type="number"
                        ant="outlined"
                        style={{ width: "8vw", paddingTop: "2vh" }}
                        value={coin}
                        onChange={e => {
                           if (e.target.value > -1) {
                              var net =
                                 +e.target.value -
                                 (+e.target.value + -e.target.value * 0.01) *
                                    0.01;
                              setAmount(net / price.usd);
                              setCoin(e.target.value);
                              props.amo(e.target.value);
                              props.handleAmount(net / price.usd);
                           }
                        }}
                        InputProps={{
                           startAdornment: (
                              <InputAdornment position="start">
                                 &#36;
                              </InputAdornment>
                           )
                        }}
                     />
                     <SwapHorizIcon
                        style={{ marginLeft: "20px", marginRight: "20px" }}
                     />
                     <TextField
                        id="outlined-number"
                        ant="outlined"
                        type="number"
                        style={{ width: "8vw", margin: "2vw, 2vw, 2vw, 2vw" }}
                        value={amount}
                        onChange={e => {
                           if (e.target.value > -1) {
                              setCoin(e.target.value * price.usd);
                              setAmount(e.target.value);
                              props.handleAmount(e.target.value);
                              props.amo(e.target.value * price.usd);
                           }
                        }}
                        InputProps={{
                           endAdornment: (
                              <InputAdornment position="start">
                                 {symbol}
                              </InputAdornment>
                           )
                        }}
                     />
                  </Paper>

                  <img src={checkout} className={classes.buysell} />
               </div>
            </div>
         </div>
      </Fade>
   );
}
