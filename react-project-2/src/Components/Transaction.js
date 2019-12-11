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
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import Buy from "./Buy";
import Sell from "./Sell";
import Confirm from "./Confirmation";

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

   link: {
      color: "white",
      cursor: "default",
      display: "flex",
      alignItems: "center"
   },
   shop: {
      width: "25px",
      paddingRight: "10px"
   }
}));

export default function AcccessibleTable(props) {
   const classes = useStyles();
   const [data, setData] = React.useState([]);
   const [image, setImage] = React.useState([]);
   const [load, setLoad] = React.useState(false);
   const [confirmBy, setConfirmBy] = React.useState(false);
   const [coin, setCoin] = React.useState("");
   const [amount, setAmount] = React.useState("");

   const [value, setValue] = React.useState(0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   let { id } = useParams();

   useEffect(() => {
      setLoad(true);
      Axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then(
         response => {
            setData(response.data);
            setImage(response.data.image);
            setLoad(false);
            console.log(response.data);
         }
      );
   }, [id]);

   const confirmAct = val => {
      setConfirmBy(val);
   };

   let cons;

   const trans = val => {
      setCoin(val);
   };

   const handleAmount = val => {
      setAmount(val);
   };

   console.log(amount);

   if (confirmBy) {
      cons = (
         <Confirm
            can={confirmAct}
            amount={amount}
            coin={coin}
            handleAmount={handleAmount}
         />
      );
   }

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
                  className={classes.breadlist}
                  to={`/coin-details/${id}`}
               >
                  {data.name} Details
               </Link>

               <Link aria-current="page" className={classes.link}>
                  <img src={shop} className={classes.shop} alt="shop" />
                  <span>Buy / Sell {data.name} </span>
               </Link>
            </Breadcrumbs>
         </Paper>

         {cons}

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
               <Buy
                  confirm={confirmAct}
                  amo={trans}
                  handleAmount={handleAmount}
               />
            </TabPanel>
            <TabPanel value={value} index={1}>
               <Sell />
            </TabPanel>
         </div>
      </div>
   );
}
