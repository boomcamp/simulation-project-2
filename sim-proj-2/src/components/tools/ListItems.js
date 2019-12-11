import React, {useState}from 'react';
import {Link} from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TrackChanges from '@material-ui/icons/TrackChanges';
import AttachMoney from '@material-ui/icons/AttachMoney';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import CryptoBuy from '../CyptoBuy'

// import ListSubheader from '@material-ui/core/ListSubheader';
// import BarChartIcon from '@material-ui/icons/BarChart';
// import LayersIcon from '@material-ui/icons/Layers';
// import AssignmentIcon from '@material-ui/icons/Assignment';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width:'25%',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    borderRadius: '8px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ListItems() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  
  return (
    <div>
       <Link to="/" style={{color:`black`, textDecoration:`none`}}>
          <ListItem button>
            <ListItemIcon title="Dashboard">
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard"/>
          </ListItem>
        </Link>

        <Link to="/investment-tracker" style={{color:`black`, textDecoration:`none`}}>
          <ListItem button>
            <ListItemIcon title="Invesment Tracker">
              <TrackChanges />
            </ListItemIcon>
            <ListItemText primary="Invesment Tracker" />
          </ListItem>
        </Link>
        
        <ListItem button onClick={() => setOpen(true)}>
          <ListItemIcon title="Buy Cryptocurrency">
            <AttachMoney />
          </ListItemIcon>
          <ListItemText primary="Buy Cryptocurrency" />
        </ListItem>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={() => setOpen(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <CryptoBuy closeFn={()=> setOpen(false)}/>
            </div>
          </Fade>
        </Modal>

        {/* <ListSubheader inset>Saved reports</ListSubheader>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Current month" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Last quarter" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Year-end sale" />
        </ListItem> */}
    </div>
  )
}
