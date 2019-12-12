import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
export default class Modal extends React.Component {
  render() {
    const { data, handleClickOpen, handleClose, toggleModal } = this.props;
    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Sell
        </Button>
        <Dialog open={toggleModal} onClose={this.handleClose}>
          <DialogTitle>{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <TextField
              required
              label={data.currency}
              variant="outlined"
              style={{ textTransform: "uppercase" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
