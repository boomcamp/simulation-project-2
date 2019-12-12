import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
import Chart from "react-apexcharts";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Loader } from 'rsuite';
import moment from 'moment'

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = (theme => ({
    descbox: {
        background: '#fff',
        border: "1px solid #e7e7e7",
        borderRadius: 10,
        color: '#000',
        padding: 20,
        marginLeft: 10,
        height: '100%'
    },
    grid: {
        display: "flex",
        marginBottom: 10
    },
    topic: {
        justifyContent: "flex-start"
    },
    days: {
        justifyContent: "flex-end"
    },
    loader: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    invest: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        alignContent: "center"
    },
    q: {
        marginRight: 5
    },
    info: {
        display: "flex",
        justifyContent: "space-around",
        margin: 10,
        width: 400
    },
    textField: {
        width: "95%",
    },
    margin: {
        margin: theme.spacing(1),
    },
}));


class DataChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                chart: {
                    background: '#f4f4f4',
                    foreColor: '#333'
                },
                xaxis: {
                    categories: [],
                    labels: {
                        formatter: function (timestamp) {
                            return moment(new Date(timestamp)).format("MMM DD, YYYY/HH:MM")
                        },
                        hideOverlappingLabels: true,
                        trim: true
                    },
                },
                yaxis: {
                    labels: {
                        formatter: (value) => "$ " + value.toFixed(2),
                    },
                },
                plotOptions: {
                    bar: {
                        horizontal: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                tooltip: {
                    theme: "dark",
                    shared: true
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0.9,
                        colorStops: [
                            {
                                offset: 0,
                                color: "#EB656F",
                                opacity: 1
                            },
                            {
                                offset: 20,
                                color: "#FAD375",
                                opacity: 1
                            },
                            {
                                offset: 60,
                                color: "#61DBC3",
                                opacity: 1
                            },
                            {
                                offset: 100,
                                color: "#95DA74",
                                opacity: 1
                            }
                        ]
                    },
                    pattern: {
                        style: "verticalLines",
                    }
                },
                grid: {
                    borderColor: '#6D6D6D'
                },
            },
            series: [
                {
                    name: 'Price',
                    data: [],
                },
            ],
            days: "1",
            isLoading: true,
            dialog: {
                open: false
            },
            invest: {
                data: [
                    {
                        id: 0,
                        name: '',
                        date: 0,
                        time: 0,
                        amount: 0
                    }
                ]
            }
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: `https://api.coingecko.com/api/v3/coins/${this.props.id}/market_chart?vs_currency=usd&days=${this.state.days}`
        })
            .then(response => {
                this.setState({
                    ...this.state,
                    series: [{
                        data: response.data.prices
                    }],
                    isLoading: false
                })
            })
            .catch(e => console.log(e))
    }

    // Price Chart
    handleTopic1 = () => {
        axios({
            method: 'get',
            url: `https://api.coingecko.com/api/v3/coins/${this.props.id}/market_chart?vs_currency=usd&days=${this.state.days}`
        })
            .then(response => {
                this.setState({
                    ...this.state,
                    series: [{
                        data: response.data.prices
                    }],
                    isLoading: false
                })
            })
            .catch(e => console.log(e))
    }
    // Market Cap Chart
    handleTopic2 = () => {
        axios({
            method: 'get',
            url: `https://api.coingecko.com/api/v3/coins/${this.props.id}/market_chart?vs_currency=usd&days=${this.state.days}`
        })
            .then(response => {
                this.setState({
                    ...this.state,
                    series: [{
                        data: response.data.market_caps
                    }],
                    isLoading: false
                })
            })
            .catch(e => console.log(e))
    }
    // Days Toggle
    handleDays = (day) => {
        this.setState({
            ...this.state,
            days: day
        })

        axios({
            method: 'get',
            url: `https://api.coingecko.com/api/v3/coins/${this.props.id}/market_chart?vs_currency=usd&days=${day}`
        })
            .then(response => {
                this.setState({
                    ...this.state,
                    series: [{
                        data: response.data.prices
                    }],
                    isLoading: false
                })
            })
            .catch(e => console.log(e))
    }

    handleClickOpen = () => {
        this.setState({
            ...this.state,
            dialog: {
                open: true
            }
        })
    }

    handleClose = () => {
        this.setState({
            ...this.state,
            dialog: {
                open: false
            }
        })
    }

    handlePost = () => {
        axios({
            method: 'post',
            url: `http://localhost:4000/transactions`,
            data: this.state.invest.data
        })
            .then(e => this.props.history.push('/tracking'))
            .catch(err => console.log(err))
    }

    render() {
        const { classes } = this.props;
        const { name, symbol } = this.props
        const { options, series } = this.state
        return (
            <div className={classes.descbox} >
                <div className={classes.grid}>
                    <Grid container spacing={1} alignItems="flex-end" className={classes.topic}>
                        <Grid item>
                            <ButtonGroup color="primary" size="small" aria-label="small outlined button group">
                                <Button onClick={this.handleTopic1}>Prices Chart</Button>
                                <Button onClick={this.handleTopic2}>Market Cap</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="flex-start" className={classes.days}>
                        <Grid item>
                            <ButtonGroup color="primary" size="small" aria-label="small outlined button group">
                                <Button onClick={() => this.handleDays("1")}>1D</Button>
                                <Button onClick={() => this.handleDays("7")}>7D</Button>
                                <Button onClick={() => this.handleDays("30")}>30D</Button>
                                <Button onClick={() => this.handleDays("90")}>90D</Button>
                                <Button onClick={() => this.handleDays("365")}>365D</Button>
                                <Button onClick={() => this.handleDays("max")}>All Time</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </div>
                {this.state.isLoading ?
                    <div className={classes.loader}>
                        <Loader size="md" />
                        Loading... <br />
                        Please wait.
                    </div> :
                    <React.Fragment>
                        <Chart
                            options={options}
                            series={series}
                            type="line"
                            width="100%"
                            height="750"
                        />
                        <div className={classes.invest}>
                            <span className={classes.q}>Want to Invest?</span>
                            <Button variant="outlined" onClick={this.handleClickOpen}>BUY</Button>
                            <Dialog
                                open={this.state.dialog.open}
                                onClose={this.handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{`Invest on ${name}`}</DialogTitle>

                                <form onSubmit={this.handlePost}>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            <span className={classes.buy}>
                                                <TextField
                                                    required
                                                    label="Amount to Invest"
                                                    type="number"
                                                    id="outlined-read-only-input"
                                                    className={clsx(classes.margin, classes.textField)}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                                                    }}
                                                    variant="outlined"
                                                />
                                                <TextField
                                                    label={name}
                                                    id="outlined-start-adornment"
                                                    className={clsx(classes.margin, classes.textField)}
                                                    InputProps={{
                                                        readOnly: true,
                                                        startAdornment: <InputAdornment position="start">{symbol}</InputAdornment>,
                                                    }}
                                                    variant="outlined"
                                                    onChange={e => console.log(e.target.value)}
                                                />
                                            </span>
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={this.handleClose} color="primary">
                                            CANCEL
                                    </Button>
                                        <Button type="submit" color="primary" autoFocus>
                                            OKAY
                                    </Button>
                                    </DialogActions>
                                </form>
                            </Dialog>
                        </div>
                    </React.Fragment>
                }
            </div>
        );
    }
}

export default withStyles(useStyles)(DataChart)