import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import List from "./Components/List";
import Details from "./Components/Details";
import Transaction from "./Components/Transaction";
import TransHistory from "./Components/TransHistory";
import History from "./Components/History";

function App() {
   return (
      <div className="App">
         <BrowserRouter>
            <Switch>
               <Route exact path="/" component={List} />
               <Route path="/coinlist" component={List} />
               <Route path="/coin-history/:id" component={History} />
               <Route path="/transaction-history" component={TransHistory} />
               <Route path="/coin-details/:id" component={Details} />
               <Route path="/transaction/:id" component={Transaction} />
            </Switch>
         </BrowserRouter>
      </div>
   );
}

export default App;
