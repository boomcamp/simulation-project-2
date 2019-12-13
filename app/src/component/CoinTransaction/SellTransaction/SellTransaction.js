import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {
	TextField,
	Button,
	makeStyles,
	Divider,
	Paper
} from '@material-ui/core';
import SellReceipt from './SellReceipt';

export default function SellTransaction(props) {
	const classes = useStyles();
	const [receipt, setReceipt] = useState(false);
	const [wallet, setWallet] = useState(0);
	const [amount, setAmount] = useState(0);
	const [quantity, setQuantity] = useState(0);
	const [coinQuantity, setCoinQuantity] = useState(0);

	useEffect(() => {
		Axios.get('http://localhost:4000/transactions/').then(res => {
			let money = res.data[res.data.length - 1];
			money ? setWallet(money.wallet) : setWallet(1000000);
			let qBuy = 0;
			let qSell = 0;
			res.data.forEach(item => {
				if (props.coin.name === item.coin) {
					if (item.transaction === 'Buy') {
						qBuy = qBuy + item.quantity;
					} else if (item.transaction === 'Sell') {
						qSell = qSell + item.quantity;
					}
				}
			});
			return setCoinQuantity(qBuy - qSell);
		});
	}, [wallet, props.coin.name]);

	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	});

	const handleAQuantity = e => {
		if (e.target.value >= 0 && e.target.value <= coinQuantity) {
			let convert = props.coin.market_data.current_price.usd * e.target.value;
			let trans = convert * 0.1;

			setAmount(convert + trans);
			setQuantity(e.target.value);
		}
	};

	const handleSell = e => {
		e.preventDefault();

		if (quantity > 0) {
			setReceipt(true);
			Axios({
				method: 'post',
				url: 'http://localhost:4000/transactions/',
				data: {
					coin: props.coin.name,
					transaction: 'Sell',
					price: props.coin.market_data.current_price.usd,
					quantity: parseInt(quantity),
					amount: amount,
					wallet: wallet + amount,
					image: props.coin.image.large
				}
			})
				.then(res => {
					setAmount(0);
					setQuantity(0);
					setWallet(wallet + amount);
					alert('Sell Success!');
					setReceipt(false);
				})
				.catch(err => {
					console.log(err);
				});
		}
	};
	return (
		<React.Fragment>
			<Paper className={classes.paper_child}>
				<center>
					<h2>Sell Transaction</h2>
					<h1>$ Wallet : {formatter.format(wallet)}</h1>
					<h2>{props.coin.name}</h2>
					<h2>Price : {props.coin.market_data.current_price.usd}</h2>
					<h2>Quantity : {coinQuantity}</h2>
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
						onChange={e => handleAQuantity(e)}
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
						onClick={e => handleSell(e)}
					>
						Sell
					</Button>
				</form>
				<Divider />
				{receipt ? (
					<SellReceipt coin={props.coin} amount={amount} quantity={quantity} />
				) : null}
			</Paper>
		</React.Fragment>
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
