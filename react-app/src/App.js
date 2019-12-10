import React from "react";
import "./App.css";
import { Route, BrowserRouter } from "react-router-dom";
import CoinList from "./components/CoinList/CoinList";
import CoinDetail from "./components/CoinDetails/CoinDetail";
import Tracking from "./components/Tracking/Tracking";
import BuySell from "./components/BuySell/BuySell";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={CoinList} />
        <Route exact path="/coinlist" component={CoinList} />
        <Route exact path="/investment-tracking" component={Tracking} />
        <Route exact path="/coindetail/:id" component={CoinDetail} />
        <Route exact path="/buysell/:id" component={BuySell} />
      </BrowserRouter>
    </div>
  );
}

export default App;
