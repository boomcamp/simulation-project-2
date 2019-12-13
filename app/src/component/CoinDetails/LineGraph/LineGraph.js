import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {
	AreaChart,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Area
} from 'recharts';
import './LineGraph.css';

export default function LineGraph(props) {
	const [data, setdata] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(false);
		Axios.get(
			`https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=usd&days=${props.days}`
		).then(res => {
			let array = res.data.prices.map(item => {
				return {
					date: new Date(item[0]).toLocaleDateString('en-US'),
					price: item[1]
				};
			});

			setdata(array);
			setLoading(true);
		});
	}, [props.days, props.id]);

	if (loading) {
		return (
			<div className="lineGraph">
				<AreaChart
					width={1800}
					height={500}
					data={data}
					margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
				>
					<defs>
						<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
						</linearGradient>
					</defs>
					<XAxis dataKey="date" />
					<YAxis domain={['auto', 'auto']} />
					<CartesianGrid strokeDasharray="3 3" />
					<Tooltip />
					<Area
						type="monotone"
						dataKey="price"
						stroke="#8884d8"
						fillOpacity={1}
						fill="url(#colorUv)"
					/>
				</AreaChart>
			</div>
		);
	} else {
		return (
			<div className="loading">
				<h2>Loading ...</h2>
			</div>
		);
	}
}
