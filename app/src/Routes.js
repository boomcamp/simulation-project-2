import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Homepage from "./components/homepage";
import Details from "./components/details";


export default function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/details" component={Details} />
    </BrowserRouter>
  );
}