import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableCell, TableRow, Paper, TableHead, TableBody } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';
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
    title: {
        display: "flex"
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
    rootTable3: {
        background: '#fff',
        border: "1px solid #e7e7e7",
        borderRadius: 2,
        padding: 5,
        color: '#000',
        marginTop: 10
    },
    textField: {
        width: "95%",
    },
    margin: {
        margin: theme.spacing(1),
    },
    graph: {
        width: "100%"
    },
    stat: {
        height: "100%",
    },
    name: {
        fontSize: '24px',
        marginRight: 10
    },
    convert: {
        padding: 10
    }
}));

export default function CoinDetail(props) {
    const classes = useStyles();
    const { symbol, id, high24h, low24h, currentPrice, marketCap, name, rank } = props;
    const [desc, setDesc] = useState("");
    const [url, setUrl] = useState('');
    const [forum, setForum] = useState('');
    const [priceChange1, setPriceChange1] = useState(0);
    const [priceChange7, setPriceChange7] = useState(0);
    const [priceChange14, setPriceChange14] = useState(0);
    const [priceChange30, setPriceChange30] = useState(0);
    const [priceChange1yr, setPriceChange1yr] = useState(0);
    // const [market_Cap, setMarket_Cap] = useState(0);

    useEffect(() => {
        axios({
            method: 'get',
            url: `https://api.coingecko.com/api/v3/coins/${id}`
        })
            .then(res => {
                console.log(res.data)
                if (res.status !== 200) {
                    alert('Unable to fetch data')
                } else {
                    setDesc(res.data.description.en)
                    setUrl(res.data.links.homepage[0])
                    setForum(res.data.links.official_forum_url[0])
                    setPriceChange1(res.data.market_data.price_change_percentage_24h)
                    setPriceChange7(res.data.market_data.price_change_percentage_7d)
                    setPriceChange14(res.data.market_data.price_change_percentage_14d)
                    setPriceChange30(res.data.market_data.price_change_percentage_30d)
                    setPriceChange1yr(res.data.market_data.price_change_percentage_1y)
                }
            })
            .catch(e => console.log(e))

        // currencies
        // axios
        //     .get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1`)
        //     .then(val =>
        //         setMarket_Cap(val.data.market_cap))
        //     .catch(e => console.log(e))

        // exchange rates
        //exchange rates
        // axios
        //     .get(`https://api.coingecko.com/api/v3/exchange_rates`)
        //     .then(exc => console.log(exc.data))
        //     .catch(e => console.log(e))
    })


    return (
        <div className={classes.background}>
            <div className={classes.descbox}>
                <div className={classes.title}>
                    <h5 className={classes.name}>{name}</h5>
                    <img src="https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579" />
                </div>
                <div>Homepage: <span><a href={url} target="_blank">{url}</a></span></div>
                <div>Official Forum: <span><a href={forum} target="_blank">{forum}</a></span></div>
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
                                            PERCENTAGE MONITOR
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
                    <div className={classes.rootTable3}>
                        <div className={classes.convert}>CONVERSION:</div>
                        <TextField
                            label={name}
                            id="outlined-start-adornment"
                            className={clsx(classes.margin, classes.textField)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">{symbol}</InputAdornment>,
                            }}
                            variant="outlined"
                            onChange={e => console.log(e.target.value)}
                        />
                        <TextField
                            label="Currency"
                            id="outlined-start-adornment"
                            className={clsx(classes.margin, classes.textField)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            variant="outlined"
                        />
                    </div>
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

