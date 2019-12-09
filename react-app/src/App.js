import React from "react";
import "./App.css";
import { Route, BrowserRouter } from "react-router-dom";
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
