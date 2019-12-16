import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Title from '../tools/Title'
import NavBar from '../tools/NavBar'
import InvestedCoinsTable from './InvestedCoinsTable'
import axios from 'axios'
import Logo from '../../assest/logo.gif'
import CryptoBuy from './CryptoBuy'
import TransactionHistory from '../TransactionHistory'

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// import Copyright from '../tools/Copyright'
// import Box from '@material-ui/core/Box';

function TabPanel({ children, value, index, ...other }) {  
    return (
      <div
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`wrapped-tabpanel-${index}`}
        aria-labelledby={`wrapped-tab-${index}`}
        {...other}
      >
        {value === index && <div style={{padding:`0`}}>{children}</div>}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `wrapped-tab-${index}`,
      'aria-controls': `wrapped-tabpanel-${index}`,
    };
  }
  
export default function InvestmentTracker() {
    var tempTableRef;
    const [profitLoss, setProfitLoss] = useState(0)

    const [value, setValue] = React.useState('one');
  
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

                        {/* <Paper>
                            <TransactionHistory />
                        </Paper> */}
                    </Grid>

                    <Grid item xs={8}>
                        {/* <InvestedCoinsTable walletFn={(wallet) => setProfitLoss(wallet)}
                                            tableRefFn={(tableRef) => tempTableRef = tableRef }/> */}

                        <AppBar position="static">
                            <Tabs value={value} onChange={(event, newValue) => setValue(newValue)} aria-label="transaction_history-invesment">
                                <Tab value="one" label="Investment Tracker" wrapped {...a11yProps('one')}
                                />
                                <Tab value="two" label="Transaction History" {...a11yProps('two')} />
                            </Tabs>
                        </AppBar>
                        
                        <TabPanel value={value} index="one" style={{padding:`0`}}>
                            <InvestedCoinsTable walletFn={(wallet) => setProfitLoss(wallet)}
                                                tableRefFn={(tableRef) => tempTableRef = tableRef }
                                                value={value} index="one"/> 
                        </TabPanel>
                        <TabPanel value={value} index="two">
                            <TransactionHistory value={value} index="two"/>
                        </TabPanel>     

                    </Grid>
                </Grid>

                {/* <Box pt={4}>    
                    <Copyright />
                </Box> */}
        </div>
    )
}