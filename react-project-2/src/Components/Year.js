import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";

const data = [
   {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400
   },
   {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210
   },
   {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290
   },
   {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000
   },
   {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181
   },
   {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500
   },
   {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100
   }
];

const useStyles = makeStyles(theme => ({
   year: {
      width: "41vw",
      height: "40vh",
      position: "absolute",
      top: "29vh",
      right: "10vw",
      background: "linear-gradient(to left, #172c66 0%, #6a407f 42%)"
   },
   root: {
      width: "41vw",
      marginTop: "35vh"
   }
}));

export default function Year() {
   const classes = useStyles();
   const [value, setValue] = React.useState(0);

   return (
      <Paper className={classes.year}>
         <LineChart width={735} height={250} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="white" />
            <XAxis dataKey="name" stroke="white" />
            <YAxis stroke="white" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
         </LineChart>
         <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
               setValue(newValue);
            }}
            showLabels
            className={classes.root}
         >
            <BottomNavigationAction label="1 Year" icon={<QueryBuilderIcon />} />
            <BottomNavigationAction label="6 Months" icon={<QueryBuilderIcon />} />
            <BottomNavigationAction label="1 Month" icon={<QueryBuilderIcon />} />
            <BottomNavigationAction label="1 Week" icon={<QueryBuilderIcon />} />
            <BottomNavigationAction label="24 Hours" icon={<QueryBuilderIcon />} />
         </BottomNavigation>
      </Paper>
   );
}
