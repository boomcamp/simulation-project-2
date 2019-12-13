import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import InvestmentTransactions from "./components/Investment/InvestmentTransactions";
import Header from "./components/Header/Header";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Switch>
          <Route exact component={Homepage} path="/" />
          <Route component={InvestmentTransactions} path="/invest" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
