import React, { useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grow from "@material-ui/core/Grow";
import SellSuccess from "./SellSuccess";

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
   const [profitOrLoss, setProfitOrLoss] = React.useState(0);

   let { id } = useParams();

   useEffect(() => {
      Axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
         .then(response => {
            setData(response.data);
            setPrice(response.data.market_data.current_price);
            setSymbol(response.data.symbol);
            setImage(response.data.image.small);
            setName(response.data.id);
            console.log(response.data);
            return Axios.get(`http://localhost:4000/transactions?coinID=${id}`);
         })
         .then(response => {
            let aCurrentCointPrice = 0;
            let count = 0;
            var stat = true;
            var statChecker = true;
            let array = response.data.reverse();
            array.map((x, i) => {
               if (x.transaction === "buy" && stat) {
                  statChecker = false;
                  aCurrentCointPrice += x.currentCoinPrice;
                  count++;
               } else if (x.transaction === "sell") {
                  if (!statChecker) {
                     stat = false;
                  }
               }
               return x;
            });
            console.log(price, aCurrentCointPrice, count);
            console.log(
               ((price.usd - aCurrentCointPrice / count) / (aCurrentCointPrice / count)) *
                  100
            );
            setProfitOrLoss(
               ((price.usd - aCurrentCointPrice / count) / (aCurrentCointPrice / count)) *
                  100
            );
         });
   }, [id, price.usd]);

   const succ = value => {
      setDone(value);
   };

   const confirm = () => {
      if (props.sellQuantity !== "0" && props.sellQuantity !== 0) {
         Axios.post("http://localhost:4000/transactions", {
            coinID: id,
            name: name,
            coin: symbol,
            coinQuantity: props.sellQuantity,
            amount: props.sellQuantity * price.usd,
            totalAmount: props.sellQuantity * price.usd,
            image: image,
            currentCoinPrice: price.usd,
            transaction: "sell",
            timestamp: new Date().getTime(),
            profitOrLoss: profitOrLoss
         }).catch(error => {
            console.log(error.response.data);
         });
         setDone(true);
      }
   };

   if (done) {
      return (
         <SellSuccess
            buyMore={succ}
            confirmSell={props.can}
            handleDisplay={props.handleDisplay}
         />
      );
   }

   const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
   });

   const circulatingFormat = num => {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
   };

   const handleFunc = () => {
      props.can(false);
      props.handleDisplay(true);
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
                  YOU ARE SELLING
               </p>
               <Typography
                  style={{
                     fontSize: "48px",
                     color: "rgb(105, 63, 126)"
                  }}
               >
                  {Math.round(props.sellQuantity * 1000) / 1000}{" "}
                  <span style={{ textTransform: "uppercase" }}>{symbol}</span>
               </Typography>
               <p style={{ color: "gray" }}>
                  @ ${Math.round(price.usd * 10000) / 10000} per{" "}
                  <span style={{ textTransform: "uppercase" }}>{symbol}</span>
               </p>
               <hr style={{ border: "1px solid gray", width: "20vw" }} />
               <p>
                  <div
                     style={{
                        marginTop: "0 auto"
                     }}
                  >
                     <p>Earnings:</p>
                     <p
                        style={{
                           fontSize: "18px",
                           fontWeight: "bold",
                           marginBottom: "15px"
                        }}
                     >
                        {circulatingFormat(
                           formatter.format(props.sellQuantity * price.usd)
                        )}
                     </p>
                  </div>
               </p>
               <hr style={{ border: "1px solid gray", width: "20vw" }} />
               <div
                  style={{
                     textAlign: "justify",
                     marginLeft: "7.5vw"
                  }}
               >
                  <p>
                     New
                     <span
                        style={{
                           textTransform: "uppercase",
                           paddingRight: "2px",
                           paddingLeft: "2px"
                        }}
                     >
                        {symbol}
                     </span>
                     Balance
                     <span style={{ letterSpacing: "7px" }}>..................</span>
                     {Math.round(props.coinDiff * 10000) / 10000}
                  </p>

                  <p
                     style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "rgb(105, 63, 126)"
                     }}
                  >
                     Total Earnings
                     <span style={{ letterSpacing: "7px" }}>..................</span>
                     {circulatingFormat(formatter.format(props.sellQuantity * price.usd))}
                  </p>
               </div>
            </div>

            <div
               className={classes.confirm}
               style={{
                  height: "14.2vh",
                  width: "25vw",
                  margin: "2vh auto"
               }}
            >
               <Button
                  variant="contained"
                  color="primary"
                  style={{
                     width: "10vw",
                     height: "5vh",
                     marginTop: "3vh"
                  }}
                  onClick={confirm}
               >
                  Confirm Sell
               </Button>
               <p className={classes.cancel} onClick={handleFunc}>
                  Cancel Transaction
               </p>
            </div>
         </div>
      </Grow>
   );
}
