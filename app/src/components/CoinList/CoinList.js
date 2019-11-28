import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Menu, MenuItem } from '@material-ui/core';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import MaterialTable from 'material-table';
import axios from 'axios';
import { Loader } from 'rsuite';

import CoinDetail from '../CoinDetail/CoinDetail';

const useStyles = (theme => ({
    background: {
        display: "flex",
        flexDirection: "column",
        padding: 20,
        background: 'rgb(82, 86, 89)',
        color: ' #fff',
        width: "100%"
    },
    loader: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    currency: {
        display: "flex",
        justifyContent: "flex-end",
        margin: 5
    }
}));

class CoinList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coinList: {
                coins: [],
            },
            isLoading: true,
            columns: [
                { title: 'Rank #', field: 'market_cap_rank' },
                { title: 'ID', field: 'id' },
                {
                    title: 'Coin Logo', field: 'image',
                    render: rowData => <img src={rowData.image} style={{ width: 25 }} alt="" />
                },
                { title: 'Coin Name', field: 'name' },
                { title: 'Symbol', field: 'symbol' },
                { title: 'Current Price', field: 'current_price' },
            ],
            currency: []
        }
    }

    componentDidMount = () => {
        axios({
            method: 'get',
            url: `https://api.coingecko.com/api/v3/simple/supported_vs_currencies`
        })
            .then(currency => {
                if (currency.status !== 200) {
                    alert("Unable to fetch vs_currencies")
                } else {
                    this.setState({
                        ...this.state,
                        currency: currency.data
                    })
                }
            })

        axios({
            method: 'get',
            url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
        })
            .then(data => {
                if (data.status !== 200) {
                    alert("Unable to fetch data!");
                    return;
                } else {
                    this.setState({
                        ...this.state,
                        coinList: { coins: data.data },
                        isLoading: false
                    })
                }
            })
            .catch(e => console.log(e))
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.background}>
                <h1>Coin Lists</h1>
                <div className={classes.currency}>
                    <PopupState variant="popover" popupId="demo-popup-menu">
                        {popupState => (
                            <React.Fragment>
                                <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
                                    Currencies
                                </Button>
                                <Menu {...bindMenu(popupState)}>
                                    {this.state.currency.map(value => {
                                        const val = value.data;
                                        // < MenuItem> {val}</MenuItem>
                                    })}
                                </Menu>
                            </React.Fragment>
                        )}
                    </PopupState>
                </div>
                {this.state.isLoading ?
                    <div className={classes.loader}>
                        <Loader size="md" />
                        Loading... <br />
                        Please wait.
                    </div>
                    :
                    <MaterialTable
                        title="Cryptopcurrencies"
                        columns={this.state.columns}
                        data={this.state.coinList.coins}
                        options={{
                            filtering: true,
                            pageSize: 10,
                            pageSizeOptions: [10, 25],
                            draggable: false,
                            rowStyle: {
                                backgroundColor: '#EEE',
                            }
                        }}
                        detailPanel={rowData => {
                            // console.log(rowData)
                            return <CoinDetail
                                id={rowData.id}
                                high24h={rowData.high_24h}
                                low24h={rowData.low_24h}
                                currentPrice={rowData.current_price}
                                marketCap={rowData.market_cap}
                                name={rowData.name}
                                rank={rowData.market_cap_rank}
                            />
                        }}
                        onRowClick={(event, rowData, togglePanel) => togglePanel()}
                    />
                }
            </div >
        )
    }
}

export default withStyles(useStyles)(CoinList)