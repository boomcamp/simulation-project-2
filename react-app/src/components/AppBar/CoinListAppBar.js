import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { NavLink, Router } from "react-router-dom";
import TrendingUpOutlinedIcon from "@material-ui/icons/TrendingUpOutlined";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";

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
          {/* <NavLink
            to="/homepage"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Button className={classes.white}>
              <HomeOutlinedIcon />
              Home
            </Button>
          </NavLink> */}
          <Button className={classes.white}>
            <TrendingUpOutlinedIcon />
            Investment Tracking
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
