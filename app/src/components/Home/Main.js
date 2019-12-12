import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
}));

export default function Main() {
    const classes = useStyles();
    return (
        <div className={classes.background}>
        </div>
    );
}