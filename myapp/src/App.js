import React from "react";
import HomePage from "./components/HomePage/HomePage";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "antd/dist/antd.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CoinsDetails from "./components/CoinsDetails/CoinsDetails";
// import Routes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route component={CoinsDetails} path="/CoinsDetails" />
          <Route exact component={HomePage} path="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
