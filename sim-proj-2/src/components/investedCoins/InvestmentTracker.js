import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Title from '../tools/Title'
import NavBar from '../tools/NavBar'
import InvestedCoinsTable from './InvestedCoinsTable'
import axios from 'axios'

// import Copyright from '../tools/Copyright'
// import Box from '@material-ui/core/Box';

export default function InvestmentTracker() {
    const [investedCoin, setInvestedCoin] = useState([])
    
    useEffect(() => {
        let isCancelled=false;
        axios
          .get(`http://localhost:4000/transactions`)
          .then(res => {
                let temp=[]
                res.data.map(x => {
                    return axios
                        .get(`https://api.coingecko.com/api/v3/coins/${x.coinId}`)
                        .then(res => {
                            x.img = res.data.image.large
                            x.coin = {name: res.data.name, sym: res.data.symbol}
                            x.current_price = res.data.market_data.current_price.usd
                            temp.push(res.data)
                        })            
                })
                if(!isCancelled)
                    setInvestedCoin(res.data)
          })
        return () => { isCancelled=true };
    }, [])
    
    return (
        <div style={{display:`flex`}}>
            <NavBar />

                <Grid container spacing={3} style={{margin:`100px 100px 100px 100px`, height:`100vh`}}>
                    <Grid item xs={4} >
                        <Paper style={{height:`250px`, padding:`20px`}}>
                            <Title>Total Profit/Loss</Title>
                        </Paper>
                    </Grid>

                    <Grid item xs={8} >
                        <InvestedCoinsTable investedCoin={investedCoin}/>
                    </Grid>
                </Grid>

                {/* <Box pt={4}>
                    <Copyright />
                </Box> */}
        </div>
    )
}
