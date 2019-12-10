import React, { useEffect } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import CircularProgress from "@material-ui/core/CircularProgress";
import shop from "../assets/images/shop.png";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
   root: {
      width: "40%",
      overflow: "auto",
      marginLeft: "5vw",
      marginTop: "3vh"
   },
   table: {
      minWidth: 650
   },
   paper: {
      width: "40%",
      marginTop: "7vh",
      height: "5vh",
      overflow: "auto",
      marginLeft: "5vw",
      background: "linear-gradient(to left, #172c66 0%, #6a407f 42%)",
      display: "flex"
   },
   back: {
      textAlign: "left",
      paddingLeft: "20px",
      color: "white",
      paddingTop: "13px",

      "&:hover": {
         color: "black"
      }
   },

   coinName: {
      fontSize: "50px",
      marginTop: "5vh",
      height: "10vh",
      background: "linear-gradient(to left, #172c66 0%, #6a407f 42%)",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
   },
   img: {
      width: "4vw"
   },
   breadlist: {
      color: "#a5a5a5",
      "&:hover": {
         color: "white"
      }
   },
   buysell: {
      background: "white",
      width: "29%",
      height: "34vh",
      margin: "3vh 2vw 2vh -1vw"
   },
   bs: {
      background: "white",
      width: "10%",
      height: "34vh",
      margin: "3vh 2vw 2vh 5vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
   },
   button: {
      width: "5vw"
   },
   buy: {
      marginTop: "0.5vh",
      background: "#2f2871bf",
      color: "white",
      padding: "2px",
      width: "5vw"
   },
   sell: {
      marginTop: "0.5vh",
      background: "#592a8abf",
      color: "white",
      padding: "2px",
      width: "5vw"
   },
   link: {
      color: "white",
      cursor: "default",
      display: "flex",
      alignItems: "center"
   },
   shop: {
      width: "25px",
      paddingRight: "10px"
   },
   div: {
      marginTop: "3vh",
      marginBottom: "1vh"
   },
   div1: {
      marginTop: "1vh",
      marginBottom: "4vh"
   }
}));

export default function AcccessibleTable() {
   const classes = useStyles();
   const [data, setData] = React.useState([]);
   const [image, setImage] = React.useState([]);
   const [load, setLoad] = React.useState(false);
   const [price, setPrice] = React.useState([]);

   let { id } = useParams();

   useEffect(() => {
      setLoad(true);
      Axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then(response => {
         setData(response.data);
         setImage(response.data.image);
         setPrice(response.data.market_data.current_price);
         setLoad(false);
         console.log(response.data);
      });
   }, [id]);

   return (
      <div>
         <Paper className={classes.papel}>
            {load ? (
               <Typography className={classes.coinName}>
                  <CircularProgress disableShrink color="secondary" />
               </Typography>
            ) : (
               <Typography className={classes.coinName}>
                  <img className={classes.img} src={image.large} alt="logo" />
                  <span style={{ marginLeft: "10px" }}>{data.name}</span>
               </Typography>
            )}
         </Paper>

         <Paper className={classes.paper}>
            <Breadcrumbs aria-label="breadcrumb" className={classes.back} separator={<NavigateNextIcon fontSize="small" />}>
               <Link className={classes.breadlist} to="/">
                  Home
               </Link>

               <Link aria-current="page" className={classes.breadlist} to={`/coin-details/${id}`}>
                  {data.name} Details
               </Link>

               <Link aria-current="page" className={classes.link}>
                  <img src={shop} className={classes.shop} />
                  <span>Buy / Sell {data.name} </span>
               </Link>
            </Breadcrumbs>
         </Paper>
         <div style={{ display: "flex" }}>
            <Paper className={classes.bs}>
               <Typography style={{ fontSize: "18px", marginTop: "2vh", padding: "3px" }}>
                  {" "}
                  Buy <b>{data.name}</b>
               </Typography>
               <div style={{ background: "lightgray", padding: "3px", borderRadius: "20px" }}>
                  <p>
                     Current Price: <b>${Math.round(price.usd * 100) / 100}</b>
                  </p>
               </div>

               <div className={classes.div}>
                  <Typography>BTC Balance:</Typography>
                  <Typography className={classes.buy}>$0.00</Typography>
               </div>

               <div className={classes.div1}>
                  <Typography>Total:</Typography>
                  <Typography className={classes.buy}>$0.00</Typography>
               </div>

               <Button variant="contained" color="primary" className={classes.button}>
                  BUY
               </Button>
            </Paper>
            <Paper className={classes.buysell} style={{ background: "#2f2871" }}></Paper>
         </div>

         <div style={{ display: "flex", marginTop: "-3vh" }}>
            <Paper className={classes.bs}>
               <Typography style={{ fontSize: "18px", marginTop: "2vh", padding: "3px" }}>
                  {" "}
                  Sell <b>{data.name}</b>
               </Typography>
               <div className={classes.div}>
                  <Typography>Price:</Typography>
                  <Typography className={classes.sell}>$0.00</Typography>
               </div>

               <div className={classes.div1}>
                  <Typography>Total:</Typography>
                  <Typography className={classes.sell}>$0.00</Typography>
               </div>

               <Button variant="contained" style={{ background: "#592a8a", color: "white" }} className={classes.button}>
                  SELL
               </Button>
            </Paper>
            <Paper className={classes.buysell} style={{ background: "#592a8a" }}></Paper>
         </div>
      </div>
   );
}
