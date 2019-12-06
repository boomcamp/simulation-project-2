import React from 'react';
import { Route,Switch } from 'react-router-dom';
import CoinList from './Components/CoinList/CoinList';
import Coin from './Components/Coin/Coin';

function Routes() {
  return(
    <Switch>
      <Route component={CoinList} exact path="/" />
      <Route component={Coin} path="/:coin" />
    </Switch>
  );
}

export default Routes;