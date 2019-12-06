import React from "react";
import "../../App.css";
import { Link, Switch, Route } from "react-router-dom";

export default class Coindetail extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">
          <button>back</button>
        </Link>
        <Switch>
          <Route />
        </Switch>
        <div className="table-cont"></div>
      </div>
    );
  }
}
