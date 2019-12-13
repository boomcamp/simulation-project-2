import React from "react";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";
import { message } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import "../../App.css";

export default class Investment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amountSold: "",
      Sell: "",
      loading: true,
      modalToggle: false,
      coinName: "",
      columns: [
        {
          title: "Coin",
          field: "coinName",
          render: rowData => (
            <div className="weight">
              {" "}
              <img src={rowData.logo} alt="" className="resize" />
              <Link key={rowData.coinId} to={`/coin/${rowData.coinId}`}>
                {rowData.coinName}
              </Link>
            </div>
          )
        },
        {
          title: "Price",
          field: "price",
          render: rowData => <React.Fragment>${rowData.price}</React.Fragment>
        },
        {
          title: "Current Price",
          field: "current_price",
          render: rowData => (
            <React.Fragment>${rowData.current_price}</React.Fragment>
          )
        },
        {
          title: "Amount Invested",
          field: "invested",
          render: rowData => (
            <React.Fragment>${rowData.invested}</React.Fragment>
          )
        },
        {
          title: "Profit/Loss",
          field: "profit",
          render: rowData => (
            <React.Fragment>
              ${rowData.profit ? Number(rowData.profit.toFixed(5)) : 0}
            </React.Fragment>
          )
        },
        {
          title: "Sell Coins",
          render: rowData => (
            <React.Fragment>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => this.handleOpen(rowData)}
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
  fetch = () => {
    axios.get(`http://localhost:4000/transactions`).then(response => {
      const temp = response.data.map(e => {
        axios
          .get(
            `https://api.coingecko.com/api/v3/simple/price?ids=${e.coinId}&vs_currencies=usd`
          )
          .then(response => {
            e.current_price = response.data[e.coinId].usd;
            setTimeout(() => this.setState({ loading: false }), 1000);
          });
        return e;
      });
      let sum = response.data.map(x => x.profit).reduce((a, b) => a + b, 0);
      this.setState({
        data: temp,
        totalAmount: sum
      });
    });
  };
  componentDidMount = () => {
    this.fetch();
  };

  handleOpen = data => {
    this.setState({ modalToggle: true, currentData: data });
  };

  handleClose = () => {
    this.setState({ modalToggle: false });
  };

  handleSell = value => {
    this.setState({ Sell: value });
  };

  handleSellCoin = (e, data) => {
    this.setState({ loading: true });
    e.preventDefault();
    axios
      .patch(`http://localhost:4000/transactions/${data.id}`, {
        profit:
          data.profit +
          (data.current_price * this.state.Sell - data.price * this.state.Sell),
        invested: data.invested - this.state.Sell
      })
      .then(() => {
        this.fetch();
        this.setState({ modalToggle: false });
        message.info("Sell Successful!", 2);
        setTimeout(() => this.setState({ loading: false }), 1000);
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="invest-cont">
            <MaterialTable
              title="Investment List"
              columns={this.state.columns}
              data={this.state.data.filter(x => x.invested !== 0)}
              options={{ search: false }}
              isLoading={this.state.loading}
            />
          </div>
          <div className="profit-cont">
            <div className="weight">Total Profit/Loss</div>
            <div className="total weight">${this.state.totalAmount}</div>
          </div>
        </div>

        <Dialog
          open={this.state.modalToggle}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form onSubmit={e => this.handleSellCoin(e, this.state.currentData)}>
            <DialogTitle id="alert-dialog-title">
              <div className="upcase weight">Sell Amount</div>
            </DialogTitle>
            <DialogContent>
              <div className="r">
                <TextField
                  label="Amount"
                  type="number"
                  required
                  variant="outlined"
                  className={"upcase"}
                  onChange={e => this.handleSell(+e.target.value)}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button color="primary" type="submit">
                sell
              </Button>
              <Button color="primary" autoFocus onClick={this.handleClose}>
                cancel
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>
    );
  }
}
