import React, { Component } from 'react';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import axios from 'axios';
import { Loader } from 'rsuite';

const useStyles = (theme => ({
    background: {
        display: "flex",
        flexDirection: "column",
        justifyContent: 'flex-start',
        padding: 30,
        background: 'rgb(82, 86, 89)',
        color: ' #fff',
        width: "100%"
    },
    loader: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}));

class CoinList extends Component {
    constructor(props) {
        super(props);
        this.theme = createMuiTheme({
            palette: {
                primary: {
                    main: '#4caf50',
                },
                secondary: {
                    main: '#ff9100',
                },
            },
        });
        this.state = {
            coinList: {
                coins: []
            },
            isLoading: true,
            columns: [
                { title: 'Rank #', field: 'market_cap_rank' },
                { title: 'ID', field: 'id' },
                {
                    title: 'Coin Logo', field: 'image',
                    render: rowData => <img src={rowData.image} style={{ width: 25, borderRadius: '50%' }} />
                },
                { title: 'Coin Name', field: 'name' },
                { title: 'Symbol', field: 'symbol' },
                { title: 'Current Price', field: 'current_price' },
            ],
        }
    }

    componentDidMount = () => {
        axios({
            method: 'get',
            url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
        })
            .then(data => {
                console.log(data.data)
                if (data.status !== 200) {
                    alert("Unable to fetch data!")
                } else {
                    this.setState({
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
            <div className={classes.background} >
                <h1>Coin Lists</h1>
                {this.state.isLoading ?
                    <div className={classes.loader}>
                        <Loader size="md" content="loading..." />
                    </div>
                    :
                    <MuiThemeProvider theme={this.theme}>
                        <MaterialTable
                            title="Cryptopcurrencies"
                            columns={this.state.columns}
                            data={this.state.coinList.coins}
                            options={{
                                filtering: true,
                                pageSize: 10,
                                pageSizeOptions: [10, 25, 50],
                                // draggable: false
                                rowStyle: {
                                    backgroundColor: '#EEE',
                                }
                            }}
                        />
                    </MuiThemeProvider>
                }

            </div>
        )
    }
}

export default withStyles(useStyles)(CoinList)