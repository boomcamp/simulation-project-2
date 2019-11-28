import React from "react";
import Table from "./components/Table";
import Navigation from "./components/includes/Navigation";
import View from "./components/View";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
	return (
		<div>
			<BrowserRouter>
				<Navigation />
				<Switch>
					<Route exact path="/">
						<Table />
					</Route>
					<Route path="/:id" component={View} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
