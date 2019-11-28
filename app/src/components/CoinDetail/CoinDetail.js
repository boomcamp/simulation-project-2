import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableCell, TableRow, Paper, TableHead, TableBody, Typography } from '@material-ui/core'
import axios from 'axios';

import DataTable from './DataTable';

const useStyles = makeStyles(theme => ({
    background: {
        display: "flex",
        flexDirection: "column",
        padding: 20,
        background: 'rgb(82, 86, 89)',
        color: ' #fff',
        width: "100",
        height: "100vh",
        margin: 0
    },
    description: {
        width: "100%",
        background: "blue",
        marginTop: 10,
        marginBottom: 10
    },
    secondbox: {
        display: "flex",
    },
    rootTable: {
        width: '30%',
        float: "left",
        margin: "auto",
    },
    table: {
        width: "100%",
    },
    graph: {
        float: "right"
    }
}));

export default function CoinDetail(props) {
    const classes = useStyles();
    const { id, high24h, low24h, currentPrice, marketCap, name, rank } = props;
    const [desc, setDesc] = useState("");
    const [market_Cap, setMarket_Cap] = useState(0);

    axios
        .get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1`)
        .then(val =>
            setMarket_Cap(val.data.market_cap)
        )
        .catch(e => console.log(e))

    //exchange rates
    // axios
    //     .get(`https://api.coingecko.com/api/v3/exchange_rates`)
    //     .then(exc => console.log(exc.data))
    //     .catch(e => console.log(e))

    axios
        .get(`https://api.coingecko.com/api/v3/coins/${id}`)
        .then(res => {
            setDesc(res.data.description.en)
        })
        .catch(e => console.log(e))


    return (
        <div className={classes.background}>
            <h5>Details</h5>
            <div className={classes.description}>
                <Typography>
                    {desc}
                </Typography>
            </div>
            <div>
                <div className={classes.stat}>
                    <Paper className={classes.rootTable}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" colSpan={2}>
                                        QUICK STATS
                        </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Name:</TableCell>
                                    <TableCell>{name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Current Price:</TableCell>
                                    <TableCell>${currentPrice}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Market Cap:</TableCell>
                                    <TableCell>{marketCap}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>24h Low / 24h High:</TableCell>
                                    <TableCell>{low24h} / {high24h}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Market Rank: </TableCell>
                                    <TableCell>{rank}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
                <div className={classes.graph}>
                    <DataTable />
                </div>
            </div>
        </div >
    )
}

