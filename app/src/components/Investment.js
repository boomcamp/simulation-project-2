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
							{rowData.coinQuantity}
						</Typography>
					</MuiThemeProvider>
				)
			},
			{
				title: "Total Cost | Earned",
				field: "totalAmount",
				type: "numeric",
				render: rowData => formatter.format(rowData.totalAmount)
			},
			{
				title: "% Profit or Loss",
				field: "totalAmount",
				type: "numeric",
				render: rowData =>
					rowData.profitOrLoss || rowData.profitOrLoss === 0 ? (
						<MuiThemeProvider theme={theme}>
							<Typography variant="h6" color={rowData.profitOrLoss < 0 ? "error" : "primary"}>
								{Math.round(rowData.profitOrLoss * 10000) / 10000} %
							</Typography>
						</MuiThemeProvider>
					) : (
						<Typography variant="h6">------</Typography>
					)
			},
			{
				title: "Coin Price when bought or sell",
				field: "currentCoinPrice",
				type: "numeric",
				render: rowData => formatter.format(rowData.currentCoinPrice)
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
				setCoin(response.data.name + " transaction history");
			})
			.catch(error => {
				console.log(error.response.data);
			});
	}, [id]);

	useEffect(() => {
		Axios.get(`http://localhost:4000/transactions?_sort=timestamp&_order=desc`).then(response => {
			setData(
				response.data.filter(val => {
					val.timestamp = new Intl.DateTimeFormat("en-US", {
						year: "numeric",
						month: "short",
						day: "2-digit",
						hour: "2-digit",
						minute: "2-digit"
					}).format(val.timestamp);
					return val.coinId === id;
				})
			);
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
			<MaterialTable title={coin} columns={state.columns} data={transactions} />
		</Container>
	);
}
