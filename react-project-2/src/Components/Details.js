import React, { useEffect } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import ReactHtmlParser from "react-html-parser";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import TabsC from "./Tabs";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";

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
   newPaper: {
      width: "40%",
      height: "35vh",
      marginLeft: "5vw",
      marginTop: "4vh",
      overflowY: "auto"
   },
   desc: {
      textAlign: "justify",
      padding: "30px",
      fontSize: "13px",
      paddingTop: "10px",
      textIndent: "50px"
   },
   breadlist: {
      color: "#a5a5a5",
      "&:hover": {
         color: "white"
      }
   },
   year: {
      width: "40vw",
      height: "50vh",
      position: "absolute",
      top: "35vh",
      right: "10vw",
      background: "#162c64e8"
   },
   lineChart: {
      position: "absolute"
   }
}));

export default function AcccessibleTable() {
   const classes = useStyles();
   const [data, setData] = React.useState([]);
   const [image, setImage] = React.useState([]);
   const [market, setMarket] = React.useState([]);
   const [price, setPrice] = React.useState([]);
   const [mCap, setMCap] = React.useState([]);
   const [description, setDescription] = React.useState([]);
   const [load, setLoad] = React.useState(false);

   let { id } = useParams();

   useEffect(() => {
      setLoad(true);
      Axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then(
         response => {
            setData(response.data);
            setImage(response.data.image);
            setMarket(response.data.market_data);
            setPrice(response.data.market_data.current_price);
            setMCap(response.data.market_data.market_cap);
            setDescription(response.data.description);
            setLoad(false);
            console.log(response.data);
         }
      );
   }, [id]);

   const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
   });

   const circulatingFormat = num => {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
   };

   return (
      <div>
         <TabsC className={classes.lineChart} />

         <Paper className={classes.papel}>
            {load ? (
               <Typography className={classes.coinName}>
                  <CircularProgress disableShrink color="secondary" />
               </Typography>
            ) : (
               <Typography className={classes.coinName}>
                  <img className={classes.img} src={image.large} alt="coin" />
                  <span style={{ marginLeft: "10px" }}>{data.name}</span>
               </Typography>
            )}
         </Paper>

         <Paper className={classes.paper}>
            <Breadcrumbs
               aria-label="breadcrumb"
               className={classes.back}
               separator={<NavigateNextIcon fontSize="small" />}
            >
               <Link className={classes.breadlist} to="/">
                  Home
               </Link>
               <Link
                  aria-current="page"
                  style={{ color: "white", cursor: "default" }}
               >
                  {data.name} Details
               </Link>
            </Breadcrumbs>
         </Paper>
         <Fade in>
            <Paper className={classes.newPaper}>
               <h3 style={{ textAlign: "left", padding: "30px  0px 0px 30px" }}>
                  Description:
               </h3>
               <Typography className={classes.desc}>
                  {ReactHtmlParser(description.en)}{" "}
                  {!description.en ? "No Description" : description.en}{" "}
               </Typography>
            </Paper>
         </Fade>

         <Paper className={classes.root}>
            <Table className={classes.table} aria-label="caption table">
               <TableHead>
                  <TableRow>
                     <TableCell>Rank</TableCell>
                     <TableCell>Name</TableCell>
                     <TableCell>Logo</TableCell>
                     <TableCell>Ticker</TableCell>
                     <TableCell>Price</TableCell>
                     <TableCell>Circulating Supply</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  <TableRow>
                     <TableCell>
                        {" "}
                        {!market.market_cap_rank
                           ? "None"
                           : market.market_cap_rank}{" "}
                     </TableCell>
                     <TableCell component="th" scope="row">
                        {data.name}
                     </TableCell>
                     <TableCell>
                        <img
                           style={{ width: "2vw" }}
                           src={image.large}
                           alt="coin-logo"
                        />
                     </TableCell>
                     <TableCell style={{ textTransform: "uppercase" }}>
                        {data.symbol}
                     </TableCell>
                     <TableCell>
                        <b style={{ fontSize: "15px" }}>
                           {!price.usd ? "0" : formatter.format(price.usd)}
                        </b>
                     </TableCell>
                     <TableCell>
                        {circulatingFormat(
                           Math.round(market.circulating_supply)
                        )}
                     </TableCell>
                  </TableRow>
               </TableBody>
            </Table>
         </Paper>
         <Paper className={classes.root} style={{ marginTop: "2vh" }}>
            <Table className={classes.table} aria-label="caption table">
               <TableHead>
                  <TableRow>
                     <TableCell>Last Updated</TableCell>
                     <TableCell>Mkt Cap</TableCell>
                     <TableCell>Mkt Cap Change (24h)</TableCell>
                     <TableCell>Mkt Cap Change Percentage (24h)</TableCell>

                     <TableCell>Price Change (24h)</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  <TableRow>
                     <TableCell>{data.last_updated}</TableCell>
                     <TableCell>
                        {!mCap.usd ? "0" : formatter.format(mCap.usd)}
                     </TableCell>
                     {market.market_cap_change_24h < 0 ? (
                        <TableCell style={{ color: "red" }}>
                           {formatter.format(market.market_cap_change_24h)}
                        </TableCell>
                     ) : (
                        <TableCell>
                           {formatter.format(market.market_cap_change_24h)}
                        </TableCell>
                     )}

                     {market.market_cap_change_percentage_24h < 0 ? (
                        <TableCell style={{ color: "red" }}>
                           {!market.market_cap_change_percentage_24h
                              ? "0"
                              : Math.round(
                                   market.market_cap_change_percentage_24h * 100
                                ) / 100}
                           %
                        </TableCell>
                     ) : (
                        <TableCell>
                           {!market.market_cap_change_percentage_24h
                              ? "0"
                              : Math.round(
                                   market.market_cap_change_percentage_24h * 100
                                ) / 100}
                           %
                        </TableCell>
                     )}

                     {market.price_change_24h < 0 ? (
                        <TableCell style={{ color: "red" }}>
                           {" "}
                           {formatter.format(market.price_change_24h)}
                        </TableCell>
                     ) : (
                        <TableCell>
                           {" "}
                           {formatter.format(market.price_change_24h)}}
                        </TableCell>
                     )}
                  </TableRow>
               </TableBody>
            </Table>
         </Paper>
      </div>
   );
}
