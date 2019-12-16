import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default function SellDialog(props) {
    const { name, date, time, id, amount, priceBought, value } = props
    const { open, close, handleSell } = props

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
                <div>
                    <div>
                        <h4>Date Purchased: </h4>
                    </div>
                    <div>
                        <h3>{date}</h3>
                    </div>
                </div>
                <div>
                    <div>
                        <h4>Price when Purchased: </h4>
                    </div>
                    <div>
                        <h3>{priceBought}</h3>
                    </div>
                </div>
                <div>
                    <div>
                        <h4>Amount: </h4>
                    </div>
                    <div>
                        <h3>{amount}</h3>
                    </div>
                </div>

                <div>
                    <div>
                        <h4>Value: </h4>
                    </div>
                    <div>
                        <h3>{value}</h3>
                    </div>
                </div>
                <div>
                    <div>
                        <h4>Current Price:</h4>
                    </div>
                    <div>
                        <h3>{date}</h3>
                    </div>
                </div>
                <div>
                    <div>
                        <h4>Change: </h4>
                    </div>
                    <div>
                        <h3>{date}</h3>
                    </div>
                </div>
                <div>
                    <div>
                        <h4>Profit / Loss </h4>
                    </div>
                    <div>
                        <h3>{date}</h3>
                    </div>
                </div>
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