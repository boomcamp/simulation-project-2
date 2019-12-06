import React from "react";
import { Switch, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Pagination } from "semantic-ui-react";
import Table from "./components/Table/Table";
import Coindetail from "./components/Coindetail/Coindetail";

export default class Routes extends React.Component {
  render() {
    const { handleChange, coinData, activePage } = this.props;
    return (
      <Switch>
        <Route
          exact
          render={() => (
            <div>
              <div className="table-cont">
                <Pagination
                  activePage={activePage}
                  onPageChange={handleChange}
                  totalPages={125}
                  ellipsisItem={null}
                />
                <Table coinData={coinData} />
              </div>
            </div>
          )}
          path="/"
        />
        <Route component={Coindetail} path="/coindetails" />
      </Switch>
    );
  }
}
