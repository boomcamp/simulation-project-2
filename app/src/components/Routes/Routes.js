import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../Home/Home";
import Details from "../Details/Details";

export default class Routes extends React.Component {
  render() {
    const {
      handleDetails,
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
              handleDetails={handleDetails}
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
        <Route path="/details/:id" render={props => <Details {...props} />} />
      </Switch>
    );
  }
}
