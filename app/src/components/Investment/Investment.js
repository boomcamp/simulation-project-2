import React from "react";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import "../../App.css";

export default class Investment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalToggle: false,
      coinName: "",
      currentPrice: "",
      amountInvest: "",
      columns: [
        {
          title: "Coin",
          field: "coinName",
          render: rowData => (
            <div className="weight">
              {" "}
              <img src={rowData.logo} alt="" className="resize" />
              {rowData.coinName}
            </div>
          )
        },
        {
          title: "Current Price",
          field: "price",
          render: rowData => <React.Fragment>$ {rowData.price}</React.Fragment>
        },
        {
          title: "Amount Invested",
          field: "invested",
          render: rowData => (
            <React.Fragment>$ {rowData.invested}</React.Fragment>
          )
        },
        { title: "Profit/Loss", field: "profit" },
        {
          title: "Sell Coins",
          render: rowData => (
            <React.Fragment>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.handleOpen}
              >
                Sell
              </Button>
            </React.Fragment>
          )
        }
      ],
      data: []
    };
  }

  componentDidMount = () => {
    axios.get(`http://localhost:4000/transactions`).then(response => {
      this.setState({ data: response.data });
    });
  };

  handleOpen = () => {
    this.setState({ modalToggle: true });
  };

  handleClose = () => {
    this.setState({ modalToggle: false });
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="invest-cont">
            <MaterialTable
              title="Investment List"
              columns={this.state.columns}
              data={this.state.data}
              options={{ search: false }}
            />
          </div>
          <div className="profit-cont">
            <div className="upcase weight">Total Profit</div>
          </div>
        </div>
        <Dialog
          open={this.state.modalToggle}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form>
            <DialogTitle id="alert-dialog-title">
              <div className="upcase weight">Sell Amount</div>
            </DialogTitle>
            <DialogContent>
              <div className="r">
                <TextField
                  label="Amount"
                  type="number  "
                  variant="outlined"
                  className={"upcase"}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button color="primary" type="submit">
                sell
              </Button>
              <Button
                color="primary"
                type="submit"
                autoFocus
                onClick={this.handleClose}
              >
                cancel
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>
    );
  }
}
