import React from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { HashRouter, Link } from "react-router-dom";
import Routes from "./routes";

import Pagination from "./components/Pagination/Pagination";
import MaterialTable from "material-table";

export default class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <div className="header">CRYPTOCURRENCY</div>
          <div className="main-cont">
            <Pagination />
          </div>
          <Routes />
        </div>
      </HashRouter>
    );
  }
}
