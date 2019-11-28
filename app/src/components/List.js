import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Seven from "./charts/Seven";

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
	return (
		<div>
			<Grid className={classes.paper} container spacing={3}>
				<Grid container direction="row" justify="space-between" alignItems="flex-start" item xs={3}>
					<Typography variant="h4" display="block" gutterBottom>
						Quick Stats
					</Typography>
					<Grid container direction="row" justify="space-between" alignItems="flex-end" item xs={12}>
						<Typography variant="button" display="block" gutterBottom>
							Price
						</Typography>{" "}
						<Typography variant="button" display="block" style={{ fontSize: "50px" }} gutterBottom>
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
				</Grid>
				<Grid container item xs={9}>
					<Seven />
				</Grid>
			</Grid>
		</div>
	);
}
