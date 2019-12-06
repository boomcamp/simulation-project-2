import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { NavLink, Router } from "react-router-dom";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import TrendingUpOutlinedIcon from "@material-ui/icons/TrendingUpOutlined";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
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
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
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
          <NavLink
            to="/coinlist"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Button className={classes.white}>
              <TrendingUpOutlinedIcon />
              Investment Tracking
            </Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
}
