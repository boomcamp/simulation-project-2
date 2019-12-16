import React, { useEffect, useState } from "react";
import Axios from "axios";
import clsx from "clsx";
import { makeStyles, createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import MaterialTable from "material-table";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { green } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import AddIcon from "@material-ui/icons/Add";
import Chip from "@material-ui/core/Chip";
import RemoveIcon from "@material-ui/icons/Remove";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import Avatar from "@material-ui/core/Avatar";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const useStyles = makeStyles(theme => ({
	root: {
		paddingTop: theme.spacing(10)
	},
	paper: {
		width: "100%",
		marginBottom: theme.spacing(2),
		padding: theme.spacing(2)
	},
	icon: {
		marginTop: theme.spacing(8)
	},
	card: {
		width: "100%",
		boxShadow: "none",
		border: "1px solid #c5c4c4",
		borderRadius: "0"
	},
	title: {
		fontSize: 14
	},
	pos: {
		marginBottom: 12
	}
}));

const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 2
});

const theme = createMuiTheme({
	palette: {
		primary: { main: "#4caf50" }
	}
});

const variantIcon = {
	success: CheckCircleIcon
};

const useStyles1 = makeStyles(theme => ({
	success: {
		backgroundColor: green[600]
	},
	icon: {
		fontSize: 20
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: theme.spacing(1)
	},
	message: {
		display: "flex",
		alignItems: "center"
	}
}));

