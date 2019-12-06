import React, { useState } from "react";
import Axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";

const useStyles = makeStyles(theme => ({
	root: {
		width: "100%"
	}
}));
export default function SevenChart(props) {
	const classes = useStyles();
	const [value, setValue] = useState(0);
	const [chart, setChart] = useState([]);
	const data = [
		{
			name: "Page A",
			uv: 4000
		},
		{
			name: "Page B",
			uv: 3000
		},
		{
			name: "Page C",
			uv: 2000
		},
		{
			name: "Page D",
			uv: 2780
		},
		{
			name: "Page E",
			uv: 1890
		},
		{
			name: "Page F",
			uv: 2390
		},
		{
			name: "Page G",
			uv: 3490
		}
	];

	return (
		<div style={{ width: "100%	" }}>
			<BottomNavigation
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
					if (newValue === 0) {
						Axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1`).then(
							response => {
								console.log(response.data.prices);
							}
						);
					}
					console.log(newValue);
				}}
				showLabels
				className={classes.root}
			>
				<BottomNavigationAction label="24 Hours" icon={<RestoreIcon />} />
				<BottomNavigationAction label="1 Week" icon={<RestoreIcon />} />
				<BottomNavigationAction label="1 Month" icon={<RestoreIcon />} />
				<BottomNavigationAction label="6 Months" icon={<RestoreIcon />} />
				<BottomNavigationAction label="1 Year" icon={<RestoreIcon />} />
				<BottomNavigationAction label="Alltime	" icon={<RestoreIcon />} />
			</BottomNavigation>

			<ResponsiveContainer width="100%" height={300}>
				<LineChart
					data={data}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="uv" stroke="#8884d8" activeDot={{ r: 8 }} />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
