import React from 'react';
import Box from '@material-ui/core/Box';
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
    root: ({ inactive }) => ({
        boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
        transition: '0.3s',
        ...(!inactive && {
            '&:hover': {
                boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
            },
        }),
    }),
}));

export default function Main() {
    const classes = useStyles();
    return (
        <div className={classes.background}>
            <Box width={"100%"} borderRadius={2} height={'100%'} />
        </div>
    );
}