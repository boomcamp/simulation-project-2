import React from "react";
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Container from "@material-ui/core/Container";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SwapHorizontalCircleIcon from "@material-ui/icons/SwapHorizontalCircle";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";

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
	},
	list: {
		width: 250
	},
	fullList: {
		width: "auto"
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
	let history = useHistory();
	const classes = useStyles();
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false
	});

	const toggleDrawer = (side, open) => event => {
		if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
			return;
		}

		setState({ ...state, [side]: open });
	};

	const sideList = side => (
		<div className={classes.list} role="presentation" onClick={toggleDrawer(side, false)} onKeyDown={toggleDrawer(side, false)}>
			<List>
				<ListItem
					button
					onClick={() => {
						history.push("/");
					}}
				>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary={"Home"} />
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem button>
					<ListItemIcon>
						<SwapHorizontalCircleIcon />
					</ListItemIcon>
					<ListItemText primary={"Transactions"} />
				</ListItem>
			</List>
		</div>
	);

	return (
		<div className={classes.root}>
			<ThemeProvider theme={theme}>
				<AppBar position="fixed">
					<Container fixed>
						<Toolbar disableGutters>
							<IconButton
								edge="start"
								className={classes.menuButton}
								color="inherit"
								aria-label="menu"
								onClick={toggleDrawer("left", true)}
							>
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
			<Drawer open={state.left} onClose={toggleDrawer("left", false)}>
				{sideList("left")}
			</Drawer>
		</div>
	);
}
