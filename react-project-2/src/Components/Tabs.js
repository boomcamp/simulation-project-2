import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TabChart from "./TabChart";
import Fade from "@material-ui/core/Fade";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";

function TabPanel(props) {
   const { children, value, index, ...other } = props;

   return (
      <Typography
         component="div"
         role="tabpanel"
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
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
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
   };
}

const useStyles = makeStyles(theme => ({
   root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper
   },
   pos: {
      position: "absolute",
      top: "35.5vh",
      right: "10vw",
      width: "40vw"
   },
   bg: {
      background: "white",
      height: "35vh"
   },
   heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
   },
   paper: {
      width: "100%",
      overflowX: "auto"
   },
   bsell: {
      width: "35vw",
      position: "absolute",
      top: "-7vh",
      right: "2.7vw",
      borderRadius: "50px"
   }
}));

export default function TabsC() {
   const classes = useStyles();
   const [data, setData] = useState([]);
   const [value, setValue] = useState(0);
   const [onehour, setOneHour] = useState([]);
   const [twofour, setTwoFour] = useState([]);
   const [seven, setSeven] = useState([]);
   const [fourteen, setFourteen] = useState([]);
   const [thirty, setThirty] = useState([]);
   const [oneyear, setOneYear] = useState([]);
   const [image, setImage] = React.useState([]);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   let { id } = useParams();

   useEffect(() => {
      Axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then(response => {
         setData(response.data);

         setOneHour(response.data.market_data.price_change_percentage_1h_in_currency);
         setTwoFour(response.data.market_data.price_change_percentage_24h_in_currency);
         setSeven(response.data.market_data.price_change_percentage_7d_in_currency);
         setFourteen(response.data.market_data.price_change_percentage_14d_in_currency);
         setThirty(response.data.market_data.price_change_percentage_30d_in_currency);
         setOneYear(response.data.market_data.price_change_percentage_1y_in_currency);
         setImage(response.data.image);

         console.log(response.data);
      });
   }, [id]);

   return (
      <Fade in>
         <div className={classes.pos}>
            <Link to={`/transaction/${id}`}>
               <Button
                  variant="contained"
                  className={classes.bsell}
                  style={{ marginLeft: "10px", color: "white", background: "purple" }}
               >
                  Buy / Sell <img src={image.small} style={{ width: "25px", paddingLeft: "5px" }} />
               </Button>
            </Link>
            <div className={classes.root}>
               <AppBar
                  position="static"
                  style={{ background: "linear-gradient(to left, #172c66 0%, #6a407f 42%)", color: "white" }}
               >
                  <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                     <Tab label="24 Hours" {...a11yProps(0)} />
                     <Tab label="1 Week" {...a11yProps(1)} />
                     <Tab label="1 Month" {...a11yProps(2)} />
                     <Tab label="6 Months" {...a11yProps(3)} />
                     <Tab label="1 Year" {...a11yProps(4)} />
                     <Tab label="All Time" {...a11yProps(5)} />
                  </Tabs>
               </AppBar>
               <TabPanel className={classes.bg} value={value} index={0}>
                  <TabChart className={classes.chart} tab={"1"} />
               </TabPanel>
               <TabPanel className={classes.bg} value={value} index={1}>
                  <TabChart className={classes.chart} tab={"7"} />
               </TabPanel>
               <TabPanel className={classes.bg} value={value} index={2}>
                  <TabChart className={classes.chart} tab={"30"} />
               </TabPanel>
               <TabPanel className={classes.bg} value={value} index={3}>
                  <TabChart className={classes.chart} tab={"180"} />
               </TabPanel>
               <TabPanel className={classes.bg} value={value} index={4}>
                  <TabChart className={classes.chart} tab={"365"} />
               </TabPanel>
               <TabPanel className={classes.bg} value={value} index={5}>
                  <TabChart className={classes.chart} tab={"max"} />
               </TabPanel>
            </div>

            <ExpansionPanel>
               <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography className={classes.heading}>Other Details</Typography>
               </ExpansionPanelSummary>
               <ExpansionPanelDetails style={{ height: "9.8vh" }}>
                  <Paper className={classes.paper}>
                     <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                           <TableRow>
                              <TableCell>1hr</TableCell>
                              <TableCell>24h</TableCell>
                              <TableCell>7d</TableCell>
                              <TableCell>14d</TableCell>
                              <TableCell>30d</TableCell>
                              <TableCell>1yr</TableCell>
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           <TableCell component="th" scope="row">
                              {Math.round(onehour.usd * 10) / 10}%
                           </TableCell>
                           <TableCell>{Math.round(twofour.usd * 10) / 10}%</TableCell>
                           <TableCell>{Math.round(seven.usd * 10) / 10}%</TableCell>
                           <TableCell>{Math.round(fourteen.usd * 10) / 10}%</TableCell>
                           <TableCell>{Math.round(thirty.usd * 10) / 10}%</TableCell>
                           <TableCell>{Math.round(oneyear.usd * 10) / 10}%</TableCell>
                        </TableBody>
                     </Table>
                  </Paper>
               </ExpansionPanelDetails>
            </ExpansionPanel>
         </div>
      </Fade>
   );
}
