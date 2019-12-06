import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    background: {
        display: "flex",
        flexDirection: "column",
        padding: { top: 0, bottom: 0, right: 20, left: 20 },
        // background: 'rgb(82, 86, 89)',
        color: '#fff',
        width: "100%",
        height: "100%",
        margin: 0,
        background: "#e7e7e7",
        border: 1
    },
    descbox: {
        background: '#fff',
        border: "1px solid #e7e7e7",
        borderRadius: 10,
        color: '#000',
        padding: 10,
        marginLeft: 10
    },
}));

export default function DataChart() {
    const classes = useStyles();

    axios({
        method: 'get',
        url: `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1`
    })
        .then(response => console.log(response))

    return (
        <div className={classes.descbox}>
            <h1>Hello World!</h1>
        </div>
    )
}