import React from 'react';
import './App.css';
import CoinsList from './components/CoinsList';
import InvestMentTracking from './components/InvestmentTracking';
import Routes from './Routes';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CoinDetails from './components/CoinDetails';
import Transactions from './components/Transactions';
import History from './components/History';

function App() {
  return (                                               
    <Router>
                                       
    <div className="App">                   
     <Routes/>   

     <Switch>
     <Route path='/' exact component= { CoinsList } />
     <Route path='/coindetails/:id' component= { CoinDetails } />
     <Route path='/investmenttracking' component= { InvestMentTracking } />
     <Route path='/transactions' component= { Transactions } />
     <Route path='/history' component = { History } />
     </Switch>

    </div>

    </Router>
  );
}
export default App;