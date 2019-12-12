import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Layout from "../Layout/Layout";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Axios from "axios";

function preventDefault(event) {
  event.preventDefault();
}

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
    marginTop: 10
  }
});

function Profile() {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:4000/transactions`).then(res => {
      setData([...res.data]);
      console.log(...res.data);
    });
  }, []);

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
          {data.map((prof, i) => (
            <Typography
              key={i}
              className={classes.root}
              align="center"
              variant="h1"
            >
              {prof.profit}
            </Typography>
          ))}
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
          <Typography className={classes.root} align="center" variant="h1">
            {data.loss}
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
          {data.map((prof, i) => (
            <Typography
              key={i}
              className={classes.root}
              align="center"
              variant="h1"
            >
              {prof.loss}
            </Typography>
          ))}
        </Card>
      </div>
      <Divider className={classes.root} variant="middle" />
    </Layout>
  );
}

export default Profile;
