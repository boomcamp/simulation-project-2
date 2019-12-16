import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import {
	Divider,
	Paper,
	makeStyles,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	InputLabel,
	MenuItem,
	FormControl,
	Select
} from '@material-ui/core';

export default function HistoryTransaction(props) {
	const classes = useStyles();
	const inputLabel = React.useRef(null);
	const [history, setHistory] = useState({});
	const [wallet, setWallet] = useState(0);
	const [loading, setLoading] = useState(false);
	const [isSelect, setIsSelect] = useState('Buy');

	useEffect(() => {
		Axios.get(`http://localhost:4000/transactions/`).then(res => {
			setHistory(res.data);
			setLoading(true);
			let money = res.data[res.data.length - 1];
			money ? setWallet(money.wallet) : setWallet(1000000);
		});
	}, []);

	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	});

	const handleChange = event => {
		setIsSelect(event.target.value);
	};

	if (loading) {
		return (
			<Paper className={classes.paper_child}>
				<center>
					<h2>History Transaction</h2>
					<h1>$ Wallet : {formatter.format(wallet)}</h1>
					<h2>{props.coin.name}</h2>
				</center>
				<Divider />
				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
						Choose a transaction
					</InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						value={isSelect}
						onChange={e => handleChange(e)}
						className={classes.selectEmpty}
					>
						<MenuItem value="Buy">Buy</MenuItem>
						<MenuItem value="Sell">Sell</MenuItem>
					</Select>
				</FormControl>
				<Divider />
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="left">Coin</TableCell>
							<TableCell align="left">Price</TableCell>
							<TableCell align="left">Quantity</TableCell>
							<TableCell align="left">Amount</TableCell>
							{isSelect === 'Sell' ? (
								<TableCell align="left">Profit/Loss</TableCell>
							) : null}
							<TableCell align="left">Date</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{history.map(row =>
							row.coin === props.coin.name ? (
								isSelect === row.transaction ? (
									<TableRow key={row.id}>
										<TableCell align="left">{row.coin}</TableCell>
										<TableCell align="left">
											{formatter.format(row.price)}
										</TableCell>
										<TableCell align="left">{row.quantity}</TableCell>
										<TableCell align="left">
											{formatter.format(row.amount)}
										</TableCell>
										{row.transaction === 'Sell' ? (
											<TableCell align="left">
												{formatter.format(row.profit)}
											</TableCell>
										) : null}
										<TableCell align="left">{row.date}</TableCell>
									</TableRow>
								) : null
							) : null
						)}
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
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		width: 200
	}
}));
