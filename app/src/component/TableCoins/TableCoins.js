import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Header } from './../../layout';
import {
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	CircularProgress
} from '@material-ui/core';

export default function TableContent(props) {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(15);
	const [state, setState] = useState({
		columns: [
			{ id: 'market_cap_rank', label: 'Rank', minWidth: 10 },
			{ id: 'image', label: 'Logo', minWidth: 50, align: 'center' },
			{ id: 'name', label: 'Name', minWidth: 170 },
			{ id: 'symbol', label: 'Symbol', minWidth: 170 },
			{ id: 'current_price', label: 'Current Price', minWidth: 170 },
			{ id: 'price_change_24h', label: 'Price Change 24Hrs', minWidth: 170 },
			{ id: 'circulating_supply', label: 'Ciculating Supply', minWidth: 170 },
			{ id: 'last_updated', label: 'Last Updated', minWidth: 170 }
		],
		data: []
	});

	useEffect(() => {
		if (loading === false) {
			Axios.get(
				'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false'
			)
				.then(res => {
					setState({ ...state, data: res.data });
				})
				.then(() => setLoading(true));
		}
	}, [state, loading]);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = event => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	const handleClick = id => {
		props.history.push(`/details/${id}`);
	};
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	});
	if (loading) {
		return (
			<React.Fragment>
				<Header />
				<Paper className={classes.root}>
					<div className={classes.tableWrapper}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									{state.columns.map(column => (
										<TableCell
											key={column.id}
											align={column.align}
											style={{ minWidth: column.minWidth }}
											className={classes.head}
										>
											{column.label}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{state.data
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map(column => {
										return (
											<TableRow
												hover
												key={column.id}
												onClick={() => handleClick(column.id)}
												style={{ cursor: 'pointer' }}
											>
												<TableCell>{column.market_cap_rank}</TableCell>
												<TableCell align="center">
													<img
														className={classes.image}
														src={column.image}
														alt=""
													/>
												</TableCell>
												<TableCell>{column.name}</TableCell>
												<TableCell>{column.symbol}</TableCell>
												<TableCell>
													{formatter.format(column.current_price)}
												</TableCell>
												<TableCell>
													{formatter.format(column.price_change_24h)}
												</TableCell>
												<TableCell>
													{formatter.format(column.circulating_supply)}
												</TableCell>
												<TableCell>{column.last_updated}</TableCell>
											</TableRow>
										);
									})}
							</TableBody>
						</Table>
					</div>
					<TablePagination
						rowsPerPageOptions={[15, 25, 50, 100, 250]}
						component="div"
						count={state.data.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
					/>
				</Paper>
			</React.Fragment>
		);
	} else {
		return (
			<div className={classes.loading}>
				<CircularProgress /> <h2>Loading ...</h2>
			</div>
		);
	}
}

const useStyles = makeStyles({
	root: {
		width: '100%',
		marginTop: 80
	},
	tableWrapper: {
		maxHeight: 649,
		overflow: 'auto'
	},
	image: {
		maxHeight: 30,
		maxWidth: 30
	},
	head: {
		backgroundColor: '#8DC647',
		color: '#FFF'
	},
	loading: {
		display: 'flex',
		justifyContent: 'center',
		flexFlow: 'column',
		alignItems: 'center',
		marginTop: 60
	}
});
