import React, { useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grow from "@material-ui/core/Grow";
import got from "../assets/images/got.gif";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
   second: {
      width: "5vw",
      height: "4vh"
   },
   confirm: {
      width: "20vw",
      height: "40vh",
      background: "white",
      borderRadius: "50px"
   },
   con: {
      position: "absolute",
      marginTop: "13vh",
      right: "20vw"
   },
   cancel: {
      marginTop: "10px",
      cursor: "pointer",
      "&:hover": {
         color: "purple"
      }
   },
   gif: {
      width: "15vw",
      borderRadius: "1000px"
   },
   successful: {
      fontSize: "18px"
   },
   name: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "rgb(105, 63, 126)"
   },
   buymore: {
      marginTop: "5vh"
   },
   dash: {
      marginTop: "15px",
      fontSize: "12px",
      color: "gray",
      "&:hover": {
         color: "purple"
      },
      cursor: "pointer"
   }
}));

export default function Success(props) {
   const classes = useStyles();
   const [data, setData] = React.useState([]);
   let { id } = useParams();

   useEffect(() => {
      Axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then(
         response => {
            setData(response.data);
         }
      );
   }, [id]);

   return (
      <Grow in>
         <div className={classes.con}>
            <div className={classes.confirm}>
               <img src={got} className={classes.gif} />
               <Typography className={classes.successful}>
                  Successfully purchased{" "}
                  <span className={classes.name}>{data.name}</span> !
               </Typography>
               <Button
                  variant="outlined"
                  color="primary"
                  className={classes.buymore}
                  onClick={() => (
                     props.buyMore(false), props.confirmAct(false)
                  )}
               >
                  Buy More
               </Button>
               <p className={classes.dash}>Go to Dashboard</p>
            </div>
         </div>
      </Grow>
   );
}
