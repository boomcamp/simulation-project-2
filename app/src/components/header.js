import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { fade } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

const useStyles = theme => ({
  root: {
    flexGrow: 1
  },
  nav: {
    background: "#304850",
    zIndex: 0
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  link: {
    textDecoration: "none",
    color: "white",
    margin: "15px"
  }
});

class header extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <React.Fragment>
          <AppBar position="relative" className={classes.nav}>
            <Toolbar>
              <Typography
                className={classes.title}
                variant="h6"
                noWrap
              ></Typography>

              <Link to="/">
                <Typography className={classes.link}>Home</Typography>
              </Link>
              <Typography>></Typography>
              <Link to="/transaction">
                <Typography className={classes.link}>
                  Historical Transaction
                </Typography>
              </Link>
            </Toolbar>
          </AppBar>
        </React.Fragment>
      </div>
    );
  }
}
export default withStyles(useStyles)(header);
