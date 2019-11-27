import React from 'react';
import './App.css';
import {Get} from './Components/API/API.js'
import {BrowserRouter as Router} from 'react-router-dom';
import Route from './Components/Routing/Route';

// import Dashboard from './Components/Divisions/Dashboard';
import MiniDrawer from './Components/Divisions/Drawer';

function App() {
  return (
    <div className="App">
      {/* <Router>
        <Route/>
      </Router> */}
      <MiniDrawer/>
    </div>
  );
}

export default App;
