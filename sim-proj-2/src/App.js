import React from 'react'
import { SnackbarProvider } from 'notistack';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import DashBoard from "./components/Dashboard";
import InvestmentTracker from './components/investedCoins/InvestmentTracker'
import TransactionHistory from './components/investedCoins/TransactionHistory'

export default function App() {
    return (
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={DashBoard}/>
                    <Route path="/investment-tracker" component={InvestmentTracker}/>
                    <Route path="/transaction-history" component={TransactionHistory}/>
                </Switch>
            </BrowserRouter>
        </SnackbarProvider>

    )
}