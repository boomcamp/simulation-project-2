import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import { Loader } from 'rsuite';
import MaterialTable from 'material-table';
import axios from 'axios';

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
            { title: '#', field: 'id' },
            { title: 'Coin Name', field: 'name' },
            { title: 'Date', field: 'date' },
            {
                title: 'Time',
                field: 'time',
                type: 'numeric'
            },
            {
                title: 'Amount in USD',
                field: 'amount',
                type: 'numeric'
            },
            {
                title: 'Value',
                field: 'value',
                type: 'numeric'
            }
        ],
    });
    // const [isLoading, setIsLoading] = useState(true)
    const [trans, setTrans] = useState([])

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


    return (
        <div className={classes.background}>
            <MaterialTable
                title="Investment Transactions"
                columns={state.columns}
                data={trans}
                options={{
                    filtering: true,
                    pageSize: 10,
                    pageSizeOptions: [10, 13],
                    rowStyle: {
                        backgroundColor: '#EEE',
                    }
                }}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    setState(prevState => {
                                        const data = [...prevState.trans];
                                        data[data.indexOf(oldData)] = newData;
                                        return { ...prevState, data };
                                    });
                                }
                            }, 600);

                            axios({
                                method: 'patch',
                                url: `/transactions/${newData.id}`,
                                data: {
                                    name: newData.name,
                                    date: newData.date,
                                    time: newData.time,
                                    amount: newData.amount,
                                    value: newData.value
                                },
                            })
                                .then(e => console.log(e.data))
                                .catch(err => console.log(err))
                        }),
                    onRowDelete: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                setState(prevState => {
                                    const data = [...prevState.data];
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
        </div>
    );
}