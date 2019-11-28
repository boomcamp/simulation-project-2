import React, { useEffect, useState } from "react";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import KeyboardTabIcon from "@material-ui/icons/KeyboardTab";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import "semantic-ui-css/semantic.min.css";
import { Pagination } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";

function createData(logo, name, symbol, market_cap, circulating, rank, current) {
	return { logo, name, symbol, market_cap, circulating, rank, current };
}

const rows = [
	createData("Cupcake", 305, 3.7, 67, 3.7, 67, 4.3),
	createData("Donut", 452, 25.0, 51, 3.7, 67, 4.9),
	createData("Eclair", 262, 16.0, 24, 3.7, 67, 6.0),
	createData("Frozen yoghurt", 159, 6.0, 3.7, 67, 24, 4.0),
	createData("Gingerbread", 356, 16.0, 3.7, 67, 49, 3.9),
	createData("Honeycomb", 408, 3.2, 87, 3.7, 67, 6.5),
	createData("Ice cream sandwich", 237, 3.7, 67, 9.0, 37, 4.3),
	createData("Jelly Bean", 375, 0.0, 94, 3.7, 67, 0.0),
	createData("KitKat", 518, 26.0, 65, 3.7, 67, 7.0),
	createData("Lollipop", 392, 0.2, 98, 3.7, 67, 0.0),
	createData("Marshmallow", 318, 0, 81, 3.7, 67, 2.0),
	createData("Nougat", 360, 19.0, 9, 3.7, 67, 37.0),
	createData("Oreo", 437, 18.0, 63, 3.7, 67, 4.0)
];

function desc(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function stableSort(array, cmp) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = cmp(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
	return order === "desc" ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
	{
		id: "logo",
		label: "Logo"
	},
	{ id: "name", numeric: false, disablePadding: false, label: "Name" },
	{ id: "symbol", numeric: true, disablePadding: false, label: "Symbol" },
	{ id: "market_cap", numeric: true, disablePadding: false, label: "Mkt Cap" },
	{ id: "circulating", numeric: true, disablePadding: false, label: "Circulating Supply" },
	{ id: "rank", numeric: true, disablePadding: false, label: "Rank" },
	{ id: "current", numeric: true, disablePadding: false, label: "Current Price" },
	{ id: "view", numeric: true, disablePadding: false, label: "Details" }
];

function EnhancedTableHead(props) {
	const { order, orderBy } = props;

	return (
		<TableHead>
			<TableRow>
				{headCells.map(headCell => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? "right" : "left"}
						padding="default"
						sortDirection={orderBy === headCell.id ? order : false}
					>
						{headCell.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

const useStyles = makeStyles(theme => ({
	root: {
		width: "100%",
		marginTop: theme.spacing(10)
	},
	paper: {
		width: "100%",
		marginBottom: theme.spacing(2),
		padding: theme.spacing(2)
	},
	table: {
		minWidth: 750
	},
	tableWrapper: {
		overflowX: "auto"
	},
	visuallyHidden: {
		border: 0,
		clip: "rect(0 0 0 0)",
		height: 1,
		margin: -1,
		overflow: "hidden",
		padding: 0,
		position: "absolute",
		top: 20,
		width: 1
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200
	}
}));

export default function CryptoList() {
	const classes = useStyles();
	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("rank");
	const [page] = React.useState(0);
	const [rowsPerPage] = React.useState(10);

	const handleRequestSort = (event, property) => {
		const isDesc = orderBy === property && order === "desc";
		setOrder(isDesc ? "asc" : "desc");
		setOrderBy(property);
	};

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	const [data, setData] = useState([]);
	const [cPage, setCPage] = useState(1);
	const [loader, setLoader] = useState(false);

	useEffect(() => {
		Axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page=${cPage}`).then(response => {
			setData(response.data);
		});
	}, [cPage]);

	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2
	});

	const circulatingFormat = num => {
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	};
	const onChange = (e, pageInfo) => {
		setCPage(pageInfo.activePage);

		setLoader(true);
		setTimeout(() => {
			setLoader(false);
		}, 1000);
	};

	return (
		<React.Fragment>
			<Container>
				<div className={classes.root}>
					<Paper className={classes.paper}>
						<Grid container direction="row" justify="space-between" alignItems="flex-start">
							<Grid container direction="row" justify="flex-end" alignItems="flex-end">
								<TextField
									id="standard-search"
									label="Search coin here"
									type="search"
									className={classes.textField}
									margin="normal"
								/>
								<Button color="primary">Search</Button>
							</Grid>
						</Grid>
						<div className={classes.tableWrapper}>
							{loader ? (
								<Fade in>
									<Grid container direction="row" justify="center" alignItems="flex-start" style={{ height: "78vh" }}>
										<Grid container direction="row" justify="center" alignItems="center" style={{ height: "90%" }}>
											<CircularProgress disableShrink />
										</Grid>
									</Grid>
								</Fade>
							) : (
								<Fade in>
									<Table className={classes.table} aria-labelledby="tableTitle" aria-label="enhanced table">
										<EnhancedTableHead
											classes={classes}
											order={order}
											orderBy={orderBy}
											onRequestSort={handleRequestSort}
											rowCount={rows.length}
										/>
										<TableBody>
											{stableSort(data, getSorting(order, orderBy))
												.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
												.map((row, index) => {
													const labelId = index;

													return (
														<TableRow hover tabIndex={-1} key={index}>
															<TableCell
																component="th"
																style={{ width: "10%" }}
																id={labelId}
																scope="row"
																padding="default"
															>
																<img src={row.image} alt={row.name} style={{ width: "30px" }} />
															</TableCell>
															<TableCell>{row.name}</TableCell>
															<TableCell align="right">{row.symbol}</TableCell>
															<TableCell align="right">{formatter.format(row.market_cap).split(".")[0]}</TableCell>
															<TableCell align="right">
																{circulatingFormat(Math.round(row.circulating_supply))}
															</TableCell>
															<TableCell align="right">{row.market_cap_rank}</TableCell>
															<TableCell align="right">
																<Typography variant="subtitle2" gutterBottom>
																	{formatter.format(row.current_price)}
																</Typography>
															</TableCell>
															<TableCell align="right">
																<NavLink to={`/${row.id}`} color="secondary">
																	<Button color="secondary">
																		<KeyboardTabIcon />
																	</Button>
																</NavLink>
															</TableCell>
														</TableRow>
													);
												})}
											{emptyRows > 0 && (
												<TableRow>
													<TableCell colSpan={6} />
												</TableRow>
											)}
										</TableBody>
									</Table>
								</Fade>
							)}

							<Grid container direction="row" justify="center" alignItems="center" style={{ marginTop: "10px" }}>
								<Pagination activePage={cPage} onPageChange={onChange} totalPages={620} ellipsisItem={null} />
							</Grid>
						</div>
					</Paper>
				</div>
			</Container>
		</React.Fragment>
	);
}
