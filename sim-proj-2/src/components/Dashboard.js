import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import NavBar from './tools/NavBar'
// import Title from './tools/Title'
// import CryptoInvestedCoins from './CryptoInvestedCoins';
// import CyptoBuy from './CyptoBuy'
import CryptoTable from './coinsTable/CryptoTable';
import Copyright from './tools/Copyright'


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <NavBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {/* <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Title>Invested Coins</Title>
                <CryptoInvestedCoins />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Title>Cryptocurrency Invesment</Title>
                <CyptoBuy />
              </Paper>
            </Grid> */}
            <Grid item xs={9} style={{margin:`0 auto`}}>
                <CryptoTable />
            </Grid>
          {/* </Grid> */}
          <Box pt={4}>
            <Copyright />
          </Box>
        {/* </Container> */}
      </main>
    </div>
  );
}