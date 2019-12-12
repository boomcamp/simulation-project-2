import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import TableCoins from './component/TableCoins/TableCoins';
import CoinDetails from './component/CoinDetails/CoinDetails';
import CoinTransaction from './component/CoinTransaction/CoinTransaction';
import './App.css';

function App() {
	return (
		<Router>
			<Grid container>
				<Grid item xs={12}>
					<Switch>
						<Route exact path="/" component={TableCoins} />
						<Route path="/transaction/:id" component={CoinTransaction} />
						<Route path="/details/:id" component={CoinDetails} />
					</Switch>
				</Grid>
			</Grid>
		</Router>
	);
}

export default App;
