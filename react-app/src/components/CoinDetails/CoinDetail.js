import React, { useEffect } from "react";
import axios from "axios";
import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import AppBar from "../AppBar/AppBar";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { useParams } from "react-router-dom";
import { useState } from "react";
import market from "../../images/market.png";
import dollar from "../../images/dollar.png";
import rank from "../../images/rank.png";
import capchange from "../../images/capchange.png";
import publicinterest from "../../images/public.png";
import lastupdate from "../../images/update.png";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";
import Chart from "../Chart/Chart";
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
    backgroundColor: "white",
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
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 5
  },
  images: {
    height: 25
  },
  listitem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "0 auto",
    padding: 10
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
    paddingLeft: 50,
    paddingRight: 50,
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
  return (
    <div>
      <AppBar />
      <Paper style={{ width: "80%", margin: "0 auto" }}>
        <Typography component="div" className={classes.typoDiv}>
          <Box className={classes.box}>
            <List className={classes.list}>
              <div style={{ padding: 10 }}>
                <img src={image} style={{ marginTop: 20 }} alt="img" />
                <Typography className={classes.title}>{data.name}</Typography>
              </div>
              <div className={classes.listitem}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <img src={rank} className={classes.images} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={data.market_cap_rank}
                    secondary="Rank"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <img src={dollar} />
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
                      <img src={market} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={formatter.format(marketCap)}
                    secondary="Market Capitalization"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <img src={capchange} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={formatter.format(marketExchange)}
                    secondary="Market Capitalization Change(24hr)"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <img src={capchange} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={marketExchangePercent}
                    secondary="Market Capitalization Percentage Change(24hr)"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <img src={publicinterest} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={publicInterest}
                    secondary="Public Interest Score"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <img src={lastupdate} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={lastUpdate}
                    secondary="Latest Update"
                  />
                </ListItem>
              </div>
            </List>
          </Box>
          <Box
            style={{ display: "flex", flexDirection: "column", width: "80%" }}
          >
            <Box className={classes.description}>
              <Typography
                style={{
                  textAlign: "justify",
                  fontFamily: "'Gupter', serif",
                  fontSize: 16,
                  paddingBottom: 20
                }}
              >
                {ReactHtmlParser(description)}
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
