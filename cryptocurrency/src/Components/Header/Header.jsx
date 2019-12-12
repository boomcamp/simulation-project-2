import React from 'react'
import { fade,makeStyles,MuiThemeProvider,createMuiTheme } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import SearchIcon from '@material-ui/icons/Search';
// import InputBase from '@material-ui/core/InputBase';

function Header(props) {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#ffffff',
      },
      secondary: {
        main: '#00897b',
      },
    },
  });

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    navButton: {
      alignSelf: 'center',
      textDecoration: 'none',
      color: '#000',
      margin: '0 50px',
      fontWeight: '700',
      '&:hover': {
        textDecoration: 'underline',
        color: '#00897b'
      }
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    },
  }));

  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Simulation Project 2
          </Typography>
          <Link className={classes.navButton} color="inherit" to="/">Coins</Link>
          <Link className={classes.navButton} color="inherit" to="/track-investment">Track Investment</Link>
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={e => props.searchValueFn(e.target.value)}
            />
        </div> */}
        </Toolbar>
      </AppBar>
    </MuiThemeProvider>
  )
}

export default Header
