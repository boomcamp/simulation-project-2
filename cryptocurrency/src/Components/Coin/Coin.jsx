import React,{ useState, useEffect } from 'react';
import Header from '../Header/Header';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles'; 
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Chart from './Chart';
import Buy from './Buy';
//import Sell from './Sell';


function Coin(props) {
  const useStyles = makeStyles(theme => ({
    paper: {
      height: 'auto',
      width: '80%',
      margin: 'auto',
      marginTop: theme.spacing(2),
      alignItems: 'center',
      border: 'none',
    },
    link: {
      display: 'flex',
      textDecoration: 'none',
      color: '#333333',
      fontSize: '14px',
      marginLeft: '0',
      '&:hover': {
        color: '#00897b'
      }
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 19,
    },
    sampleBorder: {
      border: '1px solid white'
    },
    currencyImg: {
      margin: 'auto 48%'
    },
    currencyHeader: {
      margin: 'auto',
      textTransform: 'uppercase',
      fontSize: '2rem',
      textAlign: 'center'
    },
    currencyDetails: {
      listStyle: 'none'
    },
    currencyList: {
      listStyle: 'none',
      '& span': {
        fontWeight: 700
      }
    },
    table: {
      margin: 'auto',
      border: '1px solid black',
      width: '75%',
    },
    tableCell: {
      border: '1px solid black',
      textAlign: 'center'
    },
    topBotMargin: {
      margin: '2% auto'
    },
    graphBtn: {
      display: 'flex',
      justifyContent: 'center'
    },
    graphGrid: {
      margin: '1% auto',
      display: 'flex'
    },
    buysellBtn: {
      display: 'flex',
      margin: '2%', 
      padding: '2px',
      justifyContent: 'center'
    },
  }))

  const classes = useStyles();

  const [coinData, setCoinData] = useState({
    data: []
  });

  useEffect(() => {
    getCoinDetailsFn();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])

  const getCoinDetailsFn = () => {
    axios({
      method: 'get',
      url: `https://api.coingecko.com/api/v3/coins/${props.match.params.coin}?localization=false&community_data=false&developer_data=false`
    })
    .then(response => {
      setCoinData({
        ...coinData,
        data: response.data
      })
    })
    .catch(error => console.log(error))
  }

  const [graphDays, setGraphDays] = useState(1);
  
  const graphChangeDays = (e) => {
    setGraphDays(e);
  }

  const [alignment, setAlignment] = useState('hr24');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  }
  return (
    <React.Fragment>
      <Header />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box className={classes.paper}>
            <Breadcrumbs>
              <Link color="inherit" to="/" className={classes.link}>
                <FormatListBulletedIcon className={classes.icon} />
                Coins
              </Link>
              <p disabled color="inherit" className={classes.link}>
                <MonetizationOnIcon className={classes.icon} />
                {coinData.data.name}
              </p>
            </Breadcrumbs>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
              <Grid item xs={12}>
                <Container>
                  <img className={classes.currencyImg} src={(coinData.data.image) && coinData.data.image.small} alt={coinData.data.id}/>
                </Container>
              </Grid>
              <Grid item xs={12}>
                <Container>
                  <h1 className={classes.currencyHeader}>{coinData.data.name}</h1>
                </Container>
              </Grid>
              <Grid container className={classes.currencyDetails} justify="space-around" spacing={2}>
                <ul className={classes.currencyList}>
                  <li><span>Market Cap: </span> Rank #{coinData.data.coingecko_rank}</li>
                  <li><span>Symbol: </span> {coinData.data.symbol}</li>
                  <li><span>Categories: </span> {(coinData.data.categories) ? coinData.data.categories[0] : null}</li>
                  <li><span>Homepage: </span> <a href={(coinData.data.links) && coinData.data.links.homepage[0]}>{(coinData.data.links) && coinData.data.links.homepage[0]}</a></li>
                  <li><span>Explorers: </span> <a href={(coinData.data.links) && coinData.data.links.blockchain_site[0]}>{(coinData.data.links) && coinData.data.links.blockchain_site[0]}</a></li>
                  <li><span>Official Forum: </span> <a href={(coinData.data.links) && coinData.data.links.official_forum_url[0]}>{(coinData.data.links) && coinData.data.links.official_forum_url[0]}</a></li>
                  <li><span>Source Code: </span> <a href={(coinData.data.links) && coinData.data.links.repos_url.github[0]}>{(coinData.data.links) && coinData.data.links.repos_url.github[0]}</a></li>
                </ul>
                <ul className={classes.currencyList}>
                  <li><span>Price Changes: </span> <NumberFormat decimalScale={1} value={(coinData.data.market_data) && coinData.data.market_data.price_change_percentage_24h} displayType={'text'} suffix={'%'} /></li>
                  <li><span>Bitcoin Price: </span> <NumberFormat decimalScale={2} value={(coinData.data.market_data) && coinData.data.market_data.current_price.usd} displayType={'text'} thousandSeparator={true} prefix={'$'} /></li>
                  <li><span>Market Cap: </span> <NumberFormat value={(coinData.data.market_data) && coinData.data.market_data.market_cap.usd} displayType={'text'} thousandSeparator={true} prefix={'$'} /></li>
                  <li><span>24 Hour Trading Volume: </span> <NumberFormat value={(coinData.data.market_data) && coinData.data.market_data.total_volume.usd} displayType={'text'} thousandSeparator={true} prefix={'$'} /></li>
                  <li><span>24h Low / 24h High: </span> <NumberFormat decimalScale={2} value={(coinData.data.market_data) && coinData.data.market_data.low_24h.usd} displayType={'text'} thousandSeparator={true} prefix={'$'} /> / <NumberFormat decimalScale={2} value={(coinData.data.market_data) && coinData.data.market_data.high_24h.usd} displayType={'text'} thousandSeparator={true} prefix={'$'} /></li>
                  <li><span>All-Time High: </span> <NumberFormat decimalScale={2} value={(coinData.data.market_data) && coinData.data.market_data.ath.usd} displayType={'text'} thousandSeparator={true} prefix={'$'} /></li>
                  <li><span>All-Time Low: </span> <NumberFormat decimalScale={2} value={(coinData.data.market_data) && coinData.data.market_data.atl.usd} displayType={'text'} thousandSeparator={true} prefix={'$'} /></li>
                  <li className={classes.buysellBtn}>
                    <Buy coinID={props.match.params.coin} coinSymbol={coinData.data.symbol} coinImage={(coinData.data.image) && coinData.data.image.small} coinName={coinData.data.name} coinSym={coinData.data.symbol} coinPrice={(coinData.data.market_data) && coinData.data.market_data.current_price.usd} />
                    {/* <Sell oinID={props.match.params.coin} coinName={coinData.data.name} coinSym={coinData.data.symbol} coinPrice={(coinData.data.market_data) && coinData.data.market_data.current_price.usd} /> */}
                  </li>
                </ul>
              </Grid>      
              <Grid container className={classes.currencyDetails} justify="space-around" spacing={2}>
                <Grid item xs={12} sm={10} md={9} lg={9}>
                  <h3>Description:</h3>
                  <p dangerouslySetInnerHTML = {{__html: (coinData.data.description) && coinData.data.description.en}}/>
                </Grid>
              </Grid>  
              <Grid item xs={12} className={classes.topBotMargin}>
                <Grid container justify="space-around">
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.tableCell}>1 Hour</TableCell>
                        <TableCell className={classes.tableCell}>24 Hours</TableCell>
                        <TableCell className={classes.tableCell}>7 Days</TableCell>
                        <TableCell className={classes.tableCell}>14 Days</TableCell>
                        <TableCell className={classes.tableCell}>30 Days</TableCell>
                        <TableCell className={classes.tableCell}>1 Year</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell className={classes.tableCell}><NumberFormat style={{color: ((coinData.data.market_data) && coinData.data.market_data.price_change_percentage_1h_in_currency.usd < 0) ? 'red' : '#00897b'}} decimalScale={1} value={(coinData.data.market_data) && coinData.data.market_data.price_change_percentage_1h_in_currency.usd} displayType={'text'} suffix={'%'} /></TableCell>
                        <TableCell className={classes.tableCell}><NumberFormat style={{color: ((coinData.data.market_data) && coinData.data.market_data.price_change_24h < 0) ? 'red' : '#00897b'}} decimalScale={1} value={(coinData.data.market_data) && coinData.data.market_data.price_change_24h} displayType={'text'} suffix={'%'} /></TableCell>
                        <TableCell className={classes.tableCell}><NumberFormat style={{color: ((coinData.data.market_data) && coinData.data.market_data.price_change_percentage_7d < 0) ? 'red' : '#00897b'}} decimalScale={1} value={(coinData.data.market_data) && coinData.data.market_data.price_change_percentage_7d} displayType={'text'} suffix={'%'} /></TableCell>
                        <TableCell className={classes.tableCell}><NumberFormat style={{color: ((coinData.data.market_data) && coinData.data.market_data.price_change_percentage_30d < 0) ? 'red' : '#00897b'}} decimalScale={1} value={(coinData.data.market_data) && coinData.data.market_data.price_change_percentage_30d} displayType={'text'} suffix={'%'} /></TableCell>
                        <TableCell className={classes.tableCell}><NumberFormat style={{color: ((coinData.data.market_data) && coinData.data.market_data.price_change_percentage_60d < 0) ? 'red' : '#00897b'}} decimalScale={1} value={(coinData.data.market_data) && coinData.data.market_data.price_change_percentage_60d} displayType={'text'} suffix={'%'} /></TableCell>
                        <TableCell className={classes.tableCell}><NumberFormat style={{color: ((coinData.data.market_data) && coinData.data.market_data.price_change_percentage_1y < 0) ? 'red' : '#00897b'}} decimalScale={1} value={(coinData.data.market_data) && coinData.data.market_data.price_change_percentage_1y} displayType={'text'} suffix={'%'} /></TableCell>                      
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>  
              <Grid item xs={12} sm={11} md={9} lg={9} className={classes.topBotMargin}>
                <Grid container justify="space-around">
                  <Grid item xs={12} md={12} lg={8} className={classes.graphBtn}>
                  <ToggleButtonGroup value={alignment} exclusive  onChange={handleAlignment} fullwidth='true' aria-label="Graph">
                    <ToggleButton value="hr24" onClick={e => graphChangeDays(1)}>24 Hours</ToggleButton>
                    <ToggleButton value="week1" onClick={e => graphChangeDays(7)}>1 Week</ToggleButton>
                    <ToggleButton value="month1" onClick={e => graphChangeDays(30)}>1 Month</ToggleButton>
                    <ToggleButton value="month6" onClick={e => graphChangeDays(182)}>6 Months</ToggleButton>
                    <ToggleButton value="year1" onClick={e => graphChangeDays(365)}>1 Year</ToggleButton>
                    <ToggleButton value="max" onClick={e => graphChangeDays('max')}>All Time</ToggleButton>
                  </ToggleButtonGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container justify="space-around" className={classes.graphGrid}>
                      <Chart id={props.match.params.coin} days={graphDays}/>
                    </Grid>
                  </Grid>
                </Grid>  
              </Grid>  
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Coin;
