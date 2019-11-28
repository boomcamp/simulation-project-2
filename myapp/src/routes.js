import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./components/HomePage/HomePage";
import CoinsDetails from "./components/CoinsDetails/CoinsDetails";
export default function Routes() {
  return (
    <Switch>
      <Route exact component={HomePage} path="/" />
      <Route component={CoinsDetails} path="/coinsdetails" />
    </Switch>
  );
}
