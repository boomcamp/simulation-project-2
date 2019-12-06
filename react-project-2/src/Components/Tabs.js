import React, { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label } from "recharts";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useParams } from "react-router-dom";

const useStyles = makeStyles(theme => ({
   pos: {
      position: "absolute",
      right: "40.7vw"
   },
   root: {
      width: "41vw",
      marginTop: "35vh"
   }
}));

function CustomizedAxisTick({ x, y, payload }) {
   return (
      <g transform={`translate(${x},${y})`}>
         <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
            {payload.value}
         </text>
      </g>
   );
}

export default function AllTime({ tab }) {
   const classes = useStyles();
   const [HistoricalPrice, setHistoricalPrice] = useState();

   let { id } = useParams();

   useEffect(() => {
      axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${tab}`).then(response => {
         let temp = [];
         response.data.prices.map(price => {
            return temp.push({
               date:
                  tab === "1" ? new Date(price[0]).toLocaleTimeString("en-US") : new Date(price[0]).toLocaleDateString("en-US"),
               price: price[1]
            });
         });
         setHistoricalPrice(temp);
      });
   }, [id]);

   return (
      <Paper className={classes.pos}>
         <LineChart
            width={700}
            height={300}
            data={HistoricalPrice}
            margin={{
               top: 30,
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
            <Line type="monotone" dataKey="price" stroke="purple" dot={false} strokeWidth="2" />
         </LineChart>
      </Paper>
   );
}
