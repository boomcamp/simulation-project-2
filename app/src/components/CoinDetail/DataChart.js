import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
import Chart from "react-apexcharts";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = {
    descbox: {
        background: '#fff',
        border: "1px solid #e7e7e7",
        borderRadius: 10,
        color: '#000',
        padding: 10,
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
                        formatter: (value) => "$" + value.toFixed(2),
                    },
                },
                plotOptions: {
                    bar: {
                        horizontal: false
                    }
                },
                dataLabels: {
                    enabled: false
                }
            },
            series: [
                {
                    name: 'Price',
                    data: [],
                },

            ]
        }
    }

    componentDidMount = () => {
        axios({
            method: 'get',
            url: `https://api.coingecko.com/api/v3/coins/${this.props.id}/market_chart?vs_currency=usd&days=1`
        })
            .then(response => {
                console.log(response.data)
                this.setState({
                    series: [{
                        data: response.data.prices
                    }]
                })
            })
            .catch(e => console.log(e))
    }

    handleDays = () => {

    }

    handleTopic = () => {

    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.descbox} >
                <div className={classes.grid}>
                    <Grid container spacing={1} alignItems="flex-end" className={classes.topic}>
                        <Grid item>
                            <ButtonGroup color="primary" size="small" aria-label="small outlined button group" >
                                <Button onClick={this.handleTopic}>Prices Chart</Button>
                                <Button onClick={this.handleTopic}>Market Cap</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="flex-start" className={classes.days}>
                        <Grid item>
                            <ButtonGroup color="primary" size="small" aria-label="small outlined button group" >
                                <Button onClick={this.handleDays}>1D</Button>
                                <Button onClick={this.handleDays}>7D</Button>
                                <Button onClick={this.handleDays}>30D</Button>
                                <Button onClick={this.handleDays}>90D</Button>
                                <Button onClick={this.handleDays}>365D</Button>
                                <Button onClick={this.handleDays}>All Time</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </div>
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="line"
                    width="100%"
                    height="300"
                />
            </div>
        );
    }
}

export default withStyles(useStyles)(DataChart)