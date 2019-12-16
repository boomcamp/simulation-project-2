import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Layout from "../Layout/Layout";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Tabs from "../Profile/CoinTabs";
import Axios from "axios";

const useStyles = makeStyles({
  depositContext: {
    flex: 1
  },
  card: {
    minWidth: 350,
    height: 200
  },
  media: {
    height: 140
  },
  root: {
    width: "100%",
    backgroundColor: "white",
    height: "64vh"
  },
  table: {
    maxWidth: "95%"
  }
});

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

function Profile() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [balance, setBalance] = useState({});

  useEffect(() => {
    Axios.get(`http://localhost:4000/transactions`).then(res => {
      setData([...res.data]);
      console.log(res.data);
    });
    Axios.get(`http://localhost:4000/wallet`).then(res => {
      setBalance(res.data);
    });
  }, []);

  const totalCal = (details, type, key) => {
    let total = 0;
    details.map(d => d.transaction === type && (total += d[key]));
    return usd.format(total);
  };
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly"
        }}
      >
        <Card className={classes.card}>
          <CardActionArea>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                align="center"
              >
                Total Profit
              </Typography>
            </CardContent>
          </CardActionArea>
          <Typography style={{ margin: 10 }} align="center" variant="h2">
            {data ? totalCal(data, "Sell", "profit") : null}
          </Typography>
        </Card>
        <Card className={classes.card}>
          <CardActionArea>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                align="center"
              >
                Total Balance
              </Typography>
            </CardContent>
          </CardActionArea>
          <Typography style={{ margin: 10 }} align="center" variant="h2">
            {usd.format(balance.money)}
          </Typography>
        </Card>
        <Card className={classes.card}>
          <CardActionArea>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                align="center"
              >
                Total Loss
              </Typography>
            </CardContent>
          </CardActionArea>
          <Typography style={{ margin: 10 }} align="center" variant="h2">
            {data ? totalCal(data, "Sell", "loss") : null}
          </Typography>
        </Card>
      </div>
      <Divider style={{ margin: 10 }} variant="middle" />
      <Paper className={classes.root}>
        <div
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <Tabs rows={data} setRows={setData} />
          </div>
        </div>
      </Paper>
    </Layout>
  );
}

export default Profile;
