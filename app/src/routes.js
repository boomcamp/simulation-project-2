import React from "react";
import { Route, Switch } from "react-router-dom";

import CoinList from "./component/CoinList/CoinList";
import CoinDetails from "./component/CoinDetails/CoinDetails";
import Transaction from "./component/Transaction/Transaction";
export default function Routes() {
  return (
    <Switch>
      <Route exact component={CoinList} path="/" />
      <Route component={CoinDetails} path="/coindetails/:id" />
      <Route component={Transaction} path="/transaction" />
    </Switch>
  );
}
