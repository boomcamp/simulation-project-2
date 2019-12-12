import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import List from "./Components/List";
import Details from "./Components/Details";
import Transaction from "./Components/Transaction";
import InvestmentTracking from "./Components/InvestmentTracking";
import History from "./Components/History";

function App() {
   return (
      <div className="App">
         <BrowserRouter>
            <Switch>
               <Route exact path="/" component={List} />
               <Route path="/coinlist" component={List} />
               <Route
                  path="/investment-tracking"
                  component={InvestmentTracking}
               />
               <Route path="/transaction-history" component={History} />
               <Route path="/coin-details/:id" component={Details} />
               <Route path="/transaction/:id" component={Transaction} />
            </Switch>
         </BrowserRouter>
      </div>
   );
}

export default App;
