import React, { useState, useEffect } from "react"
import axios from "axios"
import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import "semantic-ui-css/semantic.min.css"
import { Pagination } from "semantic-ui-react"

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
})

export default function SimpleTable() {
  const classes = useStyles()
  const [rows, setRows] = useState([])
  const [cpage, setPage] = useState(1)
  const [num, setNum] = useState(0)
  const url = "https://api.coingecko.com/api/v3/"

  useEffect(() => {
    axios
      .get(
        `${url}coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=${cpage}&sparkline=false`
      )
      .then(res => {
        setRows([...res.data])
      })
      .catch(err => console.log(err))
    axios
      .get(`${url}coins/list`)  
      .then(res => 
        {
          // console.log(res.data.length)
          // console.log(15 * 414)
          setNum(Math.ceil((res.data.length + 1) / 15))
          // var pages = [Math.ceil((res.data.length + 1) / 15)] 
          // console.log(pages);
          // for (var index = 0; index < pages; index += 4) {
          //   setNum(pages.slice(index, index + 4))
          // }
        })
  }, [cpage])
  const changePage = (e, pageInfo) => {
    setPage(pageInfo.activePage)
  }
  // const cDetails = () => {
     
  // }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Coin</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell>Current Price</TableCell>
            <TableCell>24h Volume</TableCell>
            <TableCell>Circulating Supply</TableCell>
            <TableCell>Mkt Cap</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell>{row.market_cap_rank}</TableCell>
              <TableCell style={{ display: "flex", alignItems: "center" }}>
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
              <TableCell>{row.current_price}</TableCell>
              <TableCell>{row.total_volume ? `$${row.total_volume.toLocaleString()}` : " "}</TableCell>
              <TableCell>{row.circulating_supply ? row.circulating_supply.toLocaleString() : " "}</TableCell>
              <TableCell>{row.market_cap ? `$${row.market_cap.toLocaleString()}` : " "}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Grid container justify="center" style={{margin: "10px auto"}}>
        <Pagination
          onPageChange={changePage}
          activePage={cpage}
          totalPages={num}
          ellipsisItem={null} 
        />
      </Grid>
    </Paper>
  )
}
