import React from "react";
import { Switch, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Table from "./components/Table/Table";
import Coin from "./components/Coin/Coin";
import Investment from "./components/Investment/Investment";

export default class Routes extends React.Component {
  render() {
    const { handleChange, coinData, activePage } = this.props;
    return (
      <Switch>
        <Route
          exact
          render={() => (
            <Table
              coinData={coinData}
              handleChange={handleChange}
              activePage={activePage}
            />
          )}
          path="/"
        />
        <Route component={Coin} path="/coin/:id" />
        <Route component={Investment} coinData={coinData} path="/investment" />
      </Switch>
    );
  }
}
