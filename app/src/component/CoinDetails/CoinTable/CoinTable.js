import React from 'react';

import { Grid } from '@material-ui/core';

import './CoinTable.css';
export default function CoinTable(props) {
	const {
		price_change_percentage_24h,
		price_change_percentage_7d,
		price_change_percentage_30d,
		price_change_percentage_1y
	} = props.market_data;
	return (
		<Grid container className="container">
			<Grid item xs={2} className="column">
				<div>
					<p>1 DAY</p>
					<h2>{price_change_percentage_24h}</h2>
				</div>
			</Grid>
			<Grid item xs={2} className="column">
				<div>
					<p>1 WEEK</p>
					<h2>{price_change_percentage_7d}</h2>
				</div>
			</Grid>
			<Grid item xs={2} className="column">
				<div>
					<p>1 MONTH</p>
					<h2>{price_change_percentage_30d}</h2>
				</div>
			</Grid>
			<Grid item xs={2} className="column">
				<div>
					<p>1 YEAR</p>
					<h2>{price_change_percentage_1y}</h2>
				</div>
			</Grid>
		</Grid>
	);
}
