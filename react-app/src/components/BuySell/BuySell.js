import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  CircularProgress,
  Box,
  Paper,
  Typography
} from "@material-ui/core";
import CoinListAppBar from "../AppBar/CoinListAppBar";
import "semantic-ui-css/semantic.min.css";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink, useParams } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  paper: {
    width: "45%",
    height: "50%",
    color: "white",
    borderRadius: 10
  },
  topTitle: {
    height: "10%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    margin: "0 auto",
    boxShadow: "none",
    backgroundColor: "#6fc5d5",
    borderTopRadius: 10
  },
  typoTitle: {
    padding: 5,
    fontFamily: "Saira Semi Condensed, sans-serif",
    fontSize: 20
  },
  title: {
    fontFamily: "Saira Semi Condensed, sans-serif",
    fontSize: 40,
    width: "100%",
    color: "white",
    textAlign: "left",
    borderLeft: "10px solid white",
    padding: "0px 20px"
  },
  mainCon: {
    width: "90%",
    height: "80vh",
    margin: "20px auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
}));

export default function BuySell() {
  const classes = useStyles();
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoader(true);
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then(response => {
      setData(response.data);
      console.log(response.data);
    });
  }, [id]);
  return (
    <div>
      <CoinListAppBar />
      <Box style={{ marginLeft: "40%" }}>
        <p className={classes.title}>{data.name} Buy / Sell</p>
      </Box>
      <Container className={classes.mainCon}>
        <Paper className={classes.paper}>
          <Paper className={classes.topTitle}>
            <Typography className={classes.typoTitle}>Buy</Typography>
          </Paper>
          <Paper style={{ height: "90%" }}></Paper>
        </Paper>
        <Paper className={classes.paper}>
          <Paper className={classes.topTitle}>
            <Typography className={classes.typoTitle}>Sell</Typography>
          </Paper>
        </Paper>
      </Container>
    </div>
  );
}
