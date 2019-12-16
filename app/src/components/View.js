import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ReactHtmlParser from "react-html-parser";
import List from "./List";
import CircularProgress from "@material-ui/core/CircularProgress";
import KeyboardReturnIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const useStyles = makeStyles(theme => ({
	root: {
		paddingTop: theme.spacing(2)
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

export default function View() {
	const classes = useStyles();
	let { id } = useParams();
	let history = useHistory();
	const [data, setData] = useState([]);
	const [img, setImg] = useState([]);
	const [desc, setDesc] = useState([]);
	const [symbol, setSymbol] = useState([]);
	const [priceData, setPriceData] = useState([]);
	const [marketData, setMarketData] = useState([]);
	const [cMarketData, setSetMarketData] = useState([]);
	const [priceHourPChange, setPriceHourPChange] = useState(null);
	const [checker, setChecker] = useState(false);
	const [loader, setLoader] = useState(true);

	useEffect(() => {
		Axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
			.then(response => {
				setData(response.data);
				setImg(response.data.image);
				setDesc(response.data.description);
				setPriceData(response.data.market_data.current_price);
				setMarketData(response.data.market_data.market_cap);
				setSetMarketData(response.data.market_data);
				setPriceHourPChange(response.data.market_data.price_change_percentage_1h_in_currency.usd);
				setSymbol(response.data.symbol);
				setLoader(false);
			})
			.catch(error => {
				setChecker(true);

				console.log(error.response.data);
			});
	}, [id]);

	if (loader) {
		return (
			<div>
				<Container className={classes.root} fixed>
					<Grid container direction="row" justify="center" alignItems="center" style={{ height: "97vh" }}>
						{" "}
						<Loader type="MutatingDots" color="#19aeaf" height={80} width={100} />
					</Grid>
				</Container>
			</div>
		);
	}

	if (checker) {
		return (
			<div>
				<h1 style={{ textAlign: "center", fontSize: "5rem", paddingTop: "20%" }}>
					Coin <span style={{ textAlign: "center", fontSize: "20px" }}>not found!</span>
				</h1>
			</div>
		);
	}

	return (
		<Container className={classes.root} fixed>
			<Button color="secondary" className={classes.icon} onClick={history.goBack}>
				<KeyboardReturnIcon fontSize="large" /> back
			</Button>
			<Paper className={classes.paper}>
				<Grid container spacing={3} alignItems="flex-start">
					<Grid item xs={3} container justify="center">
						{!img.large ? <CircularProgress disableShrink /> : <img src={img.large} alt="logo" />}

						<Typography variant="h4" style={{ paddingTop: "10px" }} gutterBottom>
							{data.name}
						</Typography>
					</Grid>
					<Grid item xs={9} container style={{ height: "300px", overflow: "auto" }}>
						<Typography variant="subtitle1" gutterBottom>
							{ReactHtmlParser(desc.en)}
						</Typography>
					</Grid>
				</Grid>
			</Paper>
			<List
				priceData={priceData}
				marketData={marketData}
				cMarketData={cMarketData}
				id={id}
				name={data.name}
				priceHourPChange={priceHourPChange}
				symbol={symbol}
				img={img}
			/>
		</Container>
	);
}
