import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import List from "./Components/List";
import Details from "./Components/Details";

function App() {
   return (
      <div className="App">
         <BrowserRouter>
            <Switch>
               <Route exact path="/" component={List} />
               <Route path="/coinlist" component={List} />
               <Route path="/coin-details/:id" component={Details} />
            </Switch>
         </BrowserRouter>
      </div>
   );
}

export default App;
