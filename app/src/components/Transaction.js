import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(3, 2),
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: "#e2e2e2"
	}
}));
export default function Transaction() {
	const classes = useStyles();
	return (
		<Paper className={classes.root} elevation={0} square={true}>
			<Typography variant="h5" component="h3">
				This is a sheet of paper.
			</Typography>
			<Typography component="p">Paper can be used to build surface or other elements for your application.</Typography>
		</Paper>
	);
}
