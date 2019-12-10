import React, { useEffect, useState } from "react";
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
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import TextField from "@material-ui/core/TextField";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";

function TabPanel(props) {
   const { children, value, index, ...other } = props;

   return (
      <Typography
         component="div"
         role="tabpanel"
         hidden={value !== index}
         id={`vertical-tabpanel-${index}`}
         aria-labelledby={`vertical-tab-${index}`}
         {...other}
      >
         {value === index && <Box p={3}>{children}</Box>}
      </Typography>
   );
}

TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.any.isRequired,
   value: PropTypes.any.isRequired
};

function a11yProps(index) {
   return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`
   };
}

const useStyles = makeStyles(theme => ({
   root: {
      width: "40%",
      overflow: "auto",
      marginLeft: "5vw",
      marginTop: "3vh",
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: "flex",
      height: 650
   },
   table: {
      minWidth: 650
   },
   tabs: {
      borderRight: `1px solid ${theme.palette.divider}`
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
      width: "100%",
      height: "24vh",
      margin: "0vh 0vw 0vh 0.5vw",
      zIndex: 3000
   },
   bs: {
      background: "#9f8ca94f",
      width: "10vw",
      height: "34vh",
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
   },
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

export default function AcccessibleTable() {
   const classes = useStyles();
   const [data, setData] = React.useState([]);
   const [image, setImage] = React.useState([]);
   const [load, setLoad] = React.useState(false);
   const [price, setPrice] = React.useState([]);
   const [symbol, setSymbol] = React.useState([]);
   const [confirm, setConfirm] = React.useState(true);
   const [coin, setCoin] = useState(0);
   const [amount, setAmount] = useState(0);

   const [value, setValue] = React.useState(0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   let { id } = useParams();

   useEffect(() => {
      setLoad(true);
      Axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then(response => {
         setData(response.data);
         setImage(response.data.image);
         setPrice(response.data.market_data.current_price);
         setSymbol(response.data.symbol);
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
         <div className={classes.con}>
            <div className={classes.confirm}>
               <p style={{ paddingTop: "5vh", letterSpacing: "8px", color: "gray" }}>YOU ARE BUYING</p>
               <Typography style={{ fontSize: "48px", color: "rgb(105, 63, 126)" }}>
                  $ 0.00 <span style={{ textTransform: "uppercase" }}>{symbol}</span>
               </Typography>
               <p style={{ color: "gray" }}>
                  @ ${price.usd} per <span style={{ textTransform: "uppercase" }}>{symbol}</span>
               </p>
               <hr style={{ border: "1px solid gray", width: "20vw" }} />
               <p style={{ display: "flex", alignItems: "center", marginLeft: "5vw" }}>
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
                  <div style={{ display: "flex", flexDirection: "column", marginTop: "0px" }}>
                     <p>Payment Method</p>
                     <p style={{ fontSize: "18px", fontWeight: "bold", marginLeft: "7px" }}>Bank Account</p>
                  </div>
               </p>
               <hr style={{ border: "1px solid gray", width: "20vw" }} />
               <div style={{ textAlign: "justify", marginLeft: "7.5vw" }}>
                  <p>
                     0.000 <span style={{ textTransform: "uppercase" }}>{symbol}</span>{" "}
                     <span style={{ letterSpacing: "7px" }}>...................</span> $ 0.00
                  </p>
                  <p>
                     Coinbase fee <span style={{ textTransform: "uppercase" }}>{symbol}</span>{" "}
                     <span style={{ letterSpacing: "7px" }}>...................</span> $ 0.00
                  </p>
                  <p style={{ fontSize: "16px", fontWeight: "bold", color: "rgb(105, 63, 126)" }}>
                     Total <span style={{ textTransform: "uppercase" }}>{symbol}</span>{" "}
                     <span style={{ letterSpacing: "7px" }}>...................</span> $ 0.00
                  </p>
               </div>
            </div>

            <div className={classes.confirm} style={{ height: "14.2vh", width: "25vw", margin: "2vh auto" }}>
               <Button variant="contained" color="primary" style={{ width: "10vw", height: "5vh", marginTop: "3vh" }}>
                  Confirm Buy
               </Button>
               <p className={classes.cancel}>Cancel Transaction</p>
            </div>
         </div>

         <div className={classes.root}>
            <Tabs
               orientation="vertical"
               variant="scrollable"
               value={value}
               onChange={handleChange}
               aria-label="Vertical tabs example"
               className={classes.tabs}
            >
               <Tab label="BUY" {...a11yProps(0)} />
               <Tab label="SELL" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
               <div className={classes.name}>
                  <Typography style={{ fontSize: "18px" }}>
                     Buy <b>{data.name}</b>
                  </Typography>
               </div>
               <p>
                  Current Price:{" "}
                  <b style={{ fontSize: "18px", textDecoration: "underline", color: "#6a407f" }}>
                     ${Math.round(price.usd * 100) / 100}
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
                  <AccountBalanceIcon className={classes.account} /> <span style={{ paddingLeft: "5px" }}>Bank Account</span>
               </Typography>
               <hr className={classes.hr} />

               <div style={{ display: "flex" }}>
                  <div className={classes.bs}>
                     <img src={image.small} style={{ marginTop: "3vh" }} />
                     <h3 style={{ textTransform: "uppercase" }}>{symbol}</h3>
                     <p>
                        1{" "}
                        <span style={{ textTransform: "uppercase" }}>
                           {symbol} = {price.usd}
                        </span>
                     </p>
                     <div className={classes.div} style={{ marginBottom: "2vh" }}>
                        <Typography>Total:</Typography>
                        <Typography className={classes.buy}>${Math.round(amount * 1000) / 1000}</Typography>
                     </div>

                     <Button variant="contained" color="primary" className={classes.button}>
                        BUY
                     </Button>
                  </div>
                  <p style={{ position: "absolute", left: "22vw", zIndex: 3000, fontSize: "12px" }}>Amount:</p>
                  <div className={classes.buysell}>
                     <Paper
                        className={classes.buysell}
                        style={{
                           background: "#2f2871bf",
                           height: "6vh",
                           marginBottom: "1vh",
                           marginTop: "3vh",
                           background: "white",
                           display: "flex",
                           alignItems: "baseline",
                           justifyContent: "center"
                        }}
                     >
                        <TextField
                           id="outlined-number"
                           label="usd"
                           type="number"
                           ant="outlined"
                           style={{ width: "8vw" }}
                           value={coin}
                           onChange={e => {
                              setAmount(e.target.value / price.usd);
                              setCoin(e.target.value);
                           }}
                        />
                        <SwapHorizIcon style={{ marginLeft: "20px", marginRight: "20px" }} />
                        <TextField
                           id="outlined-number"
                           label={symbol}
                           ant="outlined"
                           type="number"
                           style={{ width: "8vw", margin: "2vw, 2vw, 2vw, 2vw" }}
                           value={amount}
                           onChange={e => {
                              setCoin(e.target.value * price.usd);
                              setAmount(e.target.value);
                           }}
                        />
                     </Paper>
                     <Paper className={classes.buysell} style={{ background: "#693f7e", color: "white" }}>
                        <p style={{ paddingTop: "5vh", letterSpacing: "8px", color: "#bdaaaa" }}>YOU ARE BUYING</p>
                        <Typography style={{ fontSize: "36px" }}>
                           ${Math.round(amount * 10000) / 10000} <span style={{ textTransform: "uppercase" }}>{symbol}</span>
                        </Typography>
                        <p style={{ color: "#bdaaaa" }}>
                           @ ${price.usd} per <span style={{ textTransform: "uppercase" }}>{symbol}</span>
                        </p>
                        <hr style={{ border: "1px solid white" }} />
                     </Paper>
                  </div>
               </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
               Item Two
            </TabPanel>
         </div>
      </div>
   );
}
