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
        background: 'rgb(82, 86, 89)',
        color: ' #fff',
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
        background: "#f5f5f5",
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

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:4000/transactions`
        })
            .then(data => {
                setTrans(data.data)
                setId(data.data.id)
                setName(data.data.name)
                setDate(data.data.date)
                setTime(data.data.time)
                setAmount(data.data.amount)
                setValue(data.data.value)
                setPriceBought(data.data.priceBought)
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
        axios({
            method: 'patch',
            url: `/transactions/${id}`,
            data: {

            }
        })
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
                                            <TableCell>ID</TableCell>
                                            <TableCell>{res.id}</TableCell>
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
                                            <TableCell>Unsold</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Paper>
                            <div className={classes.button}>
                                <Button variant="outlined" autofocus onClick={() => handleClickOpen()}>Sell</Button>
                            </div>
                        </div>
                    )}
                </div>
                {open ? <SellDialog
                    open={handleClickOpen}
                    close={handleClose}
                    name={name}
                    id={id}
                    time={time}
                    date={date}
                    amount={amount}
                    priceBought={priceBought}
                    value={value}
                    handleSell={handleSell}
                />
                    :
                    <React.Fragment></React.Fragment>}
            </div>
        </div >
    );
}