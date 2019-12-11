import React, { useState } from 'react';
import {
	TextField,
	Button,
	makeStyles,
	Divider,
	Paper
} from '@material-ui/core';
import { toast } from 'react-toastify';
import Axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

export default function BuyTransaction(props) {
	const classes = useStyles();
	const [receipt, setReceipt] = useState(false);
	const [amount, setAmount] = useState(0);
	const [quantity, setQuantity] = useState(0);
	const handleChange = e => {
		let convert = props.coin.market_data.current_price.usd * e.target.value;
		setQuantity(e.target.value);
		setAmount(convert);
		setReceipt(false);
	};
	const handleBuy = e => {
		e.preventDefault();

		if (quantity > 0) {
			setReceipt(true);
			Axios({
				method: 'post',
				url: 'http://localhost:4000/transactions/',
				data: {
					coin: props.coin.name,
					transaction: 'Buy',
					price: props.coin.market_data.current_price.usd,
					quantity: quantity,
					amount: amount
				}
			})
				.then(res => {
					setAmount(0);
					setQuantity(0);
					toast.success('Buy Success!');
					alert('Buy Success!');
				})
				.catch(err => {
					console.log(err);
					toast.error('Invalid entry');
				});
		} else {
			alert('Zero quantity!');
		}
	};
	return (
		<React.Fragment>
			<Paper className={classes.paper_child}>
				<center>
					<h2>Buy Transaction</h2>
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
						type="number"
						InputLabelProps={{
							shrink: true
						}}
						InputProps={{
							readOnly: true
						}}
						variant="outlined"
						value={amount}
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
					<React.Fragment>
						<Divider />
						<div className={classes.result}>
							<table>
								<tbody>
									<tr>
										<td>
											<h3>Coin:</h3>
										</td>
										<td>
											<p>{props.coin.name}</p>
										</td>
									</tr>
									<tr>
										<td>
											<h3>Price:</h3>
										</td>
										<td>
											<p>{props.coin.market_data.current_price.usd}</p>
										</td>
									</tr>
									<tr>
										<td>
											<h3>Quantity:</h3>
										</td>
										<td>
											<p>{quantity}</p>
										</td>
									</tr>
									<tr>
										<td>
											<h3>Amount:</h3>
										</td>
										<td>
											<p>{amount}</p>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</React.Fragment>
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
