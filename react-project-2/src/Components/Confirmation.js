import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import Grow from "@material-ui/core/Grow";
import Success from "./Success";

const useStyles = makeStyles(theme => ({
   second: {
      width: "5vw",
      height: "4vh"
   },
   confirm: {
      width: "35vw",
      height: "50vh",
      background: "white",
      borderRadius: "10px"
   },
   con: {
      position: "absolute",
      marginTop: "3vh",
      right: "15vw"
   },
   cancel: {
      marginTop: "10px",
      cursor: "pointer",
      "&:hover": {
         color: "purple"
      }
   }
}));

export default function AcccessibleTable(props) {
   const classes = useStyles();
   const [data, setData] = React.useState([]);
   const [price, setPrice] = React.useState([]);
   const [symbol, setSymbol] = React.useState([]);
   const [done, setDone] = React.useState(false);
   const [image, setImage] = React.useState(false);
   const [name, setName] = React.useState(false);

   let { id } = useParams();

   useEffect(() => {
      Axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then(
         response => {
            setData(response.data);
            setPrice(response.data.market_data.current_price);
            setSymbol(response.data.symbol);
            setImage(response.data.image.small);
            setName(response.data.id);
            console.log(response.data);
         }
      );
   }, [id]);

   const succ = value => {
      setDone(value);
   };

   const confirm = () => {
      setDone(true);
      Axios.post("http://localhost:4000/transactions", {
         price: price.usd,
         name: name,
         coin: symbol,
         total: props.coin,
         image: image,
         transaction: "buy",
         timestamp: new Date().getTime()
      }).catch(error => {
         console.log(error.response.data);
      });
   };

   if (done) {
      return <Success buyMore={succ} confirmAct={props.can} />;
   }

   const circulatingFormat = num => {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
   };

   return (
      <Grow in>
         <div className={classes.con}>
            <div className={classes.confirm}>
               <p
                  style={{
                     paddingTop: "5vh",
                     letterSpacing: "8px",
                     color: "gray"
                  }}
               >
                  YOU ARE BUYING
               </p>
               <Typography
                  style={{ fontSize: "48px", color: "rgb(105, 63, 126)" }}
               >
                  {Math.round(props.amount * 1000) / 1000}{" "}
                  <span style={{ textTransform: "uppercase" }}>{symbol}</span>
               </Typography>
               <p style={{ color: "gray" }}>
                  @ ${Math.round(price.usd * 10000) / 10000} per{" "}
                  <span style={{ textTransform: "uppercase" }}>{symbol}</span>
               </p>
               <hr style={{ border: "1px solid gray", width: "20vw" }} />
               <p
                  style={{
                     display: "flex",
                     alignItems: "center",
                     marginLeft: "5vw"
                  }}
               >
                  <AccountBalanceIcon
                     style={{
                        marginRight: "10px",
                        width: "30px",
                        background: "gray",
                        height: "30px",
                        borderRadius: "20px",
                        padding: "5px"
                     }}
                  />
                  <div
                     style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "0px"
                     }}
                  >
                     <p>Payment Method</p>
                     <p
                        style={{
                           fontSize: "18px",
                           fontWeight: "bold",
                           marginLeft: "7px",
                           marginBottom: "15px"
                        }}
                     >
                        Bank Account
                     </p>
                  </div>
               </p>
               <hr style={{ border: "1px solid gray", width: "20vw" }} />
               <div style={{ textAlign: "justify", marginLeft: "7.5vw" }}>
                  <p>
                     {Math.round(props.amount * 1000) / 1000}
                     <span
                        style={{
                           textTransform: "uppercase",
                           paddingLeft: "2px"
                        }}
                     >
                        {symbol}
                     </span>
                     <span style={{ letterSpacing: "7px" }}>
                        ...........................
                     </span>
                     ${" "}
                     {circulatingFormat(
                        props.coin -
                           +((props.coin - +(props.coin * 0.01)) * 0.01)
                     )}
                  </p>
                  <p>
                     Transaction Fee (1%)
                     <span style={{ letterSpacing: "7px" }}>
                        .......................
                     </span>
                     ${" "}
                     {circulatingFormat(
                        Math.round(
                           (props.coin - +(props.coin * 0.01)) * 0.01 * 1000
                        ) / 1000
                     )}
                  </p>
                  <p
                     style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "rgb(105, 63, 126)"
                     }}
                  >
                     Total
                     <span style={{ letterSpacing: "7px" }}>
                        ...........................
                     </span>
                     ${circulatingFormat(props.coin)}
                  </p>
               </div>
            </div>

            <div
               className={classes.confirm}
               style={{ height: "14.2vh", width: "25vw", margin: "2vh auto" }}
            >
               <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "10vw", height: "5vh", marginTop: "3vh" }}
                  onClick={confirm}
               >
                  Confirm Buy
               </Button>
               <p className={classes.cancel} onClick={() => props.can(false)}>
                  Cancel Transaction
               </p>
            </div>
         </div>
      </Grow>
   );
}
