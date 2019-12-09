import React, { useState, useEffect } from "react";
import Axios from "axios";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Seven from "./charts/Seven";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2)
	}
}));

const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 2
});

export default function Stats(props) {
	const classes = useStyles();
	const [coin, setCoin] = useState(null);
	const [price, setPrice] = useState(null);
	const [transaction, setTransaction] = useState(false);

	useEffect(() => {
		setCoin(props.name);
		setPrice(props.priceData.usd);
	}, [props.priceData.usd, props.name]);

	const buy = () => {
		// Axios.post("http://localhost:4000/transactions", {
		// 	coin: coin,
		// 	price: price
		// }).catch(error => {
		// 	console.log(error.response.data);
		// });
		setTransaction(true);
	};

	const sell = () => {
		Axios.delete("http://localhost:4000/transactions/2").then(response => {
			console.log("deleted");
		});
	};

	if (transaction) {
		return (
			<div>
				<Typography variant="h5" component="h3">
					This is a sheet of paper.
				</Typography>
				<Typography component="p">Paper can be used to build surface or other elements for your application.</Typography>
			</div>
		);
	}

	return (
		<div>
			<Grid className={classes.paper} container direction="row" justify="flex-start" alignItems="flex-start" spacing={3}>
				<Grid container direction="row" justify="space-between" alignItems="flex-start" item xs={3}>
					<Typography variant="subtitle2" display="block" gutterBottom>
						Quick Stats
					</Typography>
					<Grid container direction="row" justify="space-between" alignItems="flex-end" item xs={12}>
						<Typography variant="button" display="block" gutterBottom>
							Price
						</Typography>{" "}
						<Typography variant="button" display="block" style={{ fontSize: "50px", marginBottom: "-15px" }} gutterBottom>
							{formatter.format(props.priceData.usd)}
						</Typography>
					</Grid>
					<Grid container direction="row" justify="space-between" alignItems="flex-start" item xs={12}>
						<Typography variant="button" display="block" gutterBottom>
							Market Cap Rank
						</Typography>{" "}
						<Typography variant="button" display="block" gutterBottom>
							{props.cMarketData.market_cap_rank}
						</Typography>
					</Grid>
					<Grid container direction="row" justify="space-between" alignItems="flex-start" item xs={12}>
						<Typography variant="button" display="block" gutterBottom>
							Market Cap
						</Typography>{" "}
						<Typography variant="button" display="block" gutterBottom>
							{formatter.format(props.marketData.usd)}
						</Typography>
					</Grid>
					<Grid container direction="row" justify="space-between" alignItems="flex-start" item xs={12}>
						<Typography variant="button" display="block" gutterBottom>
							Circulating Supply
						</Typography>{" "}
						<Typography variant="button" display="block" gutterBottom>
							{props.cMarketData.circulating_supply}
						</Typography>
					</Grid>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<Button variant="contained" color="secondary" fullWidth={true} onClick={buy}>
								Buy
							</Button>
						</Grid>
						<Grid item xs={12}>
							<Button variant="contained" color="primary" fullWidth={true} onClick={sell}>
								Sell
							</Button>
						</Grid>
					</Grid>
				</Grid>

				<Grid container item xs={9}>
					<Typography variant="subtitle2" display="block" gutterBottom>
						Pricing Data
					</Typography>
					<Seven id={props.id} />
				</Grid>
			</Grid>
		</div>
	);
}
