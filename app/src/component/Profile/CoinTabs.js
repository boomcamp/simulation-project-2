import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CoinTable from "../Profile/CoinTable";

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

export default function SimpleTabs({ rows, setRows }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [item, setItem] = React.useState("Bitcoin");
  let count = {};
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {rows.map((r, i) => {
            count[r.coin] = (count[r.coin] || 0) + 1;
            if (count[r.coin] === 1 && r.transaction === "Buy") {
              return (
                <Tab
                  label={r.coin}
                  {...a11yProps(i)}
                  key={i}
                  onClick={() => setItem(r.coin)}
                />
              );
            }
            return null;
          })}
        </Tabs>
      </AppBar>
      {rows.map((r, i) => {
        return (
          r.transaction === "Buy" && (
            <TabPanel value={value} index={i} key={i}>
              <CoinTable
                rows={rows}
                setRows={setRows}
                value={value}
                item={item}
              />
            </TabPanel>
          )
        );
      })}
    </div>
  );
}
