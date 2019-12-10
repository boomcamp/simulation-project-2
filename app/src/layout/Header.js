import React from 'react';
import { Link } from 'react-router-dom';
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	makeStyles
} from '@material-ui/core';

export default function Header() {
	const classes = useStyles();
	return (
		<AppBar position="static" className={classes.nav}>
			<Toolbar>
				<Typography variant="h5" className={classes.title}>
					Simulation Project 2
				</Typography>
				<Link to="/" className={classes.link}>
					<Button>Coins</Button>
				</Link>
			</Toolbar>
		</AppBar>
	);
}
const useStyles = makeStyles(theme => ({
	title: {
		flexGrow: 1
	},
	link: {
		textDecoration: 'none',
		color: '#fff'
	},
	nav: {
		backgroundColor: '#fff',
		color: '#333'
	}
}));
