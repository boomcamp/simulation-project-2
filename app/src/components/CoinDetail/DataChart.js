import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
import ReactApexChart from "react-apexcharts";
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
    }
}));


class DataChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // options
            options: {
                annotations: {
                    yaxis: [
                        {
                            y: 30,
                            borderColor: "#999",
                            label: {
                                show: true,
                                style: {
                                    color: "#fff",
                                    background: "#00E396"
                                }
                            }
                        }
                    ],
                    xaxis: [
                        {
                            borderColor: "#999",
                            yAxisIndex: 0,
                            label: {
                                show: true,
                                style: {
                                    color: "#fff",
                                    background: "#775DD0"
                                }
                            }
                        }
                    ]
                },
                chart: {
                    background: '#f4f4f4',
                    foreColor: '#333',
                    zoom: {
                        enabled: true,
                        type: 'x',
                        resetIcon: {
                            offsetX: -10,
                            offsetY: 0,
                            fillColor: '#fff',
                            strokeColor: '#37474F'
                        },
                        selection: {
                            background: '#90CAF9',
                            border: '#0D47A1'
                        },
                        zoomedArea: {
                            fill: {
                                color: '#90CAF9',
                                opacity: 0.4
                            },
                            stroke: {
                                color: '#0D47A1',
                                opacity: 0.4,
                                width: 1
                            }
                        }
                    }
                },
                xaxis: {
                    labels: {
                        formatter: function (timestamp) {
                            return moment(new Date(timestamp)).format("MM/DD/YY'HH:MM")
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
                markers: {
                    size: 0,
                    style: "hollow"
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
                        stops: [0, 100]
                    }
                },
                pattern: {
                    style: "verticalLines",
                },
                grid: {
                    borderColor: '#6D6D6D'
                }
            },
            // end of options
            series: [
                {
                    name: 'Price',
                    data: [],
                },
            ],
            days: "max",
            isLoading: true,
            dialog: {
                open: false
            },
            invest: {
                name: '',
                amount: 0,
                value: 0
            },
            convert: 0,
            time: '',
            date: ''
        }
    }

    componentDidMount() {
        var times = moment()
            .format('hh:mm:ss a');
        this.setState({ time: times })

        var dates = moment()
            .format('YYYY/MM/DD')
        this.setState({ date: dates })

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

    handlePost = (e) => {
        axios({
            method: 'post',
            url: `http://localhost:4000/transactions`,
            data: {
                coinID: this.props.id,
                name: this.props.name,
                date: this.state.date,
                time: this.state.time,
                amount: this.state.convert,
                priceBought: this.props.currentPrice,
                value: this.state.convert / this.props.currentPrice
            }
        })
            .then(
                this.history.push('/tracking')
            )
            .catch(err => console.log(err))
    }

    render() {
        const { classes } = this.props;
        const { name, symbol, currentPrice } = this.props
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
                        <ReactApexChart
                            options={options}
                            series={series}
                            type="area"
                            width="100%"
                            height="750" />
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
                                                placeholder="0"
                                                variant="outlined"
                                                onChange={e => this.setState({ convert: e.target.value })}
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
                                                value={this.state.convert / currentPrice}
                                                onChange={e => console.log(e.target.value)}
                                            />
                                        </span>
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