import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  ComposedChart,
  Line,
  Bar,
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
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});
const circulatingFormat = num => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
const CustomTooltip = props => {
  // console.log(props);
  if (props.active) {
    return (
      <div className="hover-custom-tooltip">
        <p className="time-hover">{`${props.label}`}</p>
        <p className="price-hover">
          Price: {`${formatter.format(props.payload[0].value)}`}
        </p>
        <p className="volume-hover">
          Volume:{" "}
          {`${"$" + circulatingFormat(Math.round(props.payload[1].value))}`}
        </p>
      </div>
    );
  }
  return null;
};
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
        response.data.prices.map((price, i) => {
          return temp.push({
            date:
              number === "1"
                ? new Date(price[0]).toLocaleTimeString("en-US")
                : new Date(price[0]).toLocaleDateString("en-US"),
            price: price[1],
            volume: response.data.total_volumes[i][1]
          });
        });
        setHistoricalPrice(temp);
      });
  }, [id]);

  return (
    <div>
      {loader ? (
        <div
          style={{
            width: 1000,
            height: 380,
            marginTop: 20,
            marginRight: 30,
            marginLeft: 20,
            marginBottom: 50,
            borderRadius: "0px",
            backgroundColor: "white",
            paddingTop: 100
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <ComposedChart
          width={1235}
          height={450}
          data={historicalPrice}
          margin={{
            top: 10,
            right: 20,
            bottom: 45,
            left: 20
          }}
          padding={0}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis
            type="number"
            dataKey="price"
            domain={["auto", "auto"]}
            padding={{ bottom: 60 }}
          >
            <Label
              angle={270}
              position="left"
              offset={8}
              style={{ textAnchor: "middle" }}
            >
              Price (USD)
            </Label>
          </YAxis>
          <YAxis
            dataKey="volume"
            yAxisId="left"
            tickLine={true}
            axisLine={false}
            orientation="right"
            domain={[dataMin => 0, dataMax => dataMax * 4]}
            padding={{ bottom: 0 }}
          >
            <Label
              angle={270}
              position="right"
              offset={15}
              style={{ textAnchor: "middle" }}
            >
              Volume
            </Label>
          </YAxis>
          <XAxis dataKey="date" tick={<CustomizedAxisTick />} />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#6fc5d5"
            dot={false}
            strokeWidth="2.3"
          />
          <Bar
            dataKey="volume"
            yAxisId="left"
            fill="#2aa1a7"
            domain={["auto", "auto"]}
          />
        </ComposedChart>
      )}
    </div>
  );
}
