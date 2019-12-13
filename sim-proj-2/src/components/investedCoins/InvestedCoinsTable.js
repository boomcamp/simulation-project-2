import React, {useState, useEffect, createRef} from 'react';
import Sell from '@material-ui/icons/MoneyOffOutlined';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios'

import CryptoSell from './CryptoSell'

const useStyles = makeStyles(theme => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      width:'25%',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #000',
      borderRadius: '8px',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

export default function InvestedCoinsTable({walletFn, tableRefFn}) { 
    const tableRef = createRef();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true)
    const [sellCoin, setSellCoin] = useState({  coin:{name: "", sym: ""}, 
                                                amountBuy: 0
                                            })
    const [state] = useState({
        columns: [
            {   title:"",
                render: rowData => (
                    <img src={rowData.img}alt="logo" width="50" />
                ),
                cellStyle:{padding:`3px 3px 3px 0`, textAlign:`right`},
                headerStyle:{padding:`0`},
                sorting:false
            },
            {   title: 'Coin', field: 'coin.name', 
                render: rowData => (
                            <div>
                                <b>{rowData.coin.name}</b> 
                                <i> ({rowData.coin.sym.toUpperCase()})</i>
                            </div>
                        )
            },
            { title: 'Current Price', field: 'current_price', cellStyle: {color: `#428bca`, textAlign:`center`}, headerStyle:{textAlign:`center`},
                render: rowData => (
                            <div>
                                <p>${rowData.current_price}</p>
                            </div>
                )
            },
            { title: 'Amount Invested (USD)', field: 'amountBuy', headerStyle:{textAlign:`center`}, cellStyle:{textAlign:`center`},
                render: rowData => (
                        <div>
                            <p>${Math.round(rowData.amountBuy * 100) / 100}</p>
                        </div>
                )
            },
            { title: "Amount Invested (Coin)", headerStyle:{textAlign:`center`}, cellStyle:{textAlign:`center`},
                render: rowData => (
                    <div>{(rowData.amountBuy/rowData.current_price).toFixed(2)} {rowData.coin.sym.toUpperCase()}</div>
                )
            },
            { title: 'Profit/Loss', field: 'profitOrLoss', type:'numeric',
                render: rowData => (
                        <div>
                            <p style={{fontWeight:`600`, fontStyle:`italic  `}}> $ {Math.round(rowData.profitOrLoss * 100) / 100} 
                                { (rowData.profitOrLoss<0) ? <i style={{color:`red`}}> ▼ </i> : <i style={{color:`green`}}> ▲ </i> }
                            </p>
                        </div>
                    ) 
            },
        ],
        data: [],
    });

    useEffect(() => {
        tableRefFn(tableRef)
        return () => {  };
    }, [tableRefFn, tableRef])

    const handleRefreshTable = () => {
        tableRef.current && tableRef.current.onQueryChange()
    }

    // const headerStyle={ textAlign: `left`, 
    //                     color: `white`, 
    //                     backgroundColor: `#3f51b5`, 
    //                     padding: `30px`,
    //                     margin: `0`}
    
    return (
        <React.Fragment>
            <MaterialTable
                title="Investment Tracker"
                components={{
                    // Toolbar: props => ( <div>
                    //                         <h2 className="tableHeader" style={headerStyle}>Invested Cryptocurrency Coins</h2>
                    //                         {/* <p>1234</p> */}
                    //                     </div>),
                    }}
                columns={state.columns}
                // data={state.data}
                data = {query =>
                    new Promise((resolve, reject) => {
                        axios.get(`http://localhost:4000/transactions`)
                            .then(trans => {
                                // var temp=[];
                                    trans.data.map(x => {
                                        return axios
                                            .get(`https://api.coingecko.com/api/v3/coins/${x.coinId}?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
                                            .then(res => {
                                                // x.img = res.data.image.large
                                                // x.coin = {name: res.data.name, sym: res.data.symbol}
                                                x.current_price = res.data.market_data.current_price.usd
                                                x.profitOrLoss = (res.data.market_data.current_price.usd * x.amountBuy) - (x.coinPrice * x.amountBuy)
                                                // temp.push(res.data)
                                                axios.patch(`http://localhost:4000/transactions/${x.id}`,{ 
                                                    "profitOrLoss": (res.data.market_data.current_price.usd * x.amountBuy) - (x.coinPrice * x.amountBuy)
                                                })

                                                setTimeout(()=> {
                                                    resolve({
                                                        data: trans.data,
                                                        page: query.page,
                                                        totalCount: trans.data.length,
                                                    })
                                                    setLoading(false)
                                                }, 1000)
                                            })
                                    })
                            })                            
                    })
                }
                tableRef={tableRef}
                options={{
                    // pageSize: 10,
                    headerStyle: {
                        fontWeight: `bold`,
                        textTransform:'uppercase',
                    },
                    loadingType: "linear",
                    search:false
                }}
                isLoading={loading}
                actions={[
                    {
                        icon: () => <Sell style={{color:`red`}}/>,
                        tooltip: 'Sell',
                        onClick: (e, rowData) => {
                            setOpen(true); 
                            setSellCoin(rowData)
                        }
                    },
                    {
                        icon: 'refresh',
                        tooltip: 'Refresh Data',
                        isFreeAction: true,
                        onClick: () => {handleRefreshTable()} //tableRef.current && tableRef.current.onQueryChange(), //(console.log(tableRef))
                    }
                ]}
            />

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        {/* {sellCoin.coin.name}  */}
                        <CryptoSell maxSell={Number(sellCoin.amountBuy)}
                                    img={sellCoin.img}
                                    coin={sellCoin.coin}
                                    current_price = {sellCoin.current_price}
                                    closeFn={() => setOpen(false)}
                                    coinId={sellCoin.id}
                                    refreshTableFn={handleRefreshTable}
                                    walletFn={walletFn}
                                    />
                    </div>
                </Fade>
            </Modal>
        </React.Fragment>
    );
}