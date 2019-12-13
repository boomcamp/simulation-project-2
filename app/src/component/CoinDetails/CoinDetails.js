import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { CircularProgress } from '@material-ui/core';

import CoinMain from './CoinMain/CoinMain';
import CoinDescription from './CoinDescription/CoinDescription';
import CoinTable from './CoinTable/CoinTable';
import LineGraph from './LineGraph/LineGraph';
import CoinPerDay from './CoinPerDay/CoinPerDay';

import { Header } from './../../layout';
export default function CoinDetails(props) {
	const [coin, setCoin] = useState({});
	const [loading, setLoading] = useState(false);
	const [alignment, setAlignment] = useState('1');

	useEffect(() => {
		Axios.get(
			`https://api.coingecko.com/api/v3/coins/${props.match.params.id}`
		).then(res => {
			setCoin(res.data);
			setLoading(true);
		});
	}, [props.match.params.id]);

	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment);
	};
	if (loading) {
		return (
			<React.Fragment>
				<Header id={coin.id} />
				<CoinMain coin={coin} />
				<CoinDescription description={coin.description.en} />
				<CoinTable market_data={coin.market_data} />
				<br />
				<CoinPerDay handleChange={handleChange} alignment={alignment} />
				<br />
				<LineGraph days={alignment} id={props.match.params.id} />
			</React.Fragment>
		);
	} else {
		return (
			<div className="loading">
				<CircularProgress /> <h2>Loading ...</h2>
			</div>
		);
	}
}
