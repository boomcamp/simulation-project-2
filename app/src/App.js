import React from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import Navbar from './components/Navbar';
import Routes from './components/Routes';


export default function App() {
  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <Navbar />
        <Routes />
      </div>
    </div>
  );
}