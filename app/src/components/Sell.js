import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { Table, TableCell, TableRow, Paper, TableHead, TableBody } from '@material-ui/core';
import SellDialog from './SellDialog';


const useStyles = makeStyles(theme => ({
    background: {
        display: "flex",
        padding: 20,
        background: "#fbf9f8",
        color: ' #000',
        width: "100%",
        height: "100%",
        margin: 0
    },
    loader: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    items: {
        display: "flex",
        flexWrap: 'wrap',
        margin: 10,
        justifyContent: 'space-around',
        alignContent: 'space-around'
    },
    box: ({ inactive }) => ({
        boxShadow: '0 0 20px 0 rgba(0,0,0,0.12)',
        borderRadius: 5,
        display: 'flex',
        justifyContent: "space-around",
        alignItems: 'space-around',
        background: "#eee5e3",
        padding: 20,
        margin: 10,
        width: '31%',
        height: '45%',
        color: "#575757",
        flexDirection: 'column',
        transition: '0.3s',
        ...(!inactive && {
            '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
            },
        }),
    }),
    data: {
        display: 'flex',
        justifyContent: "flex-start",
        alignContent: 'flex-start',
    },
    button: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: 5
    },
    column: {
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        margin: 5
    },
    id: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));

export default function Sell() {
    const classes = useStyles();
    const [trans, setTrans] = useState([])
    const [open, setOpen] = useState(false)
    const [id, setId] = useState(0)
    const [name, setName] = useState('')
    const [soldTime, setSoldTime] = useState('')
    const [soldDate, setSoldDate] = useState('')
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')
    const [amount, setAmount] = useState(0)
    const [priceBought, setPriceBought] = useState(0)
    const [value, setValue] = useState(0)
    const [sold, setSold] = useState('Unsold')

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:4000/transactions`
        })
            .then(data => {
                setTrans(data.data)
            })
            .catch(e => console.log(e))
    }, [])

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSell = () => {
        console.log('sold')
        setSold("Sold")
    }

    return (
        <div className={classes.background}>
            <div className={classes.column}>
                <div className={classes.header}>
                    <h2>Sell Coins</h2>
                </div>
                <div className={classes.items}>
                    {trans.map(res =>
                        <div key={res.id} className={classes.box}>
                            <Paper>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="right" colSpan={2}>
                                                {res.id}
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Name:</TableCell>
                                            <TableCell>{res.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Date Purchased:</TableCell>
                                            <TableCell>{res.date}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Time Purchased:</TableCell>
                                            <TableCell>{res.time}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Amount:</TableCell>
                                            <TableCell>${res.amount}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Amount when Purchased:</TableCell>
                                            <TableCell>${res.priceBought}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Current Value:</TableCell>
                                            <TableCell>{res.value}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Status:</TableCell>
                                            <TableCell>{sold}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Paper>
                            <div className={classes.button}>
                                <Button variant="contained" color="secondary" autofocus onClick={() => handleClickOpen()}>Sell</Button>
                            </div>
                        </div>
                    )}
                    {open ?
                        <SellDialog
                            open={handleClickOpen}
                            close={handleClose}
                            handleSell={handleSell}
                        />
                        : null}
                </div>
            </div>
        </div >
    );
}