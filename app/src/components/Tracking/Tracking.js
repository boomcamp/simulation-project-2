import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Loader } from 'rsuite';
import MaterialTable from 'material-table';
import axios from 'axios';
import moment from 'moment';

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
    loader: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}));

export default function Tracking() {
    const classes = useStyles();
    const [state, setState] = useState({
        columns: [
            { title: '#', field: 'id', editable: 'never' },
            { title: 'Coin ID', field: 'coinID', editable: 'never' },
            { title: 'Coin Name', field: 'name', editable: 'never' },
            { title: 'Date', field: 'date', editable: 'never' },
            {
                title: 'Time',
                field: 'time',
                type: 'numeric',
                editable: 'never'
            },
            {
                title: 'Amount in USD',
                field: 'amount',
                type: 'numeric'
            },
            {
                title: 'Value',
                field: 'value',
                type: 'numeric',
                editable: 'never'
            },
            {
                title: 'Price of Coin Upon Buying',
                field: 'priceBought',
                type: 'numeric',
                editable: 'never'
            }
        ],
    });
    const [isLoading, setIsLoading] = useState(true)
    const [trans, setTrans] = useState([])
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        var times = moment()
            .format('hh:mm:ss a');
        setTime(times)

        var dates = moment()
            .format('YYYY/MM/DD')
        setDate(dates)

        axios({
            method: 'get',
            url: `http://localhost:4000/transactions`
        })
            .then(data => {
                setTrans(data.data)
                setIsLoading(false)
            })
            .catch(e => console.log(e))
    }, [])


    return (
        <div className={classes.background}>
            {isLoading ?
                <div className={classes.loader}>
                    <Loader size="md" />
                    Loading... <br />
                    Please wait.
                </div>
                :
                <MaterialTable
                    title="Investment Transactions"
                    columns={state.columns}
                    data={trans}
                    options={{
                        filtering: true,
                        pageSize: 10,
                        pageSizeOptions: [10],
                        rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        actionsColumnIndex: 8
                    }}
                    actions={
                        [
                            {
                                icon: 'save',
                                tooltip: 'Sell',
                                onClick: (event, rowData) => alert("You saved " + rowData.name)
                            }
                        ]
                    }
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                        setState(prevState => {
                                            const data = [...prevState.data];
                                            data[data.indexOf(oldData)] = newData;
                                            return { ...prevState, data };
                                        });
                                    }
                                }, 600);

                                axios({
                                    method: 'patch',
                                    url: `/transactions/${newData.id}`,
                                    data: {
                                        date: date,
                                        time: time,
                                        amount: newData.amount,
                                        value: newData.value
                                    },
                                })
                                    .then(
                                        axios({
                                            method: 'get',
                                            url: `/transactions/${newData.id}`
                                        })
                                            .then(e => {
                                                let a = parseInt(e.data.amount) / parseInt(e.data.priceBought)

                                                axios({
                                                    method: 'patch',
                                                    url: `/transactions/${newData.id}`,
                                                    data: {
                                                        date: date,
                                                        time: time,
                                                        amount: newData.amount,
                                                        value: a.toFixed(3)
                                                    }
                                                })
                                            })
                                            .catch(e => console.log(e))
                                    )
                                    .catch(err => console.log(err))
                            }),
                        onRowDelete: oldData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    setState(prevState => {
                                        const data = [...prevState.trans];
                                        data.splice(data.indexOf(oldData), 1);
                                        return { ...prevState, data };
                                    });
                                }, 600);

                                axios({
                                    method: 'delete',
                                    url: `/transactions/${oldData.id}`,
                                })
                                    .then(e => console.log(e.data))
                                    .catch(e => console.log(e))
                            }),
                    }}
                />
            }
        </div>
    );
}