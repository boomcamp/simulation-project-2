import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import TableCoins from './TableCoins/TableCoins';
import CoinDetails from './CoinDetails/CoinDetails';
import CoinTransaction from './CoinTransaction/CoinTransaction';

export default function Content() {
	return (
		<Grid container>
			<Grid item xs={12}>
				<Switch>
					<Route exact path="/" component={TableCoins} />
					<Route path="/transaction/:id" component={CoinTransaction} />
					<Route path="/details/:id" component={CoinDetails} />
				</Switch>
			</Grid>
		</Grid>
	);
}
