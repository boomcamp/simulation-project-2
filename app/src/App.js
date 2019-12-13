import React, { Component } from "react";
import Header from "./components/header";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Coins from "./components/coins";
import Main from "./components/main";
import Transaction from "./components/transaction";
import "antd/dist/antd.css";

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Header />
          <Route exact path="/" component={Main} />
          <Route path="/coins/:id" component={Coins} />
          <Route path="/transaction" component={Transaction} />
        </Router>
      </React.Fragment>
    );
  }
}
