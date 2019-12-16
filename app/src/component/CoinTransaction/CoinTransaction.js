import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import {
	makeStyles,
	Paper,
	Grid,
	Breadcrumbs,
	Typography,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider
} from '@material-ui/core';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';

import HistoryTransaction from './HistoryTransaction/HistoryTransaction';
import BuyTransaction from './BuyTransaction/BuyTransaction';
import SellTransaction from './SellTransaction/SellTransaction';
import TrackTransaction from './TrackTransaction/TrackTransaction';
import { Header } from './../../layout';

export default function CoinTransaction(props) {
	const classes = useStyles();
	const [selectedIndex, setSelectedIndex] = React.useState('buy');
	const [coin, setCoin] = useState({});

	useEffect(() => {
		Axios.get(
			`https://api.coingecko.com/api/v3/coins/${props.match.params.id}`
		).then(res => {
			setCoin(res.data);
		});
	}, [props.match.params.id]);

	const handleListItemClick = (event, index) => {
		setSelectedIndex(index);
	};
	if (coin) {
		return (
			<React.Fragment>
				<Header />
				<Grid container spacing={2} className={classes.container}>
					<Grid item xs={12}>
						<Breadcrumbs aria-label="breadcrumb" style={{ paddingLeft: 20 }}>
							<Link color="inherit" to="/">
								Coin
							</Link>
							<Link color="inherit" to={`/details/${coin.id}`}>
								{coin.name}
							</Link>
							<Typography color="textPrimary">Transaction</Typography>
						</Breadcrumbs>
					</Grid>
					<Grid item xs={2}>
						<Paper className={classes.paper}>
							<div className={classes.root}>
								<List component="nav" aria-label="main mailbox folders">
									<ListItem
										button
										selected={selectedIndex === 'buy'}
										onClick={event => handleListItemClick(event, 'buy')}
									>
										<ListItemIcon>
											<ShoppingCartIcon />
										</ListItemIcon>
										<ListItemText primary="Buy" />
									</ListItem>
									<Divider />
									<ListItem
										button
										selected={selectedIndex === 'sell'}
										onClick={event => handleListItemClick(event, 'sell')}
									>
										<ListItemIcon>
											<AttachMoneyIcon />
										</ListItemIcon>
										<ListItemText primary="Sell" />
									</ListItem>
									<Divider />
									<ListItem
										button
										selected={selectedIndex === 'track'}
										onClick={event => handleListItemClick(event, 'track')}
									>
										<ListItemIcon>
											<TrendingDownIcon />
										</ListItemIcon>
										<ListItemText primary="Track Investment" />
									</ListItem>
									<Divider />
									<ListItem
										button
										selected={selectedIndex === 'history'}
										onClick={event => handleListItemClick(event, 'history')}
									>
										<ListItemIcon>
											<AllInboxIcon />
										</ListItemIcon>
										<ListItemText primary="History Transaction" />
									</ListItem>
								</List>
							</div>
						</Paper>
					</Grid>
					<Grid item xs={9}>
						<Paper className={classes.paper}>
							{selectedIndex === 'buy' ? (
								<BuyTransaction coin={coin} />
							) : selectedIndex === 'history' ? (
								<HistoryTransaction coin={coin} />
							) : selectedIndex === 'sell' ? (
								<SellTransaction coin={coin} />
							) : selectedIndex === 'track' ? (
								<TrackTransaction coin={coin} />
							) : null}
						</Paper>
					</Grid>
				</Grid>
			</React.Fragment>
		);
	} else {
		return <h2>Loading ...</h2>;
	}
}

const useStyles = makeStyles(theme => ({
	container: {
		marginTop: 80
	},
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper
	},
	paper: {
		padding: theme.spacing(3, 2),
		width: '100%',
		margin: '10px 2%',
		display: 'flex',
		justifyContent: 'center',
		alignContent: 'center'
	}
}));
