import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Typography,
  Paper,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from "@material-ui/core";
import AppBar from "../AppBar/AppBar";
import { useParams } from "react-router-dom";
import market from "../../images/market.png";
import dollar from "../../images/dollar.png";
import circulating from "../../images/circulate.png";
import rank from "../../images/rank.png";
import money from "../../images/money.png";
import capchange from "../../images/capchange.png";
import publicinterest from "../../images/public.png";
import lastupdate from "../../images/money.png";
import ReactHtmlParser from "react-html-parser";
import Tabs from "../Tabs/Tabs";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    borderLeftWidth: 5,
    borderLeftColor: "white",
    height: "50v"
  },
  box: {
    height: "100%",
    width: "30%",
    backgroundColor: "#6fc5d5",
    display: "flex",
    paddingLeft: 30
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "white"
  },
  title: {
    height: "5%",
    width: "100%",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5
  },
  images: {
    height: 25
  },
  listitem: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-evenly",
    paddingLeft: 20
  },
  typoDiv: {
    backgroundColor: "white",
    height: "90vh",
    marginTop: 10,
    display: "flex"
  },
  description: {
    width: "100%",
    backgroundColor: "white",
    paddingLeft: 20,
    paddingRight: 40,
    marginTop: 30,
    overflow: "auto",
    display: "flex",
    flexDirection: "column"
  }
}));
export default function CoinDetail() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [image, setImage] = useState([]);
  const [price, setPrice] = useState([]);
  const [ath, setAth] = useState([]);
  const [athDate, setAthDate] = useState([]);
  const [athChange, setAthChange] = useState([]);
  const [atl, setAtl] = useState([]);
  const [atlDate, setAtlDate] = useState([]);
  const [atlChange, setAtlChange] = useState([]);
  const [circulate, setCirculate] = useState([]);
  const [marketCap, setmarketCap] = useState([]);
  const [marketExchange, setMarketExchange] = useState([]);
  const [publicInterest, setpublicInterest] = useState([]);
  const [lastUpdate, setLastUpdate] = useState([]);
  const [marketExchangePercent, setMarketExchangePercent] = useState([]);
  const [description, setDescription] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then(response => {
      setData(response.data);
      setImage(response.data.image.large);
      setDescription(response.data.description.en);
      setPrice(response.data.market_data.current_price.usd);
      setAth(response.data.market_data.ath.usd);
      setAthDate(response.data.market_data.ath_date.usd);
      setAthChange(response.data.market_data.ath_change_percentage.usd);
      setAtl(response.data.market_data.atl.usd);
      setAtlDate(response.data.market_data.atl_date.usd);
      setCirculate(response.data.market_data.circulating_supply);
      setAtlChange(response.data.market_data.atl_change_percentage.usd);
      setpublicInterest(response.data.public_interest_score);
      setLastUpdate(response.data.last_updated);
      setmarketCap(response.data.market_data.market_cap.usd);
      setMarketExchange(response.data.market_data.market_cap_change_24h);
      setMarketExchangePercent(
        response.data.market_data.market_cap_change_percentage_24h
      );
      console.log(response.data);
    });
  }, [id]);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  });
  const circulatingFormat = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  return (
    <div>
      <AppBar />
      <Paper style={{ width: "95%", margin: "0 auto" }}>
        <Typography component="div" className={classes.typoDiv}>
          <Box className={classes.box}>
            <div style={{ backgroundColor: "white", width: "100%" }}>
              {/* <List className={classes.list}> */}
              <div style={{ padding: 10 }}>
                <img src={image} alt="img" />
                <Typography className={classes.title}>{data.name}</Typography>
              </div>
              <div className={classes.listitem}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <img src={rank} className={classes.images} alt="img" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      data.market_cap_rank === null ? (
                        <p>Rank undefined</p>
                      ) : (
                        data.market_cap_rank
                      )
                    }
                    secondary="Rank"
                  />
                  <ListItemAvatar>
                    <Avatar>
                      <img src={dollar} alt="img" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={formatter.format(price)}
                    secondary="Current Price"
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <img src={money} alt="img" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      formatter.format(ath) +
                      " (" +
                      Math.round(athChange) +
                      " %)"
                    }
                    secondary={
                      "ATH Price " +
                      "(" +
                      new Date(athDate).toLocaleDateString("en-US") +
                      ")"
                    }
                  />
                  <ListItemAvatar>
                    <Avatar>
                      <img src={money} alt="img" />
                    </Avatar>
                  </ListItemAvatar>{" "}
                  <ListItemText
                    primary={
                      formatter.format(atl) +
                      " (" +
                      Math.round(atlChange) +
                      " %)"
                    }
                    secondary={
                      "ATL Price " +
                      "(" +
                      new Date(atlDate).toLocaleDateString("en-US") +
                      ")"
                    }
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <img src={circulating} alt="img" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={circulatingFormat(Math.round(circulate))}
                    secondary="Circulating Supply"
                  />
                  <ListItemAvatar>
                    <Avatar>
                      <img src={publicinterest} alt="img" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={((publicInterest * 100) / 100).toFixed(2)}
                    secondary="Public Interest Score"
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <img src={market} alt="img" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={"$" + circulatingFormat(Math.round(marketCap))}
                    secondary="Market Capitalization"
                  />
                  <ListItemAvatar>
                    <Avatar>
                      <img src={capchange} alt="img" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      "$" +
                      circulatingFormat(Math.round(marketExchange)) +
                      " (" +
                      ((marketExchangePercent * 100) / 100).toFixed(2) +
                      " %)"
                    }
                    secondary="Market Cap Change(24hr)"
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <img src={lastupdate} alt="img" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={new Date(lastUpdate).toLocaleString("en-US")}
                    secondary="Latest Update"
                  />
                </ListItem>
              </div>
              {/* </List> */}
            </div>
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              width: "80%"
            }}
          >
            <Box className={classes.description}>
              <Typography
                style={{
                  textAlign: "justify",
                  fontFamily: "'Gupter', serif",
                  fontSize: 16,
                  height: "450px",
                  paddingBottom: 20
                }}
              >
                {description === "" ? (
                  <p style={{ fontSize: 20, fontWeight: "bold" }}>
                    No Description Available
                  </p>
                ) : (
                  ReactHtmlParser(description)
                )}
              </Typography>
            </Box>
            <div style={{ marginTop: 20 }}>
              <Tabs />
            </div>
          </Box>
        </Typography>
      </Paper>
    </div>
  );
}
