import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Snackbar } from "@material-ui/core";
import Moment from 'moment';

export default class buy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: "",
      sum: "",
      snackbarState: false,
      snackbarMessage: ""
    };
  }
  handleCloseSnackbar = () => {
    this.setState({ snackbarState: false, snackbarMessage: "" });
  };
  handleOpenSnackbar = (message, color) => {
    this.setState({
      snackbarState: true,
      snackbarMessage: message,
      backgroundColor: color ? color : ""
    });
  };
  handleClick = () => {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const min = new Date().getMinutes();
    const sec = new Date().getSeconds();

    if (this.state.amount === "") {
      this.handleOpenSnackbar("Pls input", "red ");
     
    } else if(localStorage.getItem("amount") <= 0){
      this.handleOpenSnackbar("No money ", "red ");
    } else {
        axios
          .post(`http://localhost:4000/transactions`, {
            date:
            date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec,
            image: this.props.details.image,
            amount: this.state.amount,
            sum: this.state.sum,
            symbol: localStorage.getItem("symbol"),
            idname: localStorage.getItem("id"),
            current: this.props.details.current_price
          })
          .then(res => {
            console.log(res);
          });
      this.setState({
        amount:"",
        sum:""
      })
      this.handleOpenSnackbar("Successfully Buy", "darkgreen");
    }
  };
  handleChange = event => {
    this.setState({
      amount: event.target.value,
      sum: event.target.value * this.props.details.current_price
    });
  };

  render() {
    Moment.locale('en');
    return (
      <React.Fragment>
        <Snackbar
          ContentProps={{
            style: {
              backgroundColor: this.state.backgroundColor
            }
          }}
          open={this.state.snackbarState}
          message={
            <span style={{ display: "flex", alignItems: "center" }}>

              {this.state.snackbarMessage}
            </span>
          }
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          autoHideDuration={2000}
          onClose={this.handleCloseSnackbar}
        />
        <div
          style={{
            marginTop: "5%"
          }}
        >
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

          <TextField
            id="filled-select-currency-native"
            type="number"
            label="USD    "
            variant="outlined"
            helperText="Please select your currency"
            value={this.state.sum}
            style={{
              marginRight: 20
            }}
          ></TextField>

          <Button
            variant="contained"
            color="primary"
            onClick={e => this.handleClick()}
            
            style={{
              marginTop: "1.8%"
            }}
          >
            BUY
          </Button>
        </div>
      </React.Fragment>
    );
  }
}
