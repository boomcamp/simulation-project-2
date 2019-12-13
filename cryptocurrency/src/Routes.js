import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { Button } from '@material-ui/core';

function Routes() {

    const navstyle = {
        color:'white',
        textDecoration:'none'
    }

  return (                                                              
    <nav>
        <h3>Crypto Currency</h3>

        <ul className="router-links">

            <Link style={navstyle} to = '/'>
            <Button variant='contained'> Coins List </Button>
            </Link>

            <Link style={navstyle} to = '/investmenttracking'>
            <Button variant='contained'> Investment Tracking </Button>
            </Link>

            <Link style={navstyle} to = '/history'>
            <Button variant='contained'>History</Button>  
            </Link>
            
        </ul>
        
    </nav>        
  ); 
}
export default Routes;  