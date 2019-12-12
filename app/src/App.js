import React from "react";
import Table from "./components/Table";
import Navigation from "./components/includes/Navigation";
import View from "./components/View";
import PageNotFound from "./components/includes/PageNotFound";
import Investment from "./components/Investment";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
	return (
		<div>
			<BrowserRouter>
				<Navigation />
				<Switch>
					<Route exact path="/page/:id">
						<Table />
					</Route>
					<Route exact path="/">
						<Redirect to="/page/1" />
					</Route>
					<Route exact path="/:id" component={View} />
					<Route exact path="/coin/invested/:id" component={Investment} />
					<Route component={PageNotFound} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
