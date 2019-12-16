import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from './Home/Main';
import CoinList from './CoinList/CoinList';
import Tracking from './Tracking/Tracking';
import Sell from './Sell'

export default function Routes() {
    return (
        <Switch>
            <Route path="/" component={Main} exact />
            <Route path="/coinlist" component={CoinList} />
            <Route path="/tracking" component={Tracking} />
            <Route path="/sell" component={Sell} />
        </Switch>
    )
}