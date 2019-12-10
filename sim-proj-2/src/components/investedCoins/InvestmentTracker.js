import React from 'react'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Title from '../tools/Title'

import NavBar from '../tools/NavBar'
import InvestedCoinsTable from './InvestedCoinsTable'
import Copyright from '../tools/Copyright'

export default function InvestmentTracker() {
    return (
        <div style={{display:`flex`}}>
            <NavBar />

            {/* <Container  > */}
                <Grid container spacing={3} style={{margin:`100px 100px 100px 100px`, height:`100vh`}}>
                    <Grid item xs={4} >
                        <Paper style={{height:`250px`, padding:`20px`}}>
                            <Title>Total Profit/Loss</Title>
                        </Paper>
                    </Grid>

                    <Grid item xs={8} >
                        <InvestedCoinsTable />
                    </Grid>
                </Grid>

                {/* <Box pt={4}>
                    <Copyright />
                </Box> */}
            {/* </Container> */}
        </div>
    )
}
