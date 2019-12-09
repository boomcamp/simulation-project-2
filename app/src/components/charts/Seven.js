import React, { useState, useEffect } from "react";
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

	useEffect(() => {
		Axios.get(`https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=usd&days=1`)
			.then(response => {
				const output = response.data.prices.map(([date, Price]) => {
					date = new Intl.DateTimeFormat("en-US", {
						year: "numeric",
						month: "short",
						day: "numeric",
						hour: "numeric",
						minute: "numeric"
					}).format(date);

					Price = Number(Math.round(Price + "e2") + "e-2");
					return { date, Price };
				});
				setChart(output);
			})
			.catch(error => console.log(error.response.data));
	}, [props.id]);

	return (
		<div style={{ width: "100%	" }}>
			<BottomNavigation
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);

					switch (newValue) {
						case 0:
							newValue = 1;
							break;
						case 1:
							newValue = 7;
							break;
						case 2:
							newValue = 30;
							break;
						case 3:
							newValue = 180;
							break;
						case 4:
							newValue = 365;
							break;
						case 5:
							newValue = "max";
							break;
						default:
							newValue = 1;
					}
					Axios.get(`https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=usd&days=${newValue}`).then(
						response => {
							const output = response.data.prices.map(([date, Price]) => {
								date = new Intl.DateTimeFormat("en-US", {
									year: "numeric",
									month: "short",
									day: "2-digit",
									hour: "2-digit",
									minute: "2-digit"
								}).format(date);
								Price = Number(Math.round(Price + "e2") + "e-2");
								return { date, Price };
							});
							setChart(output);
						}
					);
				}}
				showLabels
				className={classes.root}
			>
				<BottomNavigationAction label="24 Hours" icon={<RestoreIcon />} />
				<BottomNavigationAction label="One Week" icon={<RestoreIcon />} />
				<BottomNavigationAction label="One Month" icon={<RestoreIcon />} />
				<BottomNavigationAction label="6 Months" icon={<RestoreIcon />} />
				<BottomNavigationAction label="One Year" icon={<RestoreIcon />} />
				<BottomNavigationAction label="All time	" icon={<RestoreIcon />} />
			</BottomNavigation>

			<ResponsiveContainer width="100%" height={300}>
				<LineChart
					data={chart}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" />
					<YAxis domain={["auto", "auto"]} />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="Price" dot={false} stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
