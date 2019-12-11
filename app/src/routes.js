import React from "react";
import { Switch, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

import CoinDetails from "./components/coinDetails/coinDetails";
import ChartInfo from "./components/chartInfo/chartInfo";
import InvestmentTrack from "./components/investmentTrack/investmentTrack";

export default class Routes extends React.Component {
  render() {
    const { handleOnChange, coinData, activePage } = this.props;
    return (
      <Switch>
        <Route
          exact
          render={() => (
            <div>
              <div className="table-cont">
                <CoinDetails
                  coinData={coinData}
                  handleOnChange={handleOnChange}
                  activePage={activePage}
                />
              </div>
            </div>
          )}
          path="/"
        />
        <Route component={ChartInfo} path="/chartInfo/:id" />
        <Route component={InvestmentTrack} path="/investmentTrack" />
      </Switch>
    );
  }
}
