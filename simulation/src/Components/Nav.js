import React ,{ useState, useEffect }from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom' 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    uline: {
      textDecoration: 'none',
      color: 'white',
      marginRight: '10px'
    },
    bg:{
      backgroundColor: '#1c1f21',
    },
  }),
);





export default function ButtonAppBar(props) {
  const classes = useStyles();
  // const [curbal, setCurbal] = useState('20000')

 
  // localStorage.setItem('wallet', curbal);


  // let usd = props.usd;
  // let wallet = localStorage.getItem('wallet');
  // let computed = wallet-usd 
  // console.log(computed)
  // setCurbal(computed)


  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bg}>
        <Toolbar>
      
          <Typography variant="h6" className={classes.title}>
            Simulation Project I 
          </Typography>

          <Button color="inherit">
            <Link to="/" className={classes.uline}> 
              Home
            </Link>
          </Button>

          <Button color="inherit">
           <Link to="/invest" className={classes.uline}>
              Track Investment
            </Link>
          </Button>

        </Toolbar>
      </AppBar>
    </div>
  );
}