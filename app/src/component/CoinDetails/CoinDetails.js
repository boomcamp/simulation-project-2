import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Chart from "../chart.js";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: linear-gradient(green, yellow);
  height: 100vh;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
  width: 90%;
  padding: 20px;
`;
const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Btn = styled.button`
  border: 1px solid black;
  background: transparent;
  border-radius: 5px;
`;
export default function CoinDetails({ match }) {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${match.params.id}`)
      .then(res => {
        console.log(res.data);
        setDetails(res.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, []);
  return (
    <>
      {loading ? (
        <Loading>loading...</Loading>
      ) : (
        <Main>
          <Container>
            <img
              style={{ margin: "20px 20px", width: "50%" }}
              src={details.image.large}
            ></img>
            <div>{details.description.en}</div>
          </Container>
          <Container style={{ flexDirection: "column" }}>
            <div style={{ marginLeft: "86%", paddingBottom: 20 }}>
              <Btn>24hr</Btn>
              <Btn>30d</Btn>
              <Btn>6m</Btn>
              <Btn>1y</Btn>
              <Btn>Max</Btn>
            </div>
            <Chart />
          </Container>
        </Main>
      )}
    </>
  );
}
