import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, fn, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={6}>{children}</Box>
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
    backgroundColor: "yellowgreen",
    borderRadius: 5
  }
}));

export default function ButtonsTabs({ setDays }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label="24 hr" {...a11yProps(0)} onClick={() => setDays(1)} />
        <Tab label="7 days" {...a11yProps(1)} onClick={() => setDays(7)} />
        <Tab label="30 days" {...a11yProps(2)} onClick={() => setDays(30)} />
        <Tab label="6 months" {...a11yProps(3)} onClick={() => setDays(180)} />
        <Tab label="1 year" {...a11yProps(4)} onClick={() => setDays(365)} />
        <Tab label="Max" {...a11yProps(5)} onClick={() => setDays("max")} />
      </Tabs>
    </div>
  );
}
