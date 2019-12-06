import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TabChart from "./Tabs";
import Fade from "@material-ui/core/Fade";

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
      top: "26.3vh",
      right: "10vw",
      width: "40vw"
   },
   bg: {
      background: "white",
      height: "40vh"
   }
}));

export default function Charts() {
   const classes = useStyles();
   const [value, setValue] = React.useState(0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   return (
      <Fade in>
         <div className={classes.pos}>
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
         </div>
      </Fade>
   );
}
