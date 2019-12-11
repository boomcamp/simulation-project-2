import React, {useState, useEffect} from 'react';
import Sell from '@material-ui/icons/MoneyOffOutlined';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

export default function InvestedCoinsTable({investedCoin}) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true)
    const [sellCoin, setSellCoin] = useState({  coin:{name: "", sym: ""}

                                            })
    const [state, setState] = useState({
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
            { title: 'Current Price', field: 'current_price',
                render: rowData => (
                            <div>
                                <p>${rowData.current_price}</p>
                            </div>
                )
            },
            { title: 'Amount Invested', field: 'amountBuy',
                render: rowData => (
                        <div>
                            <p>${rowData.amountBuy}</p>
                        </div>
                )
            },
            { title: 'Profit/Loss', field: 'profitOrLoss', type:'numeric',
                render: rowData => (
                        <div>
                            <p style={{color: (rowData.profitOrLoss<0) ? `red` : `green`}}>{rowData.profitOrLoss}%</p>
                        </div>
                    ) 
            },
        ],
        data: [],
    });

    useEffect(() => {
        let isCancelled=false
            setTimeout(()=>{
                if(!isCancelled){
                    setState(prevData => {return {...prevData, data: investedCoin}})
                    setLoading(false)
                }
            }, 3000)

        return () => { isCancelled=true };

    }, [investedCoin])

    const headerStyle={ textAlign: `left`, 
                        color: `white`, 
                        backgroundColor: `#3f51b5`, 
                        padding: `30px`,
                        margin: `0`}
    return (
        <React.Fragment>
            <MaterialTable
                components={{
                    Toolbar: props => <h2 className="tableHeader" style={headerStyle}>Invested Cryptocurrency Coins</h2>
                }}
                columns={state.columns}
                data={state.data}
                options={{
                    pageSizeOptions: [5,10,20,50,100],
                    headerStyle: {
                    fontWeight: `bold`,
                    },
                    loadingType: "linear",
                }}
                isLoading={loading}
                actions={[
                    {
                    icon: () => <Sell style={{color:`red`}}/>,
                    tooltip: 'Sell',
                    //   onClick: (event, rowData) => alert("You saved " + rowData.name)
                    onClick: (e, rowData) => {setOpen(true); setSellCoin(rowData)}
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
                        {sellCoin.coin.name} 
                    </div>
                </Fade>
            </Modal>
        </React.Fragment>
    );
}