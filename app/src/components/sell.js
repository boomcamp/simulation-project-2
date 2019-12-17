import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
export default class sell extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.setState({
      totalbought: this.props.info ? this.props.info.sum : null,
      priceNow: localStorage.getItem("currentPrice")
    });
  }

  render() {
    return (
      <React.Fragment>
        <Dialog
          open={this.props.openModal}
          onClose={this.props.close}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          TransitionComponent={Transition}
          fullWidth
        >
          <DialogTitle
            id="alert-dialog-slide-title"
            style={{
              textTransform: "uppercase"
            }}
          >
            {localStorage.getItem("id")}
          </DialogTitle>
          <DialogActions>
            
          <div style={{display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', margin: 20}}>
          <TextField
              id="filled-select-currency-native"
              type="number"
              label={localStorage.getItem("symbol")}
              helperText="Please select your currency"
              variant="outlined"
              value={this.props.inputAmount}
              onChange={event => this.props.handleChange(event)}
              style={{margin: 10}}
              // max={this.props.info.amount}
            ></TextField>

            <TextField style={{margin: 10, color: 'red'}}
              id="standard-read-only-input"
              value={this.props.readValue}
              label={this.props.readLabel}
              error={this.props.readError}
              InputProps={{
                readOnly: true,
              }}
            />

            <div>
            <Button
              variant="contained"
              color="primary"
              disabled={this.props.info.amount == 0 ? true : false}
              onClick={this.props.handleClick}
            >
              Sell
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.props.close}
            >
              Close
            </Button>
            </div>
          </div>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}
