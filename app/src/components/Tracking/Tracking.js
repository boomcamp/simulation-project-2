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
            { title: 'ID', field: 'id' },
            { title: 'Coin Name', field: 'name' },
            { title: 'Date', field: 'date' },
            {
                title: 'Time',
                field: 'time',
                type: 'numeric'
            },
            {
                title: 'Amount',
                field: 'amount',
                type: 'numeric'
            }
        ],
        data: [
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            {
                name: 'Zerya Betül',
                surname: 'Baran',
                birthYear: 2017,
                birthCity: 34,
            },
        ],
    });
    // const [isLoading, setIsLoading] = useState(true)
    // const [trans, setTrans] = useState([])

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:4000/transactions`
        })
            .then(data => console.log(data.data))
            .catch(e => console.log(e))
    })


    return (
        <div className={classes.background}>
            <MaterialTable
                title="Investment Transactions"
                columns={state.columns}
                data={state.data}
                options={{
                    filtering: true,
                    pageSize: 10,
                    pageSizeOptions: [10, 13],
                    rowStyle: {
                        backgroundColor: '#EEE',
                    }
                }}
                editable={{
                    onRowAdd: newData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                setState(prevState => {
                                    const data = [...prevState.data];
                                    data.push(newData);
                                    return { ...prevState, data };
                                });
                            }, 600);
                        }),
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
                        }),
                }}
            />
        </div>
    );
}