import React from "react";
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Container from "@material-ui/core/Container";

import { NavLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(0)
	},
	title: {
		flexGrow: 1
	}
}));

const theme = createMuiTheme({
	palette: {
		primary: {
			light: "#757ce8",
			main: "#1976d2",
			dark: "#002884",
			contrastText: "#fff"
		},
		secondary: {
			main: "#7c4dff"
		}
	}
});

export default function Navigation() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<ThemeProvider theme={theme}>
				<AppBar position="fixed">
					<Container fixed>
						<Toolbar disableGutters>
							<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
								<MenuIcon />
							</IconButton>
							<Typography variant="h6" className={classes.title}>
								Cryptocurrencies
							</Typography>
							<NavLink to="/" style={{ color: "white" }}>
								<Typography variant="h6" className={classes.title}>
									Home
								</Typography>
							</NavLink>
						</Toolbar>
					</Container>
				</AppBar>
			</ThemeProvider>
		</div>
	);
}
