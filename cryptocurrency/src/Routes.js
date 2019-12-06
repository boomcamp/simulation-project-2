import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Routes() {

    const navstyle = {
        color:'white'
    }

  return (                                                              
    <nav>
        <h3>Crypto Currency</h3>

        <ul className="router-links">

            <Link style={navstyle} to = '/'>
            <li> Coins List </li>
            </Link>

            <Link style={navstyle} to = '/investmenttracking'>
            <li> Investment Tracking </li>
            </Link>
    
        </ul>
    </nav>        
  );
}
export default Routes;