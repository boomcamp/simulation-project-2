import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Home from './Components/Home'
import Investment from './Components/Investment'



export default class App extends Component{

  render(){
    return (
      
      <Router>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/investment" component={Investment} />
        </Switch>
          
      </Router>
    );
  }
}
