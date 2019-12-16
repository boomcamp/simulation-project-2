import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import {
	makeStyles,
	Divider,
	Paper,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	TextField,
	CircularProgress
} from '@material-ui/core';

export default function TractTransaction(props) {
	const classes = useStyles();
	const [wallet, setWallet] = useState(0);
	const [isSelect, setIsSelect] = useState('');
	const inputLabel = React.useRef(null);
	const [amount, setAmount] = useState(0);
	const [isTracking, setIsTracking] = useState(false);

	useEffect(() => {
		Axios.get('http://localhost:4000/transactions/').then(res => {
			let money = res.data[res.data.length - 1];
			money ? setWallet(money.wallet) : setWallet(1000000);
		});
	}, [wallet]);

	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	});
	const handleCoin = current_price => {
		Axios.get('http://localhost:4000/transactions/').then(res => {
			let coinQuantity = res.data[res.data.length - 1].quantity;
			let coinPrice = res.data[res.data.length - 1].price;

			let currentP = current_price * coinQuantity;
			let coinP = coinPrice * coinQuantity;

			setAmount(currentP - coinP);
		});
	};
	const handleChange = event => {
		let val = event.target.value;
		setIsSelect(val);
		setIsTracking(true);

		if (val !== '') {
			Axios.get(
				`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=${val}`
			).then(res => {
				res.data.forEach(item => {
					if (item.name === props.coin.name) {
						handleCoin(item.current_price);
					}
				});
				setIsTracking(false);
			});
		} else {
			setIsTracking(false);
			setAmount(0);
		}
	};

	return (
		<Paper className={classes.paper_child}>
			<center>
				<h2>Track Investment</h2>
				<h1>$ Wallet : {formatter.format(wallet)}</h1>
				<h2>{props.coin.name}</h2>
			</center>
			<Divider />
			<form className={classes.form} noValidate autoComplete="off">
				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
						Track
					</InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						value={isSelect}
						onChange={e => handleChange(e)}
						className={classes.selectEmpty}
					>
						<MenuItem value="">None</MenuItem>
						<MenuItem value="1h">1 Hour</MenuItem>
						<MenuItem value="24h">1 Day</MenuItem>
						<MenuItem value="7d">1 Week</MenuItem>
					</Select>
					{isTracking ? (
						<center>
							<CircularProgress />
						</center>
					) : (
						<TextField
							id="outlined-number"
							label="Loss/Profit"
							type="text"
							InputLabelProps={{
								shrink: true
							}}
							InputProps={{
								readOnly: true
							}}
							variant="outlined"
							value={formatter.format(amount)}
						/>
					)}
				</FormControl>
			</form>
		</Paper>
	);
}

const useStyles = makeStyles(theme => ({
	form: {
		margin: 50,
		display: 'flex',
		justifyContent: 'space-evenly',
		alignContent: 'center',
		flexFlow: 'row'
	},
	paper_child: {
		width: '50%'
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
		marginBottom: 20
	},
	formControl: {
		margin: theme.spacing(1)
	}
}));
