import React, { useState, useEffect } from 'react';
import { Divider, Paper, makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Axios from 'axios';

export default function HistoryTransaction() {
	const classes = useStyles();
	const [history, setHistory] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		Axios.get(`http://localhost:4000/transactions/`).then(res => {
			setHistory(res.data);
			setLoading(true);
		});
	}, []);

	if (loading) {
		return (
			<Paper className={classes.paper_child}>
				<center>
					<h2>History Transaction</h2>
				</center>
				<Divider />
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="left">Coin</TableCell>
							<TableCell align="left">Transaction</TableCell>
							<TableCell align="left">Price</TableCell>
							<TableCell align="left">Quantity</TableCell>
							<TableCell align="left">Amount</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{history.map(row => (
							<TableRow key={row.id}>
								<TableCell align="left">{row.coin}</TableCell>
								<TableCell align="left">{row.transaction}</TableCell>
								<TableCell align="left">{row.price}</TableCell>
								<TableCell align="left">{row.quantity}</TableCell>
								<TableCell align="left">{row.amount}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Paper>
		);
	} else {
		return <h2>Loading ...</h2>;
	}
}

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		overflowX: 'auto'
	},
	table: {
		minWidth: 650
	},
	paper_child: {
		width: '80%'
	}
}));
