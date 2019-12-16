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
import ViewListOutlinedIcon from "@material-ui/icons/ViewListOutlined";
import Routes from "../../routes";

import { useStyles } from "./Style";
import Logo from "../../images/logo.webp";
const ImgLogo = styled.img`
  height: 45px;
`;
class Sidenav extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.props.toggle
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.props.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: this.props.toggle
              })}
            >
              <MenuIcon />
            </IconButton>
            <Link to={"/"}>
              <ImgLogo src={Logo} alt="" />
            </Link>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: this.props.toggle,
            [classes.drawerClose]: !this.props.toggle
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: this.props.toggle,
              [classes.drawerClose]: !this.props.toggle
            })
          }}
          open={this.props.toggle}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.props.handleDrawerClose}>
              {classes.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {["Home", "Investment Tracking"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index === 0 ? (
                    <Link to={"/"} style={{ color: "grey" }}>
                      <HomeOutlinedIcon />
                    </Link>
                  ) : index === 1 ? (
                    <Link to={"/investments"} style={{ color: "grey" }}>
                      <ViewListOutlinedIcon />
                    </Link>
                  ) : (
                    ""
                  )}
                </ListItemIcon>
                {index === 0 ? (
                  <Link to={"/"} style={{ color: "grey" }}>
                    <ListItemText primary={text} />
                  </Link>
                ) : (
                  <Link to={"/investments"} style={{ color: "grey" }}>
                    <ListItemText primary={text} />
                  </Link>
                )}
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
            handleAmount={this.props.handleAmount}
            amountValue={this.props.amountValue}
            cryptValue={this.props.cryptValue}
          />
        </main>
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(Sidenav);
