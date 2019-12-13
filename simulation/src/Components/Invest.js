import React, { useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import NumberFormat from 'react-number-format';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import Nav from './Nav';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function MaterialTableDemo() {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    columns: [
      { title: 'Rank', field: 'rank' },
      { title: '', field: 'image', 
        render: row => <img src={row.image} alt={row.id} style={{width: 40, borderRadius: '50%'}}/>,  
        cellStyle: {
          textAlign: 'right',
        },
        headerStyle: {
          textAlign: 'right',
        } 
      },
      { title: 'Coin Name', 
        render: row => <span id = {row.id} onClick={e => handleClickOpen(e)} > {row.coinName} </span>
      },
      { title: 'Quantity', field: 'coinQuantity'},
      { title: 'Total Amount', field: 'totalAmount',
        render: row =>
        <NumberFormat 
          value={row.totalAmount} 
          displayType={'text'} 
          thousandSeparator={true} 
          prefix={'$'} 
          decimalScale='2'
        />
      },
      { title: 'Date', field: 'date'},
     
    ],
    data: [],
  });

  // useEffect(() => {
  //   submitUserData()
  // },[]);

  const submitUserData = () =>{
    axios({
      method: 'get',
      url: 'http://localhost:4000/transactions'
    })
    .then( response =>  {
     console.log(response)
    })
    .catch(err=>{
      console.log('err');

    })
  }

  const handleClickOpen = () => {
    setOpen(true);  
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    renderInvest()
  },[]);


  const renderInvest = () =>{ 

    axios({
      method: 'get',
      url: 'http://localhost:4000/transactions',
    })
    .then( response =>  {
      setState({
        ...state,
        data: response.data 
      })
    })
    .catch(err=>console.log(err))
  }

  return (
    <React.Fragment>
        <Nav/> 

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={handleClose} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        <br/>
        <CssBaseline />
            <Container maxWidth="xl">
                <MaterialTable
                title="Investment"
                columns={state.columns}
                data={state.data}
                />
            </Container>
    </React.Fragment>   
  );
}