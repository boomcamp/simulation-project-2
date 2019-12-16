import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
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
import Buy from "../assets/images/buy.png";
import Sell from "../assets/images/sell.png";
import Com from "../assets/images/commerce.png";

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
      width: "80%",
      height: "50vh",
      margin: "0 auto",
      marginTop: "35vh",
      overflow: "auto"
   },
   image: {
      width: "2vw"
   },
   name: {
      textTransform: "uppercase",
      color: "black",
      "&:hover": {
         color: "purple",
         cursor: "pointer"
      }
   }
}));

export default function InvestmentTracking() {
   const classes = useStyles();
   const [data, setData] = React.useState([]);
   const [trans, setTrans] = React.useState([]);
   const [buyLength, setBuyLength] = React.useState(0);
   const [sellLength, setSellLength] = React.useState(0);
   let { id } = useParams();
   let coinList = {};
   const [coinLs, setCoinLs] = useState({});

   useEffect(() => {
      Axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then(response => {
         setData(response.data.name + "'s Transaction History");
      });
   }, [id]);

   useEffect(() => {
      Axios.get(`http://localhost:4000/transactions`).then(response => {
         let buyData = response.data.filter(data => data.transaction === "buy");
         let coins = [...buyData.map(el => el.coinID)].toString();
         const pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${coins}`);
         pricesWs.onmessage = function(msg) {
            Object.keys(JSON.parse(msg.data)).forEach(e => {
               coinList[e] = JSON.parse(msg.data)[`${e}`];
               setCoinLs(coinList);
               setTrans({ ...trans, data: buyData });
            });
         };
         setTrans(
            response.data.filter(val => {
               val.timestamp = new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit"
               }).format(val.timestamp);
               return val;
            })
         );
         setBuyLength(
            response.data.filter(val => {
               return val.transaction === "buy";
            }).length
         );
         setSellLength(
            response.data.filter(val => {
               return val.transaction === "sell";
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
                  Transaction History
               </Typography>
            </Toolbar>
         </AppBar>
         <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
            {sideList("left")}
         </Drawer>
         <div className={classes.widge}>
            <article className="widget">
               <div className="weatherIcon">
                  <h1>{buyLength}</h1>
               </div>
               <div className="weatherInfo">
                  <div className="temperature">
                     <img src={Com} style={{ width: "3vw" }} alt="" />
                  </div>
                  <div className="description">
                     <div className="weatherCondition">Total Transactions</div>
                  </div>
               </div>
               <div className="date">BUY</div>
            </article>

            <article className="widget1">
               <div className="weatherIcon">
                  <h1>{sellLength}</h1>
               </div>
               <div className="weatherInfo">
                  <div className="temperature">
                     <img src={Sell} style={{ width: "3vw" }} alt="" />
                  </div>
                  <div className="description">
                     <div className="weatherCondition">Total Transactions</div>
                  </div>
               </div>
               <div className="date">SELL</div>
            </article>

            <article className="widget2">
               <div className="weatherIcon">
                  <h1>{trans.length}</h1>
               </div>
               <div className="weatherInfo">
                  <div className="temperature">
                     <img src={Buy} style={{ width: "3vw" }} alt="" />
                  </div>
                  <div className="description">
                     <div className="weatherCondition">Total Transactions</div>
                  </div>
               </div>
               <div className="date">ALL</div>
            </article>
         </div>
         <div className={classes.table}>
            <MaterialTable
               title="All Transactions"
               columns={[
                  {
                     title: "Logo",
                     render: rowData => (
                        <Link to={`/coin-history/${rowData.coinID}`}>
                           <img src={rowData.image} className={classes.image} alt="" />
                        </Link>
                     )
                  },
                  {
                     title: "Coin",
                     render: rowData => (
                        <Link to={`/coin-history/${rowData.coinID}`}>
                           <span className={classes.name}>{rowData.name}</span>
                        </Link>
                     )
                  },
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
                     )
                  },
                  {
                     title: "Last Price",
                     field: "",
                     render: rowData => {
                        return <p>{coinLs[rowData.coinID]}</p>;
                     }
                  },
                  {
                     title: "Est. Profit",
                     type: "numeric",
                     render: rowData => {
                        var profitVal =
                           +rowData.totalAmount *
                           (+(
                              parseInt(-1, 10) +
                              (+coinLs[rowData.coinID] - +rowData.currentCoinPrice) /
                                 +rowData.currentCoinPrice
                           ) /
                              100);
                        return (
                           <p className={profitVal > 0 ? "green" : "red"}>
                              {profitVal.toFixed(2)}
                           </p>
                        );
                     }
                  },
                  {
                     title: "% Est. Profit",
                     type: "numeric",
                     render: rowData => {
                        var profitPercent =
                           parseInt(-1, 10) +
                           (+coinLs[rowData.coinID] - +rowData.currentCoinPrice) /
                              +rowData.currentCoinPrice;
                        return (
                           <p className={profitPercent > 0 ? "blueviolet" : "red"}>
                              {profitPercent.toFixed(4)}%
                           </p>
                        );
                     }
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
