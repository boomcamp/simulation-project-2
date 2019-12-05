import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import bit2 from "../assets/images/bit2.svg";
import Axios from "axios";
import { NavLink } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import "semantic-ui-css/semantic.min.css";
import { Pagination } from "semantic-ui-react";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles(theme => ({
   root: {
      padding: theme.spacing(3, 2)
   },
   type: {
      fontSize: "45px",
      color: "white",
      fontFamily: "Source Code Pro, monospace",
      marginBottom: "3vh"
   },
   button: {
      margin: theme.spacing(1),
      marginBottom: "5vh",
      padding: "5px 10vw 5px 10vw",
      background: "linear-gradient(to left, #6600cc 0%, #000066 42%)"
   },
   input: {
      display: "none"
   },
   card: {
      top: "78vh",
      right: "4vw",
      width: "25vh",
      position: "absolute"
   },
   logo: {
      width: "25px",
      height: "25px"
   },
   symbol: {
      textTransform: "uppercase"
   },
   page: {
      width: "60vw",
      margin: "0 auto"
   },
   name: {
      "&:hover": {
         color: "purple"
      }
   }
}));

export default function List() {
   const classes = useStyles();
   const [data, setData] = React.useState([]);
   const [pagi, setPagi] = React.useState(1);

   useEffect(() => {
      Axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page=${pagi}`).then(response => {
         setData(response.data);
      });
   }, [pagi]);

   const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
   });

   const circulatingFormat = num => {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
   };

   const onChange = (e, pageInfo) => {
      setPagi(pageInfo.activePage);
   };

   return (
      <div>
         <img src={bit2} style={{ width: "6vw", marginTop: "4vh" }} alt="bit" />
         <Typography className={classes.type}>Cryptocurrency App</Typography>
         <hr />
         <Typography style={{ width: "50%", margin: "0 auto", color: "white", marginBottom: "3vh" }}>
            Cryptocurrency is an internet-based medium of exchange which uses cryptographical functions to conduct financial
            transactions. Cryptocurrencies leverage blockchain technology to gain decentralization, transparency, and
            immutability.
         </Typography>
         <Button variant="contained" color="primary" className={classes.button}>
            Investment Tracking
         </Button>
         <Fade in>
            <MaterialTable
               style={{
                  height: "50vh",
                  overflowY: "auto",
                  width: "60vw",
                  margin: "0 auto"
               }}
               title="Coin List"
               columns={[
                  {
                     title: "Rank",
                     field: "market_cap_rank"
                  },
                  {
                     title: "Cryptocurrencies",
                     render: rowData => (
                        <NavLink to={`/coin-details/${rowData.id}`} style={{ textDecoration: "none", color: "black" }}>
                           <span className={classes.name}>{rowData.name}</span>
                        </NavLink>
                     )
                  },
                  {
                     title: "Logo",
                     render: rowData => (
                        <NavLink to={`/coin-details/${rowData.id}`} style={{ textDecoration: "none", color: "black" }}>
                           <img className={classes.logo} src={rowData.image} alt="Img" />
                        </NavLink>
                     )
                  },
                  {
                     title: "Ticker",
                     render: rowData => <span className={classes.symbol}> {rowData.symbol}</span>
                  },
                  { title: "Current Price", render: rowData => <span> ${rowData.current_price}</span> },
                  {
                     title: "Circulating Supply",
                     render: rowData => <span> {circulatingFormat(Math.round(rowData.circulating_supply))}</span>
                  },
                  { title: "Mkt Cap", render: rowData => <span> {formatter.format(rowData.market_cap)} </span> }
               ]}
               data={data}
               options={{
                  paging: false
               }}
            />
         </Fade>
         <Paper className={classes.page}>
            <Pagination style={{ width: "0vw" }} activePage={pagi} onPageChange={onChange} totalPages={620} />
         </Paper>
      </div>
   );
}
