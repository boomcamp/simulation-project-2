import React, { PureComponent, useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label
} from "recharts";

function CustomizedAxisTick({ x, y, payload }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  );
}
export default function Chart({ number }) {
  const [historicalPrice, setHistoricalPrice] = useState();
  const [loader, setLoader] = useState(false);
  let { id } = useParams();
  useEffect(() => {
    setLoader(true);
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${number}`
      )
      .then(response => {
        setLoader(false);
        let temp = [];
        response.data.prices.map(price => {
          return temp.push({
            date:
              number === "1"
                ? new Date(price[0]).toLocaleTimeString("en-US")
                : new Date(price[0]).toLocaleDateString("en-US"),
            price: price[1]
          });
        });
        setHistoricalPrice(temp);
      });
  }, [id]);
  console.log(historicalPrice);
  return (
    <LineChart
      width={1100}
      height={450}
      data={historicalPrice}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 50
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <YAxis type="number" domain={["auto", "auto"]}>
        <Label angle={270} position="left" style={{ textAnchor: "middle" }}>
          Price (USD)
        </Label>
      </YAxis>
      <XAxis dataKey="date" tick={<CustomizedAxisTick />} />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="price"
        stroke="#82ca9d"
        dot={false}
        strokeWidth="2"
      />
    </LineChart>
  );
}
