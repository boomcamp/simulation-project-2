import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableCell, TableRow, Paper, TableHead, TableBody } from '@material-ui/core'
import axios from 'axios';

import DataChart from './DataChart';

const useStyles = makeStyles(theme => ({
    background: {
        display: "flex",
        flexDirection: "column",
        padding: 20,
        background: 'rgb(82, 86, 89)',
        color: ' #fff',
        width: "100%",
        height: "100%",
        margin: 0
    },
    description: {
        width: "100%",
        marginTop: 10,
        marginBottom: 10,
        color: '#000',
        textAlign: 'justify'
    },
    descbox: {
        background: '#fff',
        border: "1px solid #e7e7e7",
        borderRadius: 10,
        color: '#000',
        padding: 20,
        marginBottom: 10
    },
    secondbox: {
        display: "flex",
        width: "100%"
    },
    rootTable: {
        width: "100%",
        height: "100%"
    },
    rootTable2: {
        marginTop: 10
    },
    graph: {
        width: "100%"
    },
    stat: {
        height: "100%",
    }
}));

export default function CoinDetail(props) {
    const classes = useStyles();
    const { id, high24h, low24h, currentPrice, marketCap, name, rank } = props;
    const [desc, setDesc] = useState("");
    const [url, setUrl] = useState('');
    const [priceChange1, setPriceChange1] = useState(0);
    const [priceChange7, setPriceChange7] = useState(0);
    const [priceChange14, setPriceChange14] = useState(0);
    const [priceChange30, setPriceChange30] = useState(0);
    const [priceChange1yr, setPriceChange1yr] = useState(0);
    const [market_Cap, setMarket_Cap] = useState(0);

    useEffect(() => {
        // axios
        //     .get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1`)
        //     .then(val =>
        //         setMarket_Cap(val.data.market_cap))
        //     .catch(e => console.log(e))

        //exchange rates
        // axios
        //     .get(`https://api.coingecko.com/api/v3/exchange_rates`)
        //     .then(exc => console.log(exc.data))
        //     .catch(e => console.log(e))

        axios({
            method: 'get',
            url: `https://api.coingecko.com/api/v3/coins/${id}`
        })
            .then(res => {
                setDesc(res.data.description.en)
                setUrl(res.data.links.homepage)
                setPriceChange1(res.data.market_data.price_change_percentage_24h)
                setPriceChange7(res.data.market_data.price_change_percentage_7d)
                setPriceChange14(res.data.market_data.price_change_percentage_14d)
                setPriceChange30(res.data.market_data.price_change_percentage_30d)
                setPriceChange1yr(res.data.market_data.price_change_percentage_1y)
            })
            .catch(e => console.log(e))
    })


    return (
        <div className={classes.background}>
            <div className={classes.descbox}>
                <h5>Details</h5>
                <div
                    className={classes.description}
                    dangerouslySetInnerHTML={{ __html: desc }}>
                </div>
            </div>
            <div className={classes.secondbox}>
                <div className={classes.stat}>
                    <div className={classes.rootTable}>
                        <Paper>
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
                                        <TableCell>${marketCap}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>24h Low / 24h High:</TableCell>
                                        <TableCell>${low24h} / ${high24h}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Market Rank: </TableCell>
                                        <TableCell>{rank}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Paper>
                    </div>
                    <div className={classes.rootTable2}>
                        <Paper className={classes.rootTable}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" colSpan={2}>
                                            Percentage Monitor
                                    </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>24H:</TableCell>
                                        <TableCell>{priceChange1}%</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>7D:</TableCell>
                                        <TableCell>{priceChange7}%</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>14D:</TableCell>
                                        <TableCell>{priceChange14}%</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>30D:</TableCell>
                                        <TableCell>{priceChange30}%</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>1YR:</TableCell>
                                        <TableCell>{priceChange1yr}%</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Paper>
                    </div>
                    <button>Test</button>
                </div>
                <div className={classes.graph}>
                    <DataChart
                        id={props.id}
                    />
                </div>
            </div>
        </div >
    );
}

