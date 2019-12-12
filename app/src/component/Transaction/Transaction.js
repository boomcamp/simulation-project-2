import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import Axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Layout from "../Layout/Layout";
import Typography from "@material-ui/core/Typography";

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

const HeadTable = styled(TableHead)`
  background: skyblue;
`;
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
const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0 auto;
`;

export default function Transaction(props) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`http://localhost:4000/transactions`).then(res => {
      setRows([...res.data]);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });
  }, []);

  const deleteTransaction = id => {
    Axios.delete(`http://localhost:4000/transactions/${id}`).then(() => {
      setRows(rows.filter(row => row.id !== id));
    });
  };

  const usd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  return (
    <Layout>
      <Paper className={classes.root}>
        <Header>Transaction </Header>
        {loading ? (
          <Loading>
            <CircularProgress disableShrink size={5} color={"secondary"} />
          </Loading>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "80vh"
            }}
          >
            <div style={{ display: "flex", marginBottom: 10 }}>
              <Typography styled={{ color: "white" }} variant="h5" noWrap>
                Buy
              </Typography>
              <Typography styled={{ color: "white" }} variant="h5" noWrap>
                Sell
              </Typography>
            </div>
            <Table className={classes.table} aria-label="simple table">
              <HeadTable>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="center">Transaction</TableCell>
                  <TableCell align="center">Coin</TableCell>
                  <TableCell align="center">Price/coin</TableCell>
                  <TableCell align="center">Coin Count</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Payment Method/Deposits</TableCell>
                  <TableCell align="center">($)Investment</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </HeadTable>
              <TableBody>
                {rows.map((row, i) => (
                  <TableRow key={i}>
                    {row.transaction === "Buy" && (
                      <>
                        <TableCell component="th" scope="row">
                          {i + 1}
                        </TableCell>
                        <TableCell align="center">{row.transaction}</TableCell>
                        <TableCell align="center">{row.coin}</TableCell>
                        <TableCell align="center">
                          {usd.format(row.price)}
                        </TableCell>
                        <TableCell align="center">{row.coinCountT}</TableCell>
                        <TableCell align="center">{row.date}</TableCell>
                        <TableCell align="center">
                          {row.paymentMethod}
                        </TableCell>
                        <TableCell align="center">
                          {usd.format(row.investment)}
                        </TableCell>
                        <TableCell
                          align="center"
                          onClick={() => deleteTransaction(row.id)}
                        >
                          delete
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Paper>
    </Layout>
  );
}
