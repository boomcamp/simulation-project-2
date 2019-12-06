import React from "react";
import { Switch, Route } from "react-router-dom";

import CoinDetails from "./components/CoinDetails/CoinDetails";

export default function Routes() {
  return (
    <Switch>
      <Route component={CoinDetails} path="/CoinDetails" />
    </Switch>
  );
}
