import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "semantic-ui-css/semantic.min.css";
import { Pagination } from "semantic-ui-react";
import styled from "styled-components";
import background from "../../img/background.jpg";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  table: {
    maxWidth: "95%",
    background: "white",
    opacity: "0.9"
  }
});
const Header = styled.div`
  background: blue;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  margin-bottom: 20px;
  text-transform: uppercase;
  color: white;
  font-size: 40px;
`;
const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0 auto;
`;

const HeadTable = styled(TableHead)`
  background: skyblue;
`;
const TableContainer = styled.div`
  display: flex;
  justify-content: center;
`;
export default function SimpleTable(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [cpage, setPage] = useState(1);
  const [num, setNum] = useState(0);
  const url = "https://api.coingecko.com/api/v3/";

  useEffect(() => {
    axios
      .get(
        `${url}coins/markets?vs_currency=usd&order=market_cap_desc&per_page=14&page=${cpage}&sparkline=false`
      )
      .then(res => {
        setRows([...res.data]);
        console.log(res.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch(err => console.log(err));
    axios.get(`${url}coins/list`).then(res => {
      setNum(Math.ceil((res.data.length + 1) / 14));
    });
  }, [cpage]);
  const changePage = (e, pageInfo) => {
    setPage(pageInfo.activePage);
  };
  return (
    <Paper className={classes.root}>
      <Header>Cryptocurrencies</Header>
      {loading ? (
        <Loading>
          <CircularProgress
            disableShrink
            size={80}
            color={"secondary"}
            thickness={5}
          />
        </Loading>
      ) : (
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <HeadTable>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Coin</TableCell>
                <TableCell>Symbol</TableCell>
                <TableCell>Current Price</TableCell>
                <TableCell>24h Volume</TableCell>
                <TableCell>Circulating Supply</TableCell>
                <TableCell>Mkt Cap</TableCell>
              </TableRow>
            </HeadTable>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.name}>
                  <TableCell>{row.market_cap_rank}</TableCell>
                  <TableCell
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer"
                    }}
                    onClick={() => props.history.push(`/coindetails/${row.id}`)}
                  >
                    <img
                      style={{ width: 20, height: 20, marginRight: 20 }}
                      src={`${row.image}`}
                      alt="logo"
                    ></img>
                    {row.name}
                  </TableCell>
                  <TableCell style={{ textTransform: "uppercase" }}>
                    {row.symbol}
                  </TableCell>
                  <TableCell>
                    {row.current_price
                      ? `$${row.current_price.toLocaleString()}`
                      : " "}
                  </TableCell>
                  <TableCell>
                    {row.total_volume
                      ? `$${row.total_volume.toLocaleString()}`
                      : " "}
                  </TableCell>
                  <TableCell>
                    {row.circulating_supply
                      ? row.circulating_supply.toLocaleString()
                      : " "}
                  </TableCell>
                  <TableCell>
                    {row.market_cap
                      ? `$${row.market_cap.toLocaleString()}`
                      : " "}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Grid
        container
        justify="center"
        style={{ marginTop: 10, paddingBottom: 10, maxWidth: "95%" }}
      >
        <Pagination
          onPageChange={changePage}
          activePage={cpage}
          totalPages={num}
        />
      </Grid>
    </Paper>
  );
}
