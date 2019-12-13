import React from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { FaHome } from "react-icons/fa";
import Routes from "../Routes/Routes";
import { TitleDiv, white, Span, font } from "../AppStyle";
import { Link } from "react-router-dom";
import { useStyles } from "./useStyles";
import { GiMoneyStack } from "react-icons/gi";

export default function SideNav(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" style={white}>
            <Typography variant="h6" noWrap>
              Cryptocurrency
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <TitleDiv>
            <Span>Menu</Span>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon style={white} />
              ) : (
                <ChevronRightIcon style={white} />
              )}
            </IconButton>
          </TitleDiv>
        </div>
        <Divider />
        <List style={font}>
          <Link to="/" style={white}>
            <ListItem button>
              <ListItemIcon>
                <FaHome style={white} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Link to="/investment/tracking" style={white}>
            <ListItem button>
              <ListItemIcon>
                <GiMoneyStack style={white} />
              </ListItemIcon>
              <ListItemText primary="Investment Tracking" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <Routes
          data={props.data}
          loading={props.loading}
          currency={props.currency}
          handleSelect={props.handleSelect}
          handlePagination={props.handlePagination}
          currentPage={props.currentPage}
          currencies={props.currencies}
          cryptoList={props.cryptoList}
          crypto={props.crypto}
          handleCrypto={props.handleCrypto}
          currentPrice={props.currentPrice}
          cryptoValue={props.cryptoValue}
          moneyValue={props.moneyValue}
          handleOnChange={props.handleOnChange}
          handleSubmitInvest={props.handleSubmitInvest}
          lastTrans={props.lastTrans}
          transList={props.transList}
          handleSubmitSell={props.handleSubmitSell}
          handleClickOpen={props.handleClickOpen}
          handleClose={props.handleClose}
          open={props.open}
          totalProfit={props.totalProfit}
          currentTransaction={props.currentTransaction}
          sellingAmount={props.sellingAmount}
          handleUpdate={props.handleUpdate}
        />
      </main>
    </React.Fragment>
  );
}
