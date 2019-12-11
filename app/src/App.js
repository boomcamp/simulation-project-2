import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Content from './component/Content';
import './App.css';

function App() {
	return (
		<Router>
			<Fragment>
				<Content />
			</Fragment>
		</Router>
	);
}

export default App;
