import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Background from '../image/Background.png'

const useStyles = makeStyles(theme => ({
    background: {
        display: "flex",
        flexDirection: "column",
        padding: 20,
        background: 'rgb(82, 86, 89)',
        color: ' #fff',
        width: "100%",
        height: "100vh",
        margin: 0
    },
    work: {
        backgroundImage: `url(${Background})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: 'center',
        height: "100%",
        width: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

export default function Main() {
    const classes = useStyles();
    return (
        <div className={classes.background}>
            <div className={classes.work}>
            </div>
            <h1>Proceed to Coinlists Tab...</h1>
        </div>
    );
}