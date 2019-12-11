import React from "react";
import HomePage from "./components/HomePage/HomePage";
import Investment from "./components/Investment/Investment";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "antd/dist/antd.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
// import CoinsDetails from "./components/CoinsDetails/CoinsDetails";
// import Routes from "./routes";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route component={Investment} path="/investment" />
          <Route exact component={HomePage} path="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
