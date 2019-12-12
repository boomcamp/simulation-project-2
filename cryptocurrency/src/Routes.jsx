import React from 'react';
import { Route,Switch } from 'react-router-dom';
import CoinList from './Components/CoinList/CoinList';
import Coin from './Components/Coin/Coin';
import TrackInvestment from './Components/Tracking/TrackInvestment';

function Routes() {
  return(
    <Switch>
      <Route component={CoinList} exact path="/" />
      <Route component={Coin} path="/coins/:coin" />
      <Route component={TrackInvestment} path="/track-investment" />
    </Switch>
  );
}

export default Routes;