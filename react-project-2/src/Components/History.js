import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
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
   }
}));

export default function InvestmentTracking() {
   const classes = useStyles();
   const [data, setData] = React.useState([]);
   const [pagi, setPagi] = React.useState(1);

   useEffect(() => {
      Axios.get(
         `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page=${pagi}`
      ).then(response => {
         setData(response.data);
      });
   }, [pagi]);

   const [state, setState] = React.useState({
      left: false
   });

   const toggleDrawer = (side, open) => event => {
      if (
         event.type === "keydown" &&
         (event.key === "Tab" || event.key === "Shift")
      ) {
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
               <Link to="/investment-tracking">
                  <ListItemText
                     primary={"Investment Tracking"}
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
            <article class="widget">
               <div class="weatherIcon">
                  <img src={Buy} style={{ width: "5vw" }} />
               </div>
               <div class="weatherInfo">
                  <div class="temperature">
                     <span>25&deg;</span>
                  </div>
                  <div class="description">
                     <div class="weatherCondition">CLOUDY</div>
                     <div class="place">New York, New York</div>
                  </div>
               </div>
               <div class="date">1st Jan</div>
            </article>

            <article class="widget1">
               <div class="weatherIcon">
                  <img src={Sell} style={{ width: "5vw" }} />
               </div>
               <div class="weatherInfo">
                  <div class="temperature">
                     <span>25&deg;</span>
                  </div>
                  <div class="description">
                     <div class="weatherCondition">CLOUDY</div>
                     <div class="place">New York, New York</div>
                  </div>
               </div>
               <div class="date">1st Jan</div>
            </article>

            <article class="widget2">
               <div class="weatherIcon">
                  <img src={Buy} style={{ width: "5vw" }} />
               </div>
               <div class="weatherInfo">
                  <div class="temperature">
                     <span>25&deg;</span>
                  </div>
                  <div class="description">
                     <div class="weatherCondition">CLOUDY</div>
                     <div class="place">New York, New York</div>
                  </div>
               </div>
               <div class="date">1st Jan</div>
            </article>
         </div>
      </div>
   );
}
