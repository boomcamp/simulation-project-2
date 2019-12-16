import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import axios from 'axios';


export default function SellDialog({ open, close, handleSell }) {
    const [name, setName] = useState('')
    useEffect(() => {
        axios({
            method: 'get',
            url: `/transactions`
        })
            .then(e => setName(e.data.name))
            .catch(e => console.log(e))

    }, [])

    return (
        <Dialog
            open={open}
            onClose={close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={'md'}
            fullWidth={true}
        >
            <DialogTitle id="alert-dialog-title">{`Sell ${name}`}</DialogTitle>
            <DialogContent>
                <h1>Hello</h1>
            </DialogContent>
            <DialogActions>
                <Button onClick={close} color="primary">
                    CANCEL
                                        </Button>
                <Button color="primary" autoFocus onClick={handleSell}>
                    OKAY
                                        </Button>
            </DialogActions>
        </Dialog>
    );
}