import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import {
	TextField,
	Button,
	makeStyles,
	Divider,
	Paper
} from '@material-ui/core';

import BuyReceipt from './BuyReceipt';
import DateToday from '../DateToday';

export default function BuyTransaction(props) {
	const classes = useStyles();
	const [receipt, setReceipt] = useState(false);
	const [wallet, setWallet] = useState(0);
	const [amount, setAmount] = useState(0);
	const [quantity, setQuantity] = useState(0);
	const { today } = DateToday();

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

	const handleChange = e => {
		if (e.target.value >= 0) {
			let convert = props.coin.market_data.current_price.usd * e.target.value;
			// let trans = convert * 0.1;

			setQuantity(e.target.value);
			setAmount(convert);
		}
	};

	const handleBuy = e => {
		e.preventDefault();

		if (quantity > 0) {
			if (amount <= wallet) {
				setReceipt(true);
				Axios({
					method: 'post',
					url: 'http://localhost:4000/transactions/',
					data: {
						coin: props.coin.name,
						transaction: 'Buy',
						price: props.coin.market_data.current_price.usd,
						quantity: parseInt(quantity),
						amount: amount,
						wallet: wallet - amount,
						profit: 0,
						date: today
					}
				})
					.then(res => {
						setAmount(0);
						setQuantity(0);
						setWallet(wallet - amount);
						alert('Buy Success!');
						setReceipt(false);
					})
					.catch(err => {
						console.log(err);
					});
			} else {
				alert('Not enough money.');
			}
		} else {
			alert('Quantity must be greater than 1');
		}
	};
	return (
		<Paper className={classes.paper_child}>
			<center>
				<h2>Buy Transaction</h2>
				<h1>$ Wallet : {formatter.format(wallet)}</h1>
				<h2>{props.coin.name}</h2>
			</center>
			<Divider />
			<form className={classes.form} noValidate autoComplete="off">
				<TextField
					id="outlined-number"
					label="Quantity"
					type="number"
					InputLabelProps={{
						shrink: true
					}}
					variant="outlined"
					value={quantity}
					onChange={e => handleChange(e)}
				/>
				<TextField
					id="outlined-number"
					label="Amount"
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
				<Button
					variant="contained"
					color="secondary"
					width="100%"
					onClick={e => handleBuy(e)}
				>
					Buy
				</Button>
			</form>
			{receipt ? (
				<BuyReceipt
					coin={props.coin}
					amount={amount}
					quantity={quantity}
					formatter={formatter}
				/>
			) : null}
		</Paper>
	);
}

const useStyles = makeStyles(theme => ({
	form: {
		margin: 50,
		display: 'flex',
		justifyContent: 'space-evenly',
		alignContent: 'center'
	},
	paper_child: {
		width: '50%'
	}
}));
