import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class Sell extends React.Component {
  render() {
    const {
      data,
      handleOnChange,
      handleSubmitSell,
      handleClickOpen,
      handleClose,
      open
    } = this.props;
    return (
      <React.Fragment>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Sell
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <form onSubmit={e => handleSubmitSell(e, data)}>
            <DialogTitle id="form-dialog-title">
              Start Selling {data.crypto.id}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter the amount you desire.
              </DialogContentText>

              <TextField
                autoFocus
                label="Amount"
                fullWidth
                type="number"
                variant="outlined"
                inputProps={{
                  min: 0,
                  max: data.amount - data.amountSold,
                  step: ".000000001"
                }}
                required
                onChange={e => handleOnChange(+e.target.value, "sell")}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>
    );
  }
}
