import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../Home/Home";
import Coins from "../Coins/Coins";

export default class Routes extends React.Component {
  render() {
    const {
      data,
      currentPage,
      currency,
      handleSelect,
      loading,
      handlePagination,
      currencies
    } = this.props;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Home
              currency={currency}
              handleSelect={handleSelect}
              handlePagination={handlePagination}
              data={data}
              loading={loading}
              currentPage={currentPage}
              currencies={currencies}
            />
          )}
        />
        <Route
          path="/coins/:id"
          render={props => <Coins {...props} currency={currency} />}
        />
      </Switch>
    );
  }
}
