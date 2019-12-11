import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import CoinListAppBar from "../AppBar/CoinListAppBar";
import "semantic-ui-css/semantic.min.css";
import { Pagination } from "semantic-ui-react";
import { makeStyles } from "@material-ui/core/styles";
import TrendingUpOutlinedIcon from "@material-ui/icons/TrendingUpOutlined";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";

import { NavLink, useParams } from "react-router-dom";
import {
  Container,
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
  TextField,
  AppBar,
  Toolbar,
  InputAdornment
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
  }
}));
export default function MaterialTableDemo() {
  const classes = useStyles();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [data, setData] = React.useState([]);
  const [Page, setPage] = React.useState(1);
  const [image, setImage] = useState([]);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  });
  const circulatingFormat = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  useEffect(() => {
    setLoader(true);
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then(response => {
      setData(response.data);
      setImage(response.data.image.small);
    });
  }, [id]);
  return (
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
      <Box style={{ marginLeft: "35%" }}>
        <p
          style={{
            fontFamily: "Saira Semi Condensed, sans-serif",
            fontSize: 40,
            width: "100%",
            color: "white",
            textAlign: "left",
            borderLeft: "10px solid white",
            padding: "0px 20px"
          }}
        ></p>
      </Box>
    </div>
  );
}
