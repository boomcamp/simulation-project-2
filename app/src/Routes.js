import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Homepage from "./components/homepage";
import Investment from "./components/investment";


export default function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Homepage} />
      <Route path="/investment" component={Investment} />
    </BrowserRouter>
  );
}