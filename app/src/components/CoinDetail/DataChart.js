import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
import Chart from "react-apexcharts";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Loader } from 'rsuite';

const useStyles = {
    descbox: {
        background: '#fff',
        border: "1px solid #e7e7e7",
        borderRadius: 10,
        color: '#000',
        padding: 20,
        marginLeft: 10
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
    }
};


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
                        formatter: (value) => value.toFixed(0),
                    },
                },
                yaxis: {
                    forceNiceScale: false,
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
            isLoading: true
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

    render() {
        const { classes } = this.props;
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
                    </div> : <Chart
                        options={this.state.options}
                        series={this.state.series}
                        type="line"
                        width="100%"
                        height="700"
                    />
                }
            </div>
        );
    }
}

export default withStyles(useStyles)(DataChart)