import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import DashBoard from "./components/Dashboard";
import InvestmentTracker from './components/investedCoins/InvestmentTracker'

export default function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={DashBoard}/>
                <Route path="/investment-tracker" component={InvestmentTracker}/>
            </Switch>
        </BrowserRouter>
    )
}