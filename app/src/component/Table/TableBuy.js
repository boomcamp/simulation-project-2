import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styled from "styled-components";

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "white",
    height: "80vh"
  },
  table: {
    maxWidth: "95%",
    height: "30%"
  }
});

const HeadTable = styled(TableHead)`
  background: skyblue;
`;
const TableContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default function TableBuy({ rows }) {
  const classes = useStyles();

  const usd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <HeadTable>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="center">Coin</TableCell>
            <TableCell align="center">Price/coin</TableCell>
            <TableCell align="center">Coin Count</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Payment Method</TableCell>
            <TableCell align="center">($)Investment</TableCell>
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
                  <TableCell align="center">{row.coin}</TableCell>
                  <TableCell align="center">{usd.format(row.price)}</TableCell>
                  <TableCell align="center">{row.coinCountT}</TableCell>
                  <TableCell align="center">{row.date}</TableCell>
                  <TableCell align="center">{row.paymentMethod}</TableCell>
                  <TableCell align="center">
                    {usd.format(row.investment)}
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
