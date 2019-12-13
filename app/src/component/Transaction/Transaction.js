import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import Axios from "axios";
import Layout from "../Layout/Layout";
import Tabs from "../Table/TableTabs";

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "white",
    height: "80vh"
  },
  table: {
    maxWidth: "95%"
  }
});

const Header = styled.div`
  background: blue;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 70px;
  margin-bottom: 20px;
  text-transform: uppercase;
  color: white;
  font-size: 40px;
  padding-left: 50px;
`;

export default function Transaction(props) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  useEffect(() => {
    Axios.get(`http://localhost:4000/transactions`).then(res => {
      setRows([...res.data]);
    });
  }, []);
  return (
    <Layout>
      <Paper className={classes.root}>
        <Header>Transaction </Header>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "80vh"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Tabs rows={rows} setRows={setRows} />
          </div>
        </div>
      </Paper>
    </Layout>
  );
}
