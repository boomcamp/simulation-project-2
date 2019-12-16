import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styled from "styled-components";
import SellModal from "../Modal/SellModal";
import Axios from "axios";

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

export default function TableBuy({ rows, setRows, item }) {
  const classes = useStyles();
  const [openSell, setOpenSell] = useState(false);
  const [details, setDetails] = useState([]);
  const [itemId, setItemId] = useState(0);

  const usd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });
  useEffect(() => {
    Axios.get(
      `https://api.coingecko.com/api/v3/coins/${item.toLowerCase()}`
    ).then(res => {
      setDetails(res.data);
    });
  }, [item]);
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
            <TableCell align="center">Sell</TableCell>
          </TableRow>
        </HeadTable>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              {row.transaction === "Buy" && row.coin === item && (
                <>
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell align="center">{row.coin}</TableCell>
                  <TableCell align="center">{usd.format(row.price)}</TableCell>
                  <TableCell align="center">{row.coinCountU}</TableCell>
                  <TableCell align="center">{row.date}</TableCell>
                  <TableCell align="center">{row.paymentMethod}</TableCell>
                  <TableCell align="center">
                    {usd.format(row.investment)}
                  </TableCell>
                  <TableCell
                    style={{ cursor: "pointer" }}
                    align="center"
                    onClick={() => {
                      setOpenSell(true);
                      setItemId(row.id);
                    }}
                    id="sell"
                  >
                    Sell
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
        {openSell ? (
          <SellModal
            setOpenSell={setOpenSell}
            openSell={openSell}
            details={details}
            itemId={itemId}
          />
        ) : null}
      </Table>
    </TableContainer>
  );
}
