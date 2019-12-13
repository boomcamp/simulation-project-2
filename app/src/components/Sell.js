import React, { useState, useEffect } from "react";
import Axios from "axios";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(3, 2),
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: "#e2e2e2"
	},

	pink: {
		color: "#fff"
	},
	margin: {
		margin: theme.spacing(1)
	},
	textField: {
		width: 200
	}
}));
export default function Transaction(props) {
	let history = useHistory();
	let { id } = useParams();
	const classes = useStyles();
	const [coin, setCoin] = useState("");
	const [amount, setAmount] = useState(0);
	const [soldQuantity, setSoldQuantity] = useState(0);
	const [balance, setBalance] = useState(0);
	const [error, setError] = useState(false);
	const [newBalance, setNewBalance] = useState(0);
	const [profitOrLoss, setProfitOrLoss] = useState(0);

	useEffect(() => {
		Axios.get(`http://localhost:4000/transactions`)
			.then(response => {
				let initBalance = 0;
				let fArray = response.data.filter(val => {
					return val.coinId === id;
				});
				fArray.forEach(newVal => {
					if (newVal.transaction === "buy") {
						initBalance += newVal.coinQuantity;
					} else {
						initBalance -= newVal.coinQuantity;
					}
				});
				setBalance(initBalance);
				return Axios.get(`http://localhost:4000/transactions?coinId=${id}`);
			})
			.then(response => {
				let aCurrentCointPrice = 0;
				let count = 0;
				var stat = true;
				var statChecker = true;
				let array = response.data.reverse();
				console.log(response.data);
				array.map((x, i) => {
					if (x.transaction === "buy" && stat) {
						statChecker = false;
						aCurrentCointPrice += x.currentCoinPrice;
						count++;
					} else if (x.transaction === "sell") {
						if (!statChecker) {
							stat = false;
						}
					}
					return x;
				});

				//console.log(aCost, cQuantity);
				console.log(props.price, aCurrentCointPrice, count);
				console.log(((props.price - aCurrentCointPrice / count) / (aCurrentCointPrice / count)) * 100);
				setProfitOrLoss(((props.price - aCurrentCointPrice / count) / (aCurrentCointPrice / count)) * 100);
			});
	}, [id, props.price]);
	const confirmBuy = () => {
		if (!error) {
			Axios.post("http://localhost:4000/transactions", {
				coinId: props.id,
				name: props.name,
				image: props.img.small,
				coinQuantity: soldQuantity,
				Amount: amount,
				totalAmount: amount,
				currentCoinPrice: props.price,
				transaction: "sell",
				timestamp: new Date().getTime(),
				profitOrLoss: profitOrLoss
			})
				.then(response => {
					sessionStorage.setItem("success", true);
					history.push(`/coin/invested/${props.id}`);
				})
				.catch(error => {
					console.log(error.response.data);
				});
		}
	};
	return (
		<Slide direction="left" in>
			<Paper className={classes.root} elevation={0} square={true}>
				<Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={2}>
					<Grid container item xs={5}>
						<Grid container item xs={12}>
							<Typography variant="h6" display="block" component="h3">
								Available Balance
							</Typography>
						</Grid>
						<Grid container item xs={12}>
							<List>
								<ListItem>
									<ListItemIcon style={{ color: "rgb(0, 78, 224)" }}>
										<AccountBalanceWalletIcon fontSize="large" />
									</ListItemIcon>
									<Typography variant="h6" display="block" component="h3">
										{balance} {props.symbol}
									</Typography>
								</ListItem>
							</List>
						</Grid>
						<Grid container item xs={12}>
							<Typography variant="h6" component="h3">
								Sell
							</Typography>
						</Grid>
						<Grid container item xs={12} alignItems="center" justify="center">
							<TextField
								label="Quantity"
								id="outlined-start-adornment"
								error={error}
								helperText={error ? "Not Enough Balance" : ""}
								className={clsx(classes.margin, classes.textField)}
								InputProps={{
									endAdornment: <InputAdornment position="start">{props.symbol}</InputAdornment>
								}}
								variant="outlined"
								value={coin}
								type="number"
								onChange={e => {
									if (e.target.value > balance) {
										setError(true);
									} else {
										setAmount(props.price * +e.target.value);
										setSoldQuantity(e.target.value);

										setNewBalance(balance - +e.target.value);
										setError(false);
									}
									if (e.target.value > -1) {
										setCoin(+e.target.value);
									}
								}}
								autoFocus={true}
								fullWidth={true}
							/>
						</Grid>

						<Grid container item xs={12} spacing={1} justify="center">
							<Grid item>
								<Button
									variant="contained"
									size="large"
									color="primary"
									onClick={confirmBuy}
									style={{ marginTop: "20px" }}
								>
									Confirm
								</Button>
							</Grid>
							<Grid item>
								<Button
									variant="contained"
									size="large"
									color="secondary"
									style={{ marginTop: "20px" }}
									onClick={() => props.sell(false)}
								>
									Cancel
								</Button>
							</Grid>
						</Grid>
					</Grid>
					<Grid container item xs={7}>
						<Grid item xs={12} style={{ padding: "20px 0px" }}>
							<Typography variant="body1" align="center">
								Selling
							</Typography>
						</Grid>
						<Grid item xs={12} style={{ padding: "5px 0px" }}>
							<Typography variant="h2" align="center" color="primary">
								{!error ? coin : false} {props.symbol.toUpperCase()}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="h6" align="center">
								&#64; {`${props.formatter.format(props.price)}`} per {props.symbol}
							</Typography>
						</Grid>
						<Grid item container xs={12} style={{ padding: "20px 20%" }}>
							<Grid container item xs={12} justify="space-between">
								<Typography variant="h6">Earnings:</Typography>
								<Typography variant="h6">{!error ? props.formatter.format(amount) : false}</Typography>
							</Grid>
						</Grid>
						<Grid item container xs={12} style={{ padding: "20px 20%" }}>
							<Grid container item xs={12} justify="space-between">
								<Typography variant="body1">New {props.name} Balance:</Typography>
								<Typography variant="body1">{newBalance}</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</Slide>
	);
}
