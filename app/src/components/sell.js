import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
export default class sell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      priceNow: 0,
      total: 0
    };
  }

  componentDidMount() {


    this.setState({
      totalbought: this.props.info ? this.props.info.sum : null,
      priceNow: localStorage.getItem("currentPrice"),
    });
  }
  handleClick = () => {
  let a = this.props.info.current * this.state.inputAmount
  let b = this.props.info.sum -a  
  this.setState({
    total: b
  })
  console.log(this.state.total)
  };
  handleChange = e => {
    this.setState({
      inputAmount: e.target.value
    });
    // console.log(this.state.inputAmount)
  };
  render() {
    // console.log(this.props.info)
    // console.log(this.state.totalamount)
    // let priceNow = this.props.details ? this.props.details.current_price : null
    // console.log(this.state.priceNow)
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
            <TextField
              id="filled-select-currency-native"
              type="number"
              label={localStorage.getItem("symbol")}
              helperText="Please select your currency"
              variant="outlined"
              value={this.state.amount}
              onChange={event => this.handleChange(event)}
              style={{
                marginRight: 20
              }}
            ></TextField>

            <Button
              variant="contained"
              color="primary"
              onClick={this.handleClick}
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
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}
