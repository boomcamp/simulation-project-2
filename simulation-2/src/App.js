import React from 'react';
import './App.css';
import {Get} from './Components/API/API.js'
import {BrowserRouter as Router, HashRouter} from 'react-router-dom';
import Route from './Components/Routing/Route';

// import Dashboard from './Components/Divisions/Dashboard';
import MiniDrawer from './Components/Divisions/Drawer';

function App() {
  return (
    <div className="App">
      <MiniDrawer/>
    </div>
  );
}

export default App;
