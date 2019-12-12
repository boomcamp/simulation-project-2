// import React,{Fragment, useState} from 'react';
// import { makeStyles } from '@material-ui/core/styles'; 
// import { Button } from '@material-ui/core';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import {FormControl, InputLabel, OutlinedInput, InputAdornment} from '@material-ui/core';
// import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function Sell(props) {
//   const {coinName,coinPrice,coinSym,coinID} = props;

//   const useStyles = makeStyles(theme => ({
//     sellBtn: {
//       width: '40%',
//     },
//     buySellDialog: {
//       display: 'flex',
//       justifyContent: 'space-around'
//     },
//     swapIcon: {
//       margin: 'auto 2%'
//     },
//     sellBtnSubmit: {
//       fontWeight: '600',
//     }
//   }))

//   const classes = useStyles();
  
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <Fragment>
//       <Button className={classes.sellBtn} variant="contained" onClick={handleClickOpen} color="secondary">Sell</Button>
//       <Dialog
//           open={open}
//           onClose={handleClose}
//           maxWidth='md'
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//         >
//           <DialogTitle id="alert-dialog-title">Sell</DialogTitle>
//             <DialogContent className={classes.buySellDialog}>
//                 <FormControl variant="outlined">
//                   <InputLabel htmlFor="outlined-adornment-amount">{coinName}</InputLabel>
//                   <OutlinedInput
//                     id="outlined-adornment-amount"
//                     type="number"
//                     startAdornment={<InputAdornment position="start">{coinSym}</InputAdornment>}
//                     labelWidth={80}
//                   />
//                 </FormControl>
//                 <SwapHorizIcon className={classes.swapIcon}/>
//                 <FormControl variant="outlined">
//                   <InputLabel htmlFor="outlined-adornment-amount">USD</InputLabel>
//                   <OutlinedInput
//                     type="number"
//                     id="outlined-adornment-amount"
//                     startAdornment={<InputAdornment position="start">$</InputAdornment>}
//                     labelWidth={80}
//                   />
//                 </FormControl>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleClose} color="inherit">
//                 Cancel
//               </Button>
//               <Button className={classes.sellBtnSubmit} color="secondary" autoFocus>
//                 Sell
//               </Button>
//             </DialogActions>
//         </Dialog>
//     </Fragment>
//   )
// }

// export default Sell
