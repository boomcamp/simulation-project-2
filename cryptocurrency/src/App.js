import React, { Component } from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from './component/Home/home';
import Nav from './component/Header/Nav';
import Investment from './component/Investment Details/investment';
import Details from './component/Coin Details/details';
import Footer from './component/footer/footer';
export class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/investment" component={Investment}/>
            <Route path="/details/:id" component={Details}/>
          </Switch>
          <Footer />
        </div>
      </HashRouter>

    )
  }
}

export default App