function MySnackbarContentWrapper(props) {
	const classes = useStyles1();
	const { className, message, onClose, variant, ...other } = props;
	const Icon = variantIcon[variant];

	return (
		<SnackbarContent
			className={clsx(classes["success"], className)}
			aria-describedby="client-snackbar"
			message={
				<span id="client-snackbar" className={classes.message}>
					<Icon className={clsx(classes.icon, classes.iconVariant)} />
					{message}
				</span>
			}
			action={[
				<IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
					<CloseIcon className={classes.icon} />
				</IconButton>
			]}
			{...other}
		/>
	);
}
export default function Investment() {
	let { id } = useParams();
	const classes = useStyles();
	const [transactions, setData] = useState([]);
	const [coin, setCoin] = useState("");
	const [balance, setBalance] = useState(0);
	const [coinInfo, setCoinInfo] = useState([]);
	const [currentPrice, setCurrentPrice] = useState([]);
	const [state] = React.useState({
		columns: [
			{ title: "#", field: "rowData.tableData.id", type: "numeric", render: rowData => rowData.tableData.id + 1 },
			{
				title: "Bought | Sold",
				field: "coinQuantity",
				type: "numeric",
				render: rowData => (
					<MuiThemeProvider theme={theme}>
						<Typography variant="subtitle2" color={rowData.transaction === "buy" ? "primary" : "error"}>
							{`${rowData.coinQuantity}`}
						</Typography>
					</MuiThemeProvider>
				)
			},
			{
				title: "Coin Price",
				field: "currentCoinPrice",
				type: "numeric",
				render: rowData => (
					<Chip variant="outlined" icon={<MonetizationOnIcon />} label={formatter.format(rowData.currentCoinPrice)} />
				)
			},
			{
				title: "Amount Paid or Received",
				field: "totalAmount",
				type: "numeric",
				render: rowData => (
					<Grid>
						<MuiThemeProvider theme={theme}>
							<Typography variant="body1">
								<Chip
									variant="outlined"
									avatar={rowData.transaction === "sell" ? <Avatar>R</Avatar> : <Avatar>P</Avatar>}
									label={formatter.format(rowData.totalAmount)}
								/>
							</Typography>
						</MuiThemeProvider>
					</Grid>
				)
			},
			{
				title: "% Profit or Loss",
				field: "totalAmount",
				type: "numeric",
				render: rowData =>
					rowData.profitOrLoss || rowData.profitOrLoss === 0 ? (
						<Grid>
							<MuiThemeProvider theme={theme}>
								<Typography variant="body1">
									<Chip
										variant="outlined"
										color={rowData.profitOrLoss < 0 ? "secondary" : "primary"}
										icon={rowData.profitOrLoss < 0 ? <RemoveIcon /> : <AddIcon />}
										label={Math.round(rowData.profitOrLoss * 10000 * -1 * -1) / 10000 + "%"}
									/>
								</Typography>
							</MuiThemeProvider>
						</Grid>
					) : (
						<Typography variant="h6">------</Typography>
					)
			},
			{
				title: "",
				field: "totalAmount",
				type: "numeric",
				render: rowData =>
					rowData.profitOrLoss || rowData.profitOrLoss === 0 ? (
						<Grid>
							<MuiThemeProvider theme={theme}>
								<Chip
									variant="outlined"
									icon={<MonetizationOnIcon />}
									label={formatter.format((rowData.profitOrLoss / 100) * rowData.buyPrice * rowData.coinQuantity)}
								/>
							</MuiThemeProvider>
						</Grid>
					) : (
						<Typography variant="h6">------</Typography>
					)
			},
			{
				title: "Transaction Type",
				field: "transaction",
				render: rowData => (
					<MuiThemeProvider theme={theme}>
						<Typography variant="subtitle2" color={rowData.transaction === "buy" ? "primary" : "error"}>
							{rowData.transaction.toUpperCase()}
						</Typography>
					</MuiThemeProvider>
				)
			},
			{ title: "Date", field: "timestamp" }
		],
		data: []
	});
	const [open, setOpen] = useState(false);
	const [totalProfit, setTotalProfit] = useState(0);
	const [bPrice, setBPrice] = useState(0);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
		sessionStorage.removeItem("success");
	};

	useEffect(() => {
		Axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
			.then(response => {
				setCoinInfo(response.data);
				setCurrentPrice(response.data.market_data.current_price);
				setCoin(response.data.name + " transaction history");
			})
			.catch(error => {
				console.log(error.response.data);
			});
	}, [id]);

	useEffect(() => {
		Axios.get(`http://localhost:4000/transactions?_sort=timestamp&_order=desc`).then(response => {
			let initBalance = 0;
			let totalpl = 0;
			let pl;

			let array = response.data.filter(val => {
				val.timestamp = new Intl.DateTimeFormat("en-US", {
					year: "numeric",
					month: "short",
					day: "2-digit",
					hour: "2-digit",
					minute: "2-digit"
				}).format(val.timestamp);
				return val.coinId === id;
			});

			array.forEach(newVal => {
				if (newVal.transaction === "buy") {
					initBalance += newVal.coinQuantity;
				} else {
					initBalance -= newVal.coinQuantity;
					pl = (newVal.profitOrLoss / 100) * newVal.buyPrice * newVal.coinQuantity;
					if (pl > -1) {
						totalpl += pl;
					} else {
						totalpl -= pl;
					}
				}
			});

			let aCurrentCointPrice = 0;
			let count = 0;
			var stat = true;
			var statChecker = true;
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

			setBPrice(aCurrentCointPrice / count);
			setBalance(initBalance);
			setData(array);
			setTotalProfit(totalpl);
		});

		sessionStorage.getItem("success") ? setOpen(true) : setOpen(false);
	}, [id]);

	return (
		<Container className={classes.root} fixed>
			<Snackbar
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right"
				}}
				open={open}
				autoHideDuration={4000}
				onClose={handleClose}
			>
				<MySnackbarContentWrapper onClose={handleClose} variant="success" message="Transaction Done!" />
			</Snackbar>
			<Grid container spacing={1} style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
				<Grid container item xs={12}>
					<Typography variant="h6" align="right" gutterBottom>
						Possible Percentage Profit or Loss if you sell your Coin now
					</Typography>
				</Grid>
				<Grid container item xs={12}>
					<Grid container direction="row" justify="flex-start" alignItems="center">
						<Typography variant="h3" component="h2">
							{Math.round(((currentPrice.usd - bPrice) / bPrice) * 100 * 1000) / 1000} %
						</Typography>{" "}
					</Grid>
				</Grid>
				<Grid container item xs={3}>
					<Card className={classes.card}>
						<CardContent>
							<Typography className={classes.title} color="textSecondary" gutterBottom>
								Coin Wallet
							</Typography>
							<Typography variant="h5" component="h2">
								{balance} {coinInfo.symbol}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid container item xs={3}>
					<Card className={classes.card}>
						<CardContent>
							<Typography className={classes.title} color="textSecondary" gutterBottom>
								Current Price
							</Typography>
							<Typography variant="h5" component="h2">
								{formatter.format(currentPrice.usd)}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid container item xs={3}>
					<Card className={classes.card}>
						<CardContent>
							<Typography className={classes.title} color="textSecondary" gutterBottom>
								Total transactions
							</Typography>
							<Typography variant="h5" component="h2">
								{transactions.length}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid container item xs={3}>
					<Card className={classes.card}>
						<CardContent>
							<Typography className={classes.title} color="textSecondary" gutterBottom>
								Total Profit or Loss
							</Typography>
							<Grid container direction="row" justify="flex-start" alignItems="center">
								{totalProfit > -1 ? (
									<ArrowDropUpIcon style={{ color: "green" }} />
								) : (
									<ArrowDropDownIcon style={{ color: "red" }} />
								)}
								<Typography variant="h5" component="h2">
									{formatter.format(totalProfit)}
								</Typography>{" "}
							</Grid>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<MaterialTable title={coin} columns={state.columns} data={transactions} />
			</Grid>
		</Container>
	);
}
