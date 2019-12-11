import React from 'react';

import { Grid } from '@material-ui/core';
import './CoinMain.css';
export default function CoinMain(props) {
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	});
	return (
		<div className="main">
			<Grid container className="container">
				<Grid item xs={12} className="wrapTitle">
					<div className="title">
						<img src={props.coin.image.large} alt="" className="coinImg" />{' '}
						<h1>{`${props.coin.name} (${props.coin.symbol.toUpperCase()})`}</h1>
					</div>
					<h1>{formatter.format(props.coin.market_data.current_price.usd)}</h1>
				</Grid>
				<Grid item lg={2} md={4} sm={4} xs={4} className="box">
					<p>Market Cap</p>
					<h1>{formatter.format(props.coin.market_data.current_price.usd)}</h1>
				</Grid>
				<Grid item lg={2} md={4} sm={4} xs={4} className="box">
					<p>24h Low / 24h High</p>
					<h1>{formatter.format(props.coin.market_data.high_24h.usd)}</h1>
				</Grid>
				<Grid item lg={2} md={4} sm={4} xs={4} className="box">
					<p>24 Hour Trading Vol</p>
					<h1>{formatter.format(props.coin.market_data.total_volume.usd)}</h1>
				</Grid>
				<Grid item lg={2} md={5} sm={4} xs={4} className="box">
					<p>Circulating Supply</p>
					<h1>{formatter.format(props.coin.market_data.circulating_supply)}</h1>
				</Grid>
			</Grid>
		</div>
	);
}
