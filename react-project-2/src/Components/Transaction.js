import React, { useEffect } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
   root: {
      width: "40%",
      overflow: "auto",
      marginLeft: "5vw",
      marginTop: "3vh"
   },
   table: {
      minWidth: 650
   },
   paper: {
      width: "40%",
      marginTop: "7vh",
      height: "5vh",
      overflow: "auto",
      marginLeft: "5vw",
      background: "linear-gradient(to left, #172c66 0%, #6a407f 42%)",
      display: "flex"
   },
   back: {
      textAlign: "left",
      paddingLeft: "20px",
      color: "white",
      paddingTop: "13px",

      "&:hover": {
         color: "black"
      }
   },
   coinName: {
      fontSize: "50px",
      marginTop: "5vh",
      height: "10vh",
      background: "linear-gradient(to left, #172c66 0%, #6a407f 42%)",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
   },
   img: {
      width: "4vw"
   },
   newPaper: {
      width: "40%",
      height: "35vh",
      marginLeft: "5vw",
      marginTop: "4vh",
      overflowY: "auto"
   },
   desc: {
      textAlign: "justify",
      padding: "30px",
      fontSize: "13px",
      paddingTop: "10px",
      textIndent: "50px"
   },
   breadlist: {
      color: "#a5a5a5",
      "&:hover": {
         color: "white"
      }
   }
}));

export default function AcccessibleTable() {
   const classes = useStyles();
   const [data, setData] = React.useState([]);
   const [image, setImage] = React.useState([]);
   const [load, setLoad] = React.useState(false);

   let { id } = useParams();

   useEffect(() => {
      setLoad(true);
      Axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then(response => {
         setData(response.data);
         setImage(response.data.image);
         setLoad(false);
         console.log(response.data);
      });
   }, [id]);

   const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
   });

   const circulatingFormat = num => {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
   };

   return (
      <div>
         <Paper className={classes.papel}>
            {load ? (
               <Typography className={classes.coinName}>
                  <CircularProgress disableShrink color="secondary" />
               </Typography>
            ) : (
               <Typography className={classes.coinName}>
                  <img className={classes.img} src={image.large} />
                  <span style={{ marginLeft: "10px" }}>{data.name}</span>
               </Typography>
            )}
         </Paper>

         <Paper className={classes.paper}>
            <Breadcrumbs aria-label="breadcrumb" className={classes.back} separator={<NavigateNextIcon fontSize="small" />}>
               <Link className={classes.breadlist} to="/">
                  Home
               </Link>
               <Link aria-current="page" className={classes.breadlist} to={`/coin-details/${id}`}>
                  {data.name} Details
               </Link>
               <Link aria-current="page" style={{ color: "white", cursor: "default" }}>
                  Buy / Sell {data.name}
               </Link>
            </Breadcrumbs>
         </Paper>
      </div>
   );
}
