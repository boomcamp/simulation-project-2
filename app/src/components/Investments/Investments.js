import React from "react";
import MaterialTable from "material-table";
import { toast } from "react-toastify";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { MDBIcon } from "mdbreact";
import styled from "styled-components";
import axios from "axios";

const MainDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Table = styled.div`
  width: 70%;
`;
const BuySell = styled.div`
  width: 28%;
  height: 200px;
  background-color: white;
`;
const Img = styled.img`
  height: 30px;
  padding-right: 20px;
`;
const Green = styled.div`
  color: green;
`;
const Red = styled.div`
  color: red;
`;

export default class Investments extends React.Component {
  constructor() {
    super();
    this.state = {
      activeItem: "1",
      loading: true,
      data: [],
      toggleModal: false,
      columns: [
        {
          title: "Coin",
          field: "coin",
          render: rowData => (
            <React.Fragment>
              <Img src={rowData.details.image} alt="" />
              {rowData.details.name}
            </React.Fragment>
          )
        },
        {
          title: "Old Price",
          field: "old_price",
          render: rowData => (
            <React.Fragment>
              ${" "}
              {rowData.details.price.toLocaleString(undefined, {
                maximumFractionDigits: 2
              })}
            </React.Fragment>
          )
        },
        {
          title: "Current Price",
          field: "current_price",
          render: rowData => (
            <React.Fragment>
              {rowData.current_price ? (
                rowData.details.price >= rowData.current_price ? (
                  <Red>
                    ${" "}
                    {rowData.current_price.toLocaleString(undefined, {
                      maximumFractionDigits: 2
                    })}
                    <MDBIcon
                      icon="angle-down"
                      style={{ paddingLeft: "5px", fontSize: "16px" }}
                    />
                  </Red>
                ) : (
                  <Green>
                    ${" "}
                    {rowData.current_price.toLocaleString(undefined, {
                      maximumFractionDigits: 2
                    })}
                    <MDBIcon
                      icon="angle-up"
                      style={{ paddingLeft: "5px", fontSize: "16px" }}
                    />
                  </Green>
                )
              ) : (
                ""
              )}
            </React.Fragment>
          )
        },
        {
          title: "Amount Invested",
          field: "amount",
          render: rowData => (
            <React.Fragment>
              ${" "}
              {rowData.amount.toLocaleString(undefined, {
                maximumFractionDigits: 2
              })}
            </React.Fragment>
          )
        },
        {
          title: "Profit/Loss Total",
          field: "profit",
          render: rowData => (
            <React.Fragment>
              {rowData.current_price * rowData.amount -
                rowData.details.price * rowData.amount >
              0 ? (
                <Green>
                  ${" "}
                  {rowData.current_price * rowData.amount -
                    rowData.details.price * rowData.amount}
                </Green>
              ) : rowData.current_price * rowData.amount -
                  rowData.details.price * rowData.amount ===
                0 ? (
                "$ " +
                (rowData.current_price * rowData.amount -
                  rowData.details.price * rowData.amount)
              ) : (
                <Red>
                  ${" "}
                  {rowData.current_price * rowData.amount -
                    rowData.details.price * rowData.amount}
                </Red>
              )}
            </React.Fragment>
          )
        },
        {
          title: "Amount Sold",
          field: "amountSold",
          render: rowData => (
            <React.Fragment>$ {rowData.amountSold.toFixed(3)}</React.Fragment>
          )
        },
        {
          title: "Date Invested",
          field: "date"
        },
        {
          title: "Actions",
          field: "sell",
          render: rowData => (
            <React.Fragment>
              <Button
                variant="outlined"
                onClick={() => this.handleClickOpen(rowData)}
              >
                Sell
              </Button>
            </React.Fragment>
          )
        }
      ]
    };
  }
  toggle = tab => e => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  };
  componentDidMount = () => {
    axios.get(`http://localhost:4000/transactions`).then(response => {
      const tempData = response.data.map(e => {
        axios
          .get(`https://api.coingecko.com/api/v3/coins/${e.details.coin}`)
          .then(response => {
            e.current_price = response.data.market_data.current_price.usd;
          });
        return e;
      });
      let sum = response.data.map(x => x.amountSold).reduce((a, b) => a + b, 0);
      this.setState({ data: tempData, totalAmount: sum });
      setTimeout(() => this.setState({ loading: false }), 500);
    });
  };

  handleClickOpen = val => {
    this.setState({ toggleModal: true, currentData: val });
  };

  handleClose = () => {
    this.setState({ toggleModal: false });
  };

  handleChange = val => {
    this.setState({ amountSell: val });
  };
  handleSell = (e, data) => {
    this.setState({ loading: true });
    e.preventDefault();
    axios
      .patch(`http://localhost:4000/transactions/${data.id}`, {
        amountSold:
          data.current_price * this.state.amountSell -
          data.details.price * this.state.amountSell,
        amount: data.amount - this.state.amountSell
      })
      .then(toast.success("Success!"));
    setTimeout(() => this.setState({ loading: false }), 500);
  };
  render() {
    return (
      <MainDiv>
        {this.state.currentData ? (
          <Dialog open={this.state.toggleModal} onClose={this.handleClose}>
            <form onSubmit={e => this.handleSell(e, this.state.currentData)}>
              <DialogTitle>
                <img
                  src={this.state.currentData.details.image}
                  alt=""
                  style={{
                    width: "60px",
                    height: "50px",
                    paddingRight: "15px"
                  }}
                />
                {this.state.currentData.details.name}
              </DialogTitle>
              <DialogContent>
                <Typography
                  variant="h6"
                  component="h6"
                  style={{ paddingBottom: "10px" }}
                >
                  Amount to Sell
                </Typography>
                <TextField
                  required
                  type="number"
                  label={
                    this.state.currentData
                      ? this.state.currentData.currency
                      : ""
                  }
                  variant="outlined"
                  style={{ textTransform: "uppercase", width: "300px" }}
                  inputProps={{
                    min: 0,
                    max:
                      this.state.currentData.amount -
                      this.state.currentData.amountSold,
                    step: ".000000001"
                  }}
                  onChange={e => this.handleChange(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Disagree
                </Button>
                <Button type="submit" color="primary" autoFocus>
                  Sell
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        ) : (
          ""
        )}

        <Table>
          <MaterialTable
            title="Investment Tracking"
            columns={this.state.columns}
            data={this.state.data}
            isLoading={this.state.loading}
            options={{
              pageSizeOptions: [10, 15, 20],
              pageSize: 10
            }}
          />
        </Table>
        <BuySell>
          <Typography
            variant="h4"
            component="h6"
            style={{ paddingBottom: "50px", color: "darkviolet" }}
          >
            Total Profit/Loss
          </Typography>
          <Typography
            variant="h1"
            component="h6"
            style={{
              paddingBottom: "10px",
              color: "black",
              textAlign: "center"
            }}
          >
            $ {parseFloat(this.state.totalAmount).toFixed(5)}
          </Typography>
        </BuySell>
      </MainDiv>
    );
  }
}
