import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MaterialTable from "material-table";
import { makeStyles, createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Axios from "axios";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import Wallet from "../assets/images/wallet.png";
import Com from "../assets/images/commerce.png";
import Buy from "../assets/images/buy.png";

const useStyles = makeStyles(theme => ({
   root: {
      flexGrow: 1
   },
   menuButton: {
      marginRight: theme.spacing(2)
   },
   title: {
      textAlign: "left"
   },
   list: {
      width: 250
   },
   fullList: {
      width: "auto"
   },
   widge: {
      display: "flex"
   },
   table: {
      width: "75%",
      height: "50vh",
      margin: "0 auto",
      marginTop: "35vh",
      overflow: "auto"
   },
   green: {
      color: "green"
   },
   red: {
      color: "red"
   }
}));

const theme = createMuiTheme({
   palette: {
      primary: { main: "#4e2072" }
   }
});

export default function InvestmentTracking() {
   const classes = useStyles();
   const [data, setData] = React.useState([]);
   const [trans, setTrans] = React.useState([]);
   const [buyLength, setBuyLength] = React.useState(0);
   const [sellLength, setSellLength] = React.useState(0);
   const [img, setImg] = React.useState([]);
   const [balance, setBalance] = React.useState([]);
   const [symbol, setSymbol] = React.useState([]);
   const [totalProfit, setTotalProfit] = React.useState(0);

   let { id } = useParams();

   let totalpl = 0;
   let pl;

   useEffect(() => {
      Axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then(response => {
         setData(response.data.name + "'s Transaction History");
         setImg(response.data.image.thumb);
         setSymbol(response.data.symbol);
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
            else {
               initBalance -= newVal.coinQuantity;
               pl = (newVal.profitOrLoss / 100) * newVal.buyPrice * newVal.coinQuantity;
               if (pl > -1) {
                  totalpl += pl;
               } else {
                  totalpl -= pl;
               }
            }
         });
         setBalance(initBalance);
         setTotalProfit(totalpl);

         setTrans(
            response.data.filter(val => {
               val.timestamp = new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit"
               }).format(val.timestamp);
               return val.coinID === id;
            })
         );
         setBuyLength(
            response.data.filter(val => {
               return val.coinID === id && val.transaction === "buy";
            }).length
         );
         setSellLength(
            response.data.filter(val => {
               return val.coinID === id && val.transaction === "sell";
            }).length
         );
      });
   }, [id]);

   const [state, setState] = React.useState({
      left: false
   });

   const toggleDrawer = (side, open) => event => {
      if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
         return;
      }

      setState({ ...state, [side]: open });
   };

   const sideList = side => (
      <div
         className={classes.list}
         role="presentation"
         onClick={toggleDrawer(side, false)}
         onKeyDown={toggleDrawer(side, false)}
      >
         <List>
            <ListItem button>
               <ListItemIcon>
                  <HomeIcon />
               </ListItemIcon>
               <Link to="/">
                  <ListItemText primary={"Home"} style={{ color: "black" }} />
               </Link>
            </ListItem>
         </List>
         <Divider />
         <List>
            <ListItem button>
               <ListItemIcon>
                  <TrackChangesIcon />
               </ListItemIcon>
               <Link to="/transaction-history">
                  <ListItemText
                     primary={"Transaction History"}
                     style={{ color: "black" }}
                  />
               </Link>
            </ListItem>
         </List>
      </div>
   );

   return (
      <div className={classes.root}>
         <AppBar
            position="static"
            style={{
               background: "linear-gradient(to left, #172c66 0%, #6a407f 42%)"
            }}
         >
            <Toolbar>
               <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  onClick={toggleDrawer("left", true)}
                  aria-label="menu"
               >
                  <MenuIcon />
               </IconButton>
               <Typography variant="h6" className={classes.title}>
                  {data}
                  <Link to={`/coin-details/${id}`}>
                     <img src={img} alt="" style={{ marginLeft: "5px" }} />
                  </Link>
               </Typography>
            </Toolbar>
         </AppBar>
         <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
            {sideList("left")}
         </Drawer>
         <div className={classes.widge}>
            <article className="widget">
               <div className="weatherIcon">
                  <h1>
                     {Math.round(balance * 1000) / 1000}
                     <span style={{ paddingLeft: "10px", fontSize: "28px" }}>
                        {symbol}
                     </span>
                  </h1>
               </div>
               <div className="weatherInfo">
                  <div className="description">
                     <div className="weatherCondition">Coin Wallet</div>
                  </div>
               </div>
               <div className="date">
                  <img src={Wallet} style={{ width: "3vw" }} alt="" />
               </div>
            </article>

            <article className="widget1">
               <div className="weatherIcon">
                  <h1>${Math.round(totalProfit * 1000) / 1000}</h1>
               </div>
               <div className="weatherInfo">
                  <div className="weatherCondition" style={{ paddingLeft: "25px" }}>
                     Total Profit/Loss
                  </div>
               </div>
               <div className="date">
                  <img src={Com} style={{ width: "3vw" }} alt="" />
               </div>
            </article>

            <article className="widget2">
               <div className="weatherIcon">
                  <h1>{buyLength + +sellLength}</h1>
               </div>
               <div className="weatherInfo">
                  <div className="weatherCondition" style={{ paddingLeft: "25px" }}>
                     Total Transactions
                  </div>
               </div>
               <div className="date">
                  <img src={Buy} style={{ width: "3vw" }} alt="" />
               </div>
            </article>
         </div>
         <div className={classes.table}>
            <MaterialTable
               title="Transactions"
               columns={[
                  {
                     title: "Date",
                     render: rowData => (
                        <span style={{ textTransform: "uppercase" }}>
                           {rowData.timestamp}
                        </span>
                     )
                  },
                  {
                     title: "Average Price",
                     render: rowData => (
                        <span>${Math.round(rowData.currentCoinPrice * 100) / 100}</span>
                     ),
                     type: "numeric"
                  },
                  {
                     title: "Coin Quantity",
                     render: rowData => (
                        <span>{Math.round(rowData.coinQuantity * 1000) / 1000}</span>
                     ),
                     type: "numeric"
                  },
                  {
                     title: "Total Payment / Earnings",
                     render: rowData => (
                        <span>${Math.round(rowData.totalAmount * 1000) / 1000}</span>
                     ),
                     type: "numeric"
                  },
                  {
                     title: "Transaction",
                     render: rowData => (
                        <Link to={`/transaction/${id}`}>
                           <span>
                              {rowData.transaction === "buy" ? (
                                 <p
                                    style={{
                                       textTransform: "uppercase",
                                       color: "purple"
                                    }}
                                 >
                                    {" "}
                                    {rowData.transaction}
                                 </p>
                              ) : (
                                 <p
                                    style={{
                                       textTransform: "uppercase",
                                       color: "blue"
                                    }}
                                 >
                                    {rowData.transaction}
                                 </p>
                              )}
                           </span>
                        </Link>
                     )
                  },
                  {
                     title: "% Profit or Loss",
                     type: "numeric",
                     render: rowData =>
                        rowData.profitOrLoss || rowData.profitOrLoss === 0 ? (
                           <MuiThemeProvider theme={theme}>
                              <Typography
                                 style={{
                                    fontSize: "16px"
                                 }}
                                 color={rowData.profitOrLoss < 0 ? "error" : "primary"}
                              >
                                 <b>{Math.round(rowData.profitOrLoss * 1000) / 1000} %</b>
                              </Typography>
                           </MuiThemeProvider>
                        ) : (
                           <Typography variant="h6">------</Typography>
                        )
                  },
                  {
                     title: "Profit or Loss",
                     type: "numeric",
                     render: rowData =>
                        rowData.buyPrice || rowData.buyPrice === 0 ? (
                           <MuiThemeProvider theme={theme}>
                              <Typography
                                 style={{
                                    fontSize: "16px"
                                 }}
                                 color={
                                    (rowData.profitOrLoss / 100) *
                                       rowData.buyPrice *
                                       rowData.coinQuantity <
                                    0
                                       ? "error"
                                       : "primary"
                                 }
                              >
                                 <b>
                                    $
                                    {Math.round(
                                       (rowData.profitOrLoss / 100) *
                                          rowData.buyPrice *
                                          rowData.coinQuantity *
                                          1000
                                    ) / 1000}
                                 </b>
                              </Typography>
                           </MuiThemeProvider>
                        ) : (
                           <Typography variant="h6">------</Typography>
                        )
                  }
               ]}
               data={trans}
               options={{
                  paging: false,
                  search: false
               }}
            />
         </div>
      </div>
   );
}
