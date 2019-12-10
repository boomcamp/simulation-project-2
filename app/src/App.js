import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header, Footer } from './layout';
import Content from './component/Content';
import './App.css';

function App() {
	return (
		<Router>
			<Fragment>
				<Header />
				<Content />
				<Footer />
			</Fragment>
		</Router>
	);
}

export default App;
