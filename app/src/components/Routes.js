import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from './Home/Main';
import CoinList from './CoinList/CoinList';
import CoinDetail from './CoinDetail/CoinDetail';
import Tracking from './Tracking/Tracking';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" component={Main} exact />
            <Route path="/coinlist" component={CoinList} />
            <Route path="/coindetail" component={CoinDetail} />
            <Route path="/tracking" component={Tracking} />
        </Switch>
    )
}