import React, { useState } from "react";
import Axios from "axios";
import Transaction from "./Transaction";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles, MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Seven from "./charts/Seven";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2)
	},
	table: {
		minWidth: 650
	}
}));

const theme = createMuiTheme({
	palette: {
		primary: { main: "#4caf50" }
	}
});

export default function Stats(props) {
	const classes = useStyles();
	const [transaction, setTransaction] = useState(false);

	const buy = val => {
		setTransaction(val);
	};

	const sell = () => {
		Axios.delete("http://localhost:4000/transactions/3").then(response => {
			console.log("deleted");
		});
	};

	function createData(onehour, oneday, sevendays, fourteendays, thirtydays, oneyear) {
		return { onehour, oneday, sevendays, fourteendays, thirtydays, oneyear };
	}

	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2
	});

	const rows = [
		createData(
			props.priceHourPChange,
			props.cMarketData.price_change_percentage_24h,
			props.cMarketData.price_change_percentage_7d,
			props.cMarketData.price_change_percentage_14d,
			props.cMarketData.price_change_percentage_30d,
			props.cMarketData.price_change_percentage_1y
		)
	];

	if (transaction) {
		return (
			<Transaction
				symbol={props.symbol}
				price={props.priceData.usd}
				buy={buy}
				formatter={formatter}
				img={props.img}
				id={props.id}
				name={props.name}
			/>
		);
	}
	return (
		<Slide direction="right" in={true}>
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
							<Button
								variant="contained"
								color="secondary"
								fullWidth={true}
								onClick={() => {
									buy(true);
								}}
							>
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
					<Grid item xs={12}>
						<Typography variant="subtitle2" display="block" gutterBottom>
							Price Change Percentage
						</Typography>
						<Table className={classes.table} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell align="center">1h</TableCell>
									<TableCell align="center">24h</TableCell>
									<TableCell align="center">7d</TableCell>
									<TableCell align="center">14d</TableCell>
									<TableCell align="center">30d</TableCell>
									<TableCell align="center">1y</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row, i) => (
									<TableRow key={i}>
										<MuiThemeProvider theme={theme}>
											<TableCell align="center">
												<Typography color={row.onehour >= 0 ? "primary" : "error"}>{row.onehour}%</Typography>
											</TableCell>
											<TableCell align="center">
												<Typography color={row.oneday >= 0 ? "primary" : "error"}>{row.oneday}%</Typography>
											</TableCell>
											<TableCell align="center">
												<Typography color={row.sevendays >= 0 ? "primary" : "error"}>{row.sevendays}%</Typography>
											</TableCell>
											<TableCell align="center">
												<Typography color={row.fourteendays >= 0 ? "primary" : "error"}>
													{row.fourteendays}%
												</Typography>
											</TableCell>
											<TableCell align="center">
												<Typography color={row.thirtydays >= 0 ? "primary" : "error"}>{row.thirtydays}%</Typography>
											</TableCell>
											<TableCell align="center">
												<Typography color={row.oneyear >= 0 ? "primary" : "error"}>{row.oneyear}%</Typography>
											</TableCell>
										</MuiThemeProvider>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Grid>
					<Typography variant="subtitle2" display="block" style={{ marginTop: 20 }} gutterBottom>
						Pricing Data
					</Typography>

					<Seven id={props.id} />
				</Grid>
			</Grid>
		</Slide>
	);
}
