import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom'


function Header() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" className="header-container">
        <h3>Simulation Project 2</h3>
        <div className="nav-container">
          <Link to="/" className="nav-btn">Home</Link>
          <Link to="/investment" className="nav-btn">Track Investment</Link>
        </div>
      </Container>
    </React.Fragment>
  )
}

export default Header;