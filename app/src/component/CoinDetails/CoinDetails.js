import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Chart from "../Chart/Chart.js";
import Tabs from "../Tabs/Tabs";
import CircularProgress from "@material-ui/core/CircularProgress";

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
const Word = styled.div`
  text-transform: uppercase;
  font-size: 40px;
  margin-top: 15px;
`;
const Details = styled.div`
  display: flex;
  margin-top: 50px;
  flex-direction: column;
  width: 90%;
  padding: 20px;
`;

export default function CoinDetails({ match }) {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState([]);
  const [chart, setChart] = useState([]);
  const [days, setDays] = useState(0);

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

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${match.params.id}/market_chart?vs_currency=usd&days=${days}`
      )
      .then(res => {
        const output = res.data.prices.map(([date, price]) => {
          date = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
          }).format(date);
          return { date, price };
        });
        setChart(output);
      });
  }, [days]);
  return (
    <>
      {loading ? (
        <Loading>
          {" "}
          <CircularProgress disableShrink />{" "}
        </Loading>
      ) : (
        <Main>
          <Container>
            <img
              style={{ margin: "20px 20px", width: "15%" }}
              src={details.image.large}
            ></img>
            <Details>
              <Word>
                {details.localization.en} ({details.symbol})
              </Word>
              <Word style={{ fontSize: 20 }}>
                Rank: {details.coingecko_rank}
              </Word>
              <Word style={{ fontSize: 20 }}>
                Current Price:{" "}
                {details.market_data.current_price.usd
                  ? `$${details.market_data.current_price.usd.toLocaleString()}`
                  : ""}
              </Word>
              <Word style={{ fontSize: 20 }}>
                Market Cap:{" "}
                {details.market_data.market_cap.usd
                  ? `$${details.market_data.market_cap.usd.toLocaleString()}`
                  : ""}
              </Word>
              <Word style={{ fontSize: 20 }}>
                24 Hour Trading Vol:{" "}
                {details.market_data.total_volume.usd
                  ? `$${details.market_data.total_volume.usd.toLocaleString()}`
                  : ""}
              </Word>
            </Details>
            <Details style={{ alignItems: "center" }}>
              <Word style={{ fontSize: 20 }}>
                Circulating Supply:{" "}
                {details.market_data.circulating_supply
                  ? details.market_data.circulating_supply.toLocaleString()
                  : ""}
              </Word>
              <Word style={{ fontSize: 20 }}>
                24h Low / 24h High:{" "}
                {details.market_data.low_24h.usd
                  ? `$${details.market_data.low_24h.usd.toLocaleString()}`
                  : "   -"}{" "}
                /
                {details.market_data.high_24h.usd
                  ? `$${details.market_data.high_24h.usd.toLocaleString()}`
                  : "   -"}
              </Word>
              <Word style={{ fontSize: 20 }}>
                Bitcoin Ratio / {match.params.id}: 1 BTC ={" "}
                {1 / details.market_data.current_price.btc
                  ? (1 / details.market_data.current_price.btc).toLocaleString()
                  : " 0 "}{" "}
                {details.symbol}
              </Word>
            </Details>
          </Container>
          <Container
            style={{
              flexDirection: "column",
              border: "1px solid green",
              borderRadius: 10
            }}
          >
            <Tabs setDays={setDays} />
            <Chart chart={chart} />
          </Container>
        </Main>
      )}
    </>
  );
}
