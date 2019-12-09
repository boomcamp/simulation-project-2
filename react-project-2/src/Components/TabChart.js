import React, { useEffect, useState } from "react";
import { Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ComposedChart, Bar } from "recharts";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useParams } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
   pos: {
      position: "absolute",
      right: "41.5vw",
      background: "none"
   },
   root: {
      width: "41vw",
      marginTop: "35vh"
   },
   circle: {
      position: "absolute",
      left: "20vw",
      top: "15vh",
      zIndex: 1000
   }
}));

const formatter = new Intl.NumberFormat("en-US", {
   style: "currency",
   currency: "USD",
   minimumFractionDigits: 2
});

const circulatingFormat = num => {
   return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

const CustomTooltip = props => {
   if (props.active) {
      return (
         <div className="hover-custom-tooltip">
            <p className="time-hover">{`${props.label}`}</p>
            <p className="price-hover">price: {`${formatter.format(props.payload[0].value)}`}</p>
            <p className="volume-hover">volume: {`${circulatingFormat(Math.round(props.payload[1].value))}`}</p>
         </div>
      );
   }
   return null;
};

function CustomizedAxisTick({ x, y, payload }) {
   return (
      <g transform={`translate(${x},${y})`}>
         <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
            {payload.value}
         </text>
      </g>
   );
}

export default function TabChart({ tab }) {
   const classes = useStyles();
   const [HistoricalPrice, setHistoricalPrice] = useState();
   const [load, setLoad] = React.useState(false);

   let { id } = useParams();

   useEffect(() => {
      setLoad(true);
      axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${tab}`).then(response => {
         console.log(response.data.prices);
         setLoad(false);
         let temp = [];
         response.data.prices.map((price, i) => {
            return temp.push({
               date:
                  tab === "1" ? new Date(price[0]).toLocaleTimeString("en-US") : new Date(price[0]).toLocaleDateString("en-US"),
               price: price[1],
               volume: response.data.total_volumes[i][1]
            });
         });
         setHistoricalPrice(temp);
      });
   }, [id]);

   return (
      <div className={classes.pos}>
         {load ? (
            <CircularProgress disableShrink color="primary" className={classes.circle} />
         ) : (
            <ResponsiveContainer width={750} height={320}>
               <ComposedChart
                  data={HistoricalPrice}
                  margin={{
                     top: 30,
                     right: 20,
                     bottom: 45,
                     left: 70
                  }}
                  padding={0}
               >
                  <CartesianGrid strokeDasharray="3 3" />
                  <YAxis type="number" dataKey="price" domain={["auto", "auto"]} padding={{ bottom: 60 }}></YAxis>
                  <YAxis
                     dataKey="volume"
                     yAxisId="left"
                     tickLine={true}
                     axisLine={false}
                     orientation="right"
                     domain={[dataMin => 0, dataMax => dataMax * 4]}
                     padding={{ bottom: 0 }}
                  ></YAxis>
                  <XAxis dataKey="date" tick={<CustomizedAxisTick />} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="price" stroke="#653e7d" dot={false} strokeWidth="2" />
                  <Bar dataKey="volume" yAxisId="left" fill="#19326e" domain={["auto", "auto"]} />
               </ComposedChart>
            </ResponsiveContainer>
         )}
      </div>
   );
}
