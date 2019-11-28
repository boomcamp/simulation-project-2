import React from "react";
import HomePage from "./components/HomePage/HomePage";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "antd/dist/antd.css";
import { BrowserRouter } from "react-router-dom";

import Routes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes />
        <HomePage />
      </div>
    </BrowserRouter>
  );
}

export default App;
