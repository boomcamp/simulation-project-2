import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
// import { ArrowDropDownIcon } from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
// import { Button, Menu, MenuItem } from '@material-ui/core';
// import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import MaterialTable from 'material-table';
import axios from 'axios';
import { Loader } from 'rsuite';
import Tooltip from '@material-ui/core/Tooltip';

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
            currency: [],
            open: false,
            anchorRef: null,
            selectedIndex: 1,
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
            .catch(e => console.log(e))

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

    handleClick = () => {
        console.log(`You clicked ${this.state.currency[this.state.selectedIndex]}`);
    };

    handleMenuItemClick = (event, index) => {
        // axios({
        //     method: 'get',
        //     url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
        // })
        //     .then(data => {
        //         if (data.status !== 200) {
        //             alert("Unable to fetch data!");
        //             return;
        //         } else {
        //             this.setState({
        //                 ...this.state,
        //                 coinList: { coins: data.data },
        //                 isLoading: false
        //             })
        //         }
        //     })
        //     .catch(e => console.log(e))
        this.setState({
            ...this.state,
            selectedIndex: index,
            open: false
        })
    };

    handleToggle = () => {
        this.setState({
            ...this.state,
            open: prevOpen => !prevOpen
        })
    };

    handleClose = event => {
        if (this.state.anchorRef.current && this.state.anchorRef.current.contains(event.target)) {
            return;
        }
        this.setState({
            ...this.state,
            open: false
        })
    };

    render() {
        const { classes } = this.props;
        const { open, anchorRef, selectedIndex, currency } = this.state
        return (
            <div className={classes.background}>
                <h1>Coin Lists</h1>
                <div className={classes.currency}>
                    <Grid container direction="column" alignItems="flex-end">
                        <Grid item xs={12}>
                            <Tooltip title="Currency List - BETA(In Progress)" arrow>
                                <ButtonGroup disabled variant="contained" color="secondary" ref={anchorRef} aria-label="split button">
                                    <Button onClick={this.handleClick}>{currency[selectedIndex]}</Button>
                                    <Button
                                        color="primary"
                                        size="small"
                                        aria-controls={open ? 'split-button-menu' : undefined}
                                        aria-expanded={open ? 'true' : undefined}
                                        aria-label="select merge strategy"
                                        aria-haspopup="menu"
                                        onClick={this.handleToggle}
                                    >
                                        {/* <ArrowDropDownIcon /> */}
                                    </Button>
                                </ButtonGroup>
                            </Tooltip>
                            <Popper open={open} role={undefined} transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{
                                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                                        }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={this.handleClose}>
                                                <MenuList id="split-button-menu">
                                                    {currency.map((option, index) => (
                                                        <MenuItem
                                                            key={option}
                                                            selected={index === selectedIndex}
                                                            onClick={event => this.handleMenuItemClick(event, index)}
                                                        >
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </Grid>
                    </Grid>
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
                            console.log(rowData.data)
                            return <CoinDetail
                                symbol={rowData.symbol}
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