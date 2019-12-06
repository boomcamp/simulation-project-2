import React from "react";
import "../../App.css";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import AppBar from "../AppBar/AppBar";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    borderLeftWidth: 5,
    borderLeftColor: "white"
  },
  container: {
    height: "50vh",
    width: "100%",
    backgroundColor: "transparent"
  },
  text: {
    fontFamily: "Saira Semi Condensed, sans-serif",
    fontSize: 60,
    width: "40%",
    color: "white",
    textAlign: "left",
    borderLeft: "10px solid white",
    padding: "0px 20px"
  },
  button: {
    textDecoration: "none",
    fontSize: "20px",
    color: "White",
    borderColor: "White"
  }
}));
export default function Homepage() {
  const classes = useStyles();

  return (
    <div>
      <AppBar />
      <Box style={{ marginLeft: "20%" }}>
        <p className={classes.text}>Cryptocurrency Price Explorer</p>
      </Box>
    </div>
  );
}
