import React, { useState } from "react";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";

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
	const classes = useStyles();
	const [coin, setCoin] = useState("");
	const [amount, setAmount] = useState("");
	const [fee, setFee] = useState(0);
	return (
		<Slide direction="left" in>
			<Paper className={classes.root} elevation={0} square={true}>
				<Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={2}>
					<Grid container item xs={5}>
						<Grid container item xs={12}>
							<Typography variant="h6" display="block" component="h3">
								Payment Method
							</Typography>
						</Grid>
						<Grid container item xs={12}>
							<List>
								<ListItem>
									<ListItemIcon style={{ color: "rgb(0, 78, 224)" }}>
										<AccountBalanceIcon fontSize="large" />
									</ListItemIcon>
									<ListItemText primary="Bank Account" />
								</ListItem>
							</List>
						</Grid>
						<Grid container item xs={12}>
							<Typography variant="h6" component="h3">
								Amount
							</Typography>
						</Grid>
						<Grid container item xs={12} alignItems="center" justify="center">
							<TextField
								label="Amount"
								id="outlined-start-adornment"
								className={clsx(classes.margin, classes.textField)}
								InputProps={{
									startAdornment: <InputAdornment position="start">&#36;</InputAdornment>
								}}
								variant="outlined"
								value={coin}
								type="number"
								onChange={e => {
									if (e.target.value > -1) {
										setAmount(+e.target.value / props.price);
										setCoin(+e.target.value);
										setFee(+e.target.value * 0.1);
									}
								}}
								autoFocus={true}
							/>
							<SyncAltIcon />
							<TextField
								id="outlined-start-adornment"
								className={clsx(classes.margin, classes.textField)}
								InputProps={{
									endAdornment: <InputAdornment position="start">{props.symbol}</InputAdornment>
								}}
								variant="outlined"
								type="number"
								value={amount}
								onChange={e => {
									if (e.target.value > -1) {
										setCoin(+e.target.value * props.price);
										setAmount(+e.target.value);
										setFee(+e.target.value * props.price * 0.1);
									}
								}}
							/>
						</Grid>

						<Grid container item xs={12} spacing={1} justify="center">
							<Grid item>
								<Button variant="contained" size="large" color="primary" style={{ marginTop: "20px" }}>
									Confirm
								</Button>
							</Grid>
							<Grid item>
								<Button
									variant="contained"
									size="large"
									color="secondary"
									style={{ marginTop: "20px" }}
									onClick={() => props.buy(false)}
								>
									Cancel
								</Button>
							</Grid>
						</Grid>
					</Grid>
					<Grid container item xs={7}>
						<Grid item xs={12} style={{ padding: "20px 0px" }}>
							<Typography variant="body1" align="center">
								YOU ARE BUYING
							</Typography>
						</Grid>
						<Grid item xs={12} style={{ padding: "5px 0px" }}>
							<Typography variant="h2" align="center" color="primary">
								{Math.round(amount * 10000) / 10000} {props.symbol.toUpperCase()}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="h6" align="center">
								&#64; {`${props.formatter.format(props.price)}`} per {props.symbol}
							</Typography>
						</Grid>
						<Grid item container xs={12} style={{ padding: "20px 20%" }}>
							<Grid container item xs={12} justify="space-between">
								<Typography variant="h6">Fee:</Typography>
								<Typography variant="h6">{props.formatter.format(coin)}</Typography>
							</Grid>
							<Grid container item xs={12} justify="space-between">
								<Typography variant="h6">Transaction Fee:</Typography>
								<Typography variant="h6">{props.formatter.format(Math.round(fee * 10000) / 10000)}</Typography>
							</Grid>
							<Grid container item xs={12} justify="space-between">
								<Typography variant="h6">Total:</Typography>
								<Typography variant="h6">{props.formatter.format(coin + fee)}</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</Slide>
	);
}
