import React, { useEffect, useState } from "react";
import Axios from "axios";
import { makeStyles, createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import MaterialTable from "material-table";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

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

export default function Investment() {
	let { id } = useParams();
	const classes = useStyles();
	const [transactions, setData] = useState([]);
	const [coin, setCoin] = useState("");
	const [state] = React.useState({
		columns: [
			{ title: "#", field: "rowData.tableData.id", type: "numeric", render: rowData => rowData.tableData.id + 1 },
			{
				title: "Quantity Bought/Sold",
				field: "coinQuantity",
				type: "numeric",
				render: rowData => (
					<MuiThemeProvider theme={theme}>
						<Typography variant="subtitle2" color={rowData.transaction === "buy" ? "primary" : "error"}>
							{rowData.coinQuantity}
							{console.log(rowData.tableData.id)}
						</Typography>
					</MuiThemeProvider>
				)
			},
			{ title: "Amount Cost/Earned", field: "Amount", type: "numeric", render: rowData => formatter.format(rowData.Amount) },
			{
				title: "Total Amount Paid/Earned",
				field: "totalAmount",
				type: "numeric",
				render: rowData => formatter.format(rowData.totalAmount)
			},
			{
				title: "Coin Price Bought / Sell",
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
	}, [id]);

	return (
		<Container className={classes.root} fixed>
			<MaterialTable title={coin} columns={state.columns} data={transactions} />
		</Container>
	);
}
