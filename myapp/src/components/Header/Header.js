import React, { Component } from "react";
import "./header.css";
import { BrowserRouter, Link,Route } from "react-router-dom";
import InvestmentTransactions from "../Investment/InvestmentTransactions"
export default class Header extends Component {
  render() {
    return (
      <div>
        <div className="head">
          
         
          <Link to="/">
              {" "}<h2 className="head1">Crypto Currencies</h2>
            </Link>
            <Link to="/invest">
              {" "}
              <h5 className="invest">Investment Transactions</h5>
            </Link>
           
    
        </div>
      </div>
    );
  }
}
