import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Typography, Box } from "@material-ui/core/";
import Chart from "../Chart/Chart";

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
  }
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{
          boxShadow: "none",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "white"
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          indicatorColor="primary"
          style={{ backgroundColor: "white", color: "black" }}
        >
          <Tab label="24 Hrs" {...a11yProps(0)} />
          <Tab label="1 Week" {...a11yProps(1)} />
          <Tab label="1 Month" {...a11yProps(2)} />
          <Tab label="6 Months" {...a11yProps(3)} />
          <Tab label="1 Year" {...a11yProps(4)} />
          <Tab label="All Time" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Chart number={"1"} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Chart number={"7"} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Chart number={"30"} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Chart number={"180"} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Chart number={"365"} />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Chart number={"max"} />
      </TabPanel>
    </div>
  );
}
