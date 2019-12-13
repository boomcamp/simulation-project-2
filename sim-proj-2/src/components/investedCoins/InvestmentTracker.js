import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Title from '../tools/Title'
import NavBar from '../tools/NavBar'
import InvestedCoinsTable from './InvestedCoinsTable'
import axios from 'axios'
import Logo from '../../assest/logo.gif'
import CryptoBuy from '../CryptoBuy'

// import Copyright from '../tools/Copyright'
// import Box from '@material-ui/core/Box';

export default function InvestmentTracker() {
    var tempTableRef;
    const [profitLoss, setProfitLoss] = useState(0)
    
    useEffect(() => {
        axios
            .get(`http://localhost:4000/wallet`)
            .then(res => {
                setProfitLoss(res.data.amount)
            })
        return () => { };
    }, [])

    return (
        <div style={{display:`flex`}}>
            <NavBar />

                <Grid container spacing={3} style={{margin:`100px`}}>
                    <Grid item xs={4} >
                        <Paper style={{height:`250px`,padding:`20px`,display:`flex`}}>
                            <img src={Logo} alt="logo" width="200"/> 
                            <div style={{marginLeft:`25px`}}>
                                <Title>My Wallet: </Title>
                                <p style={{fontSize:`65px`, margin:`0`, opacity:`0.70`}}><sup>$</sup> 
                                    {profitLoss.toFixed(2)}
                                </p>
                            </div>
                        </Paper>

                        <Paper>
                            <CryptoBuy boughtFn={() => tempTableRef.current && tempTableRef.current.onQueryChange()} />
                        </Paper>
                    </Grid>

                    <Grid item xs={8} >
                        <InvestedCoinsTable walletFn={(wallet) => setProfitLoss(wallet)}
                                            tableRefFn={(tableRef) => tempTableRef = tableRef }/>
                    </Grid>
                </Grid>

                {/* <Box pt={4}>    
                    <Copyright />
                </Box> */}
        </div>
    )
}
