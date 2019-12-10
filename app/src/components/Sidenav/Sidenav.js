import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import RestorePageOutlinedIcon from "@material-ui/icons/RestorePageOutlined";
import ViewListOutlinedIcon from "@material-ui/icons/ViewListOutlined";
import Routes from "../../routes";

import { useStyles } from "./Style";
import Logo from "../../images/logo.webp";
const ImgLogo = styled.img`
  height: 45px;
`;
class Sidenav extends React.Component {
  constructor() {
    super();
    this.state = {
      toggle: false
    };
  }
  handleDrawerOpen = () => {
    this.setState({ toggle: true });
  };
  handleDrawerClose = () => {
    this.setState({ toggle: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.state.toggle
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: this.state.toggle
              })}
            >
              <MenuIcon />
            </IconButton>
            <Link to={"/"}>
              <ImgLogo src={Logo} alt="" />
            </Link>
            {/* <Typography noWrap>
              <b style={{ fontSize: "12px" }}>Investment Tracker</b>
            </Typography> */}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: this.state.toggle,
            [classes.drawerClose]: !this.state.toggle
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: this.state.toggle,
              [classes.drawerClose]: !this.state.toggle
            })
          }}
          open={this.state.toggle}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {classes.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {[
              "Home",
              "Investment Tracking",
              "Buy / Sell",
              "Transaction Logs"
            ].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index === 0 ? (
                    <Link to={"/"} style={{ color: "grey" }}>
                      <HomeOutlinedIcon />
                    </Link>
                  ) : index === 1 ? (
                    <ViewListOutlinedIcon />
                  ) : index === 2 ? (
                    <ShoppingCartOutlinedIcon />
                  ) : index === 3 ? (
                    <RestorePageOutlinedIcon />
                  ) : (
                    ""
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Routes
            currencies={this.props.currencies}
            handleChange={this.props.handleChange}
            handleOnChange={this.props.handleOnChange}
            currency={this.props.currency}
            activePage={this.props.activePage}
            getData={this.props.getData}
            isLoading={this.props.isLoading}
            unit={this.props.currency.unit}
            handleEntries={this.props.handleEntries}
            dataPerPage={this.props.dataPerPage}
            totalEntries={this.props.totalEntries}
          />
        </main>
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(Sidenav);
