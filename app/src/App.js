import React, { useState, useEffect } from "react";
// import logo from './logo.svg';
import "./App.css";
import axios from "axios";
import Routes from "./Routes"

function App() {
  // const [GetCoins, setGetCoins] = useState([]);

  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   getData();
  // }, []);

  // function filterData (data) {
    
  //   if(!data){
  //     return null
  //   }
    
  //   console.log("Data => " , data)
  //   data.map(item => {
  //     // axios.get(`https://api.coingecko.com/api/v3/coins/${item.id}`)
  //     // .then(result => {
  //       // console.log("Res" , result.data)
  //     })
  //     // console.log(item.id)
  //   })

  // }

  // function getData() {
  //   setLoading(true);
  //   axios.get("https://api.coingecko.com/api/v3/coins/list").then(result => {
  //     setLoading(false);
  //     setGetCoins(result.data);
  //   });

  // }
  // // console.log("adas" , GetCoins)

  return (
    <div className="app">
      <Routes />
    </div>
    // <React.Fragment>
    //   {loading ? (
    //     <h1>LOADING</h1>
    //   ) : (
    //     <div>
    //       {
    //         // filterData(GetCoins)
    //       }
    //     </div>
    //   )}
    // </React.Fragment>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
