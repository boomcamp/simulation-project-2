import React, { useEffect, useState } from "react";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import MaterialTable from "material-table";
import Container from "@material-ui/core/Container";

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

export default function Investment() {
	let { id } = useParams();
	const classes = useStyles();
	const [coin, setCoin] = useState("");
	const [state, setState] = React.useState({
		columns: [
			{ title: "Quantity", field: "quantity" },
			{ title: "Amount", field: "amount" },
			{ title: "Birth Year", field: "birthYear", type: "numeric" },
			{
				title: "Birth Place",
				field: "birthCity",
				lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
			}
		],
		data: [
			{ name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
			{
				name: "Zerya Betül",
				surname: "Baran",
				birthYear: 2017,
				birthCity: 34
			}
		]
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

	return (
		<Container className={classes.root} fixed>
			<MaterialTable title={coin} columns={state.columns} data={state.data} />
		</Container>
	);
}
