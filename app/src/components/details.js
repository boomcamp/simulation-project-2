import React, { Component } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import Background from "./background.jpg"
import Grid from "@material-ui/core/Grid";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Button} from '@material-ui/core'


export default class details extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             id: localStorage.getItem('id'),
             details:[]
        }
    }
    

componentDidMount(){
    // axios
    // .get(`https://api.coingecko.com/api/v3/coins/${this.state.id}`)
    // .then(res =>{
    //     // console.log(res.data)
    //     this.setState({
    //         details: res.data
    //     })
    //    })
}

handleClose() {
    
}

    render() {
        // console.log(this.state.details)
        // console.log(this.props)
        
        return (
            <React.Fragment>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.close}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Details</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    
                    <Button onClick={this.props.close} variant='contained' color="primary" autoFocus>
                        Close
                    </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
          
        )
    }
}
