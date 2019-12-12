import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { makeStyles, Divider, Paper, Button } from '@material-ui/core';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function SellTransaction(props) {
	const classes = useStyles();
	const [result, setResult] = useState({});
	const [coin, setCoin] = useState(0);
	const [wallet, setWallet] = useState(0);
	const [myCoin, setMyCoin] = useState([]);
	const [quantity, setQuantity] = useState(0);
	const [amount, setAmount] = useState(0);

	useEffect(() => {
		Axios.get(`http://localhost:4000/transactions/`).then(res => {
			let unique = [];
			let uniqueCoin = [];
			res.data.map(item => {
				if (unique.indexOf(item.coin) === -1) {
					unique.push(item.coin);
					uniqueCoin.push({
						id: item.id,
						coin: item.coin,
						image: item.image
					});
				}
			});
			setMyCoin(uniqueCoin);
			setCoin(res.data);
			let money = res.data[res.data.length - 1];
			money ? setWallet(money.wallet) : setWallet(1000000);
		});
	}, []);

	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	});
	const handleChange = e => {
		let val = e.target.innerText;
		if (val) {
			console.log(e.target.innerText);
			let quantity = 0;
			coin.map(row => {
				if (val === row.coin) {
					quantity = quantity + row.quantity;
				}
			});
			setResult({
				...result,
				name: val,
				quantity: quantity,
				price: props.coin.market_data.current_price.usd
			});
			console.log(quantity);
		} else {
			setResult({});
		}
	};
	const handleQuantity = e => {
		if (e.target.value >= 0 && e.target.value <= result.quantity) {
			setQuantity(e.target.value);
		}
	};
	const handleSell = () => {
		if (quantity > 0) {
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
					alert('Buy Success!');
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
				</center>
				<Divider />
				<div className={classes.form} noValidate autoComplete="off">
					<Autocomplete
						id="combo-box-demo"
						options={myCoin}
						getOptionLabel={option => option.coin}
						style={{ width: 300, marginRight: 20 }}
						renderOption={option => (
							<React.Fragment>
								<img src={option.image} className={classes.imgCoin} alt="" />
								{option.coin}
							</React.Fragment>
						)}
						renderInput={params => (
							<TextField
								{...params}
								label="Choose a coin"
								variant="outlined"
								fullWidth
							/>
						)}
						onChange={e => handleChange(e)}
					/>
					<TextField
						id="outlined-number"
						label="Quantity"
						type="number"
						style={{ marginRight: 20 }}
						InputLabelProps={{
							shrink: true
						}}
						variant="outlined"
						value={quantity}
						onChange={e => handleQuantity(e)}
					/>
					<Button
						variant="contained"
						color="secondary"
						width="100%"
						onClick={() => handleSell()}
					>
						Sell
					</Button>
				</div>
				<Divider />
				{result.name ? (
					<React.Fragment>
						<Divider />
						<h1>Coin: {result.name}</h1>
						<h1>Quantity: {result.quantity}</h1>
						<h1>Price: {result.price}</h1>
					</React.Fragment>
				) : null}
			</Paper>
		</React.Fragment>
	);
}

const useStyles = makeStyles(theme => ({
	table: {
		minWidth: 650
	},
	form: {
		margin: 50,
		display: 'flex',
		justifyContent: 'center ',
		alignContent: 'center',
		flexFlow: 'row'
	},
	paper_child: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center ',
		alignContent: 'center',
		flexFlow: 'column'
	},
	option: {
		fontSize: 15,
		'& > span': {
			marginRight: 10,
			fontSize: 18
		}
	},
	imgCoin: {
		width: 20,
		height: 20,
		marginRight: 20
	}
}));
