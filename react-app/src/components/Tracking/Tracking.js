import React from "react";
import "semantic-ui-css/semantic.min.css";
import { makeStyles } from "@material-ui/core/styles";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import Portfolio from "../Portfolio/Portfolio";
import RecentTrans from "../RecentTrans/RecentTrans";

import { NavLink } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  Typography,
  AppBar,
  Toolbar
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  white: {
    color: "white",
    fontSize: 16,
    marginRight: 40
  },
  appBar: {
    background: "transparent",
    border: "none",
    boxShadow: "none"
  },
  para: {
    fontFamily: "Saira Semi Condensed, sans-serif",
    fontSize: 40,
    width: "100%",
    color: "white",
    textAlign: "left",
    borderLeft: "10px solid white",
    padding: "0px 20px"
  },
  title: {
    fontFamily: "Saira Semi Condensed, sans-serif",
    fontSize: 40,
    color: "white",
    textAlign: "left",
    padding: "0px 20px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  topTitle: {
    height: "10%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    margin: "0 auto",
    boxShadow: "none",
    backgroundColor: "#6fc5d5"
  },
  typoTitle: {
    padding: 10,
    fontFamily: "Saira Semi Condensed, sans-serif",
    fontSize: 20
  },
  portfolio: {
    width: "80%",
    backgroundColor: "white",
    margin: "0 auto",
    marginTop: 20,
    borderRadius: 10
  }
}));
export default function MaterialTableDemo() {
  const classes = useStyles();

  return (
    <div>
      <div>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <NavLink
              to="/coinlist"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button className={classes.white}>
                <MonetizationOnOutlinedIcon />
                Coin List
              </Button>
            </NavLink>
          </Toolbar>
        </AppBar>
      </div>
      <div>
        <Box style={{ marginLeft: "41%" }}>
          <p className={classes.para}>Investment Tracking</p>
        </Box>
      </div>
      <div style={{ overflow: "scroll" }}>
        <Paper className={classes.portfolio}>
          <Paper style={{ height: "100%" }}>
            <Paper className={classes.topTitle}>
              <Typography className={classes.typoTitle}>Portfolio</Typography>
            </Paper>
            <Portfolio />
          </Paper>
        </Paper>
        <RecentTrans />
      </div>
    </div>
  );
}
