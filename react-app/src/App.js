import React from "react";
import "./App.css";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import Homepage from "./components/Homepage/homepage";
import CoinList from "./components/CoinList/CoinList";
import CoinDetail from "./components/CoinDetails/CoinDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={CoinList} />
        <Route exact path="/coinlist" component={CoinList} />
        <Route exact path="/coindetail/:id" component={CoinDetail} />
      </BrowserRouter>
    </div>
  );
}

export default App;
