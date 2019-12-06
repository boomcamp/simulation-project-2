import React, { Component } from "react";
import Header from "./components/header";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Coins from "./components/coins";
import Main from "./components/main";

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Header />
          {/* <Coins /> */}
          <Route exact path="/" component={Main} />
          <Route path="/coins/:id" component={Coins} />
        </Router>
      </React.Fragment>
    );
  }
}
