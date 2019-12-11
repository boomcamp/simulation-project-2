import React from 'react'
import { SnackbarProvider } from 'notistack';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import DashBoard from "./components/Dashboard";
import InvestmentTracker from './components/investedCoins/InvestmentTracker'

export default function App() {
    return (
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={DashBoard}/>
                    <Route path="/investment-tracker" component={InvestmentTracker}/>
                </Switch>
            </BrowserRouter>
        </SnackbarProvider>

    )
}