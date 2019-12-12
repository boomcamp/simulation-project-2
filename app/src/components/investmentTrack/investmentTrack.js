import React from "react";
import styled from "styled-components";
import MaterialTable from "material-table";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 10px;
  box-shadow: 5px 10px 8px #888888;
`;

const Div = styled.div`
  display: flex;
  box-sizing: border-box;
  border: 4px solid grey;
  border-radius: 10px;
  height: 100%;
  margin-bottom: 10px;
`;

export default class investmentTrack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRow: null,
      columns: [
        {
          title: "Coin",
          field: "coinName",
          render: rowData => (
            <div className="weight">
              {" "}
              <img
                src={rowData.image}
                alt=""
                className="resize"
                style={{
                  height: 30,
                  width: 30,
                  paddingTop: 10,
                  marginRight: 5
                }}
              />
              {rowData.coinName}
            </div>
          ),
          cellStyle: rowData => ({
            fontWeight: "bold",
            fontSize: 15
          })
        },
        {
          title: "Price before investing",
          field: "price",
          render: rowData => <React.Fragment>${rowData.price}</React.Fragment>
        },
        {
          title: "Invested Amount",
          field: "invested",
          render: rowData => (
            <React.Fragment>$ {rowData.invested}</React.Fragment>
          )
        },
        {
          title: "Sold Amount",
          field: "amountSold",
          render: rowData => (
            <React.Fragment>$ {rowData.amountSold}</React.Fragment>
          )
        },
        { title: "Profit/Loss", field: "profit" },
        {
          title: "Sell Coin",
          render: rowData => (
            <React.Fragment>
              <Button
                style={{
                  color: "black",
                  backgroundColor: "rgb(235, 155, 6)"
                }}
                variant="outlined"
                color="primary"
                onClick={this.handleClickOpen}
              >
                Sell
              </Button>
            </React.Fragment>
          )
        }
      ],
      data: [],
      toggleModal: false
    };
  }

  componentDidMount = () => {
    axios.get("http://localhost:4000/transactions").then(response => {
      this.setState({ data: response.data });
    });
  };
  handleClickOpen = () => {
    this.setState({ toggleModal: true });
  };

  handleClose = () => {
    this.setState({ toggleModal: false });
  };

  sellChange = val => {
    this.setState({ sellAmount: val });
    console.log(val);
  };

  sellHandler = (e, data) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:4000/transactions/${data.id}`, {
        amountSold:
          data.current_price * this.state.sellAmount -
          data.price * this.state.sellAmount,
        amount: data.amount - this.state.sellAmount
      })
      .then(toast.success("SUCCESS!!"));
  };

  render() {
    return (
      <MainDiv>
        <ToastContainer />
        <div>
          <Dialog
            open={this.state.toggleModal}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <form onSubmit={e => this.sellHandler(e)}>
              <DialogTitle id="alert-dialog-title">{"Amount"}</DialogTitle>

              <DialogContent>
                <TextField
                  label="USD"
                  margin="normal"
                  value={this.state.usd}
                  variant="outlined"
                  onChange={e => this.sellChange(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button type="submit" color="primary" onClick={this.notify}>
                  Sell
                </Button>

                <Button onClick={this.handleClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </div>
        <div>
          <MaterialTable
            style={{
              marginRight: 30,
              width: 1110
            }}
            title="List of Investments"
            columns={this.state.columns}
            data={this.state.data}
            onRowClick={(evt, selectedRow) => this.setState({ selectedRow })}
            options={{
              paging: false,
              search: false
            }}
          />
        </div>
        <div
          style={{
            width: 360
          }}
        >
          <Div>
            <span
              style={{
                marginTop: 5,
                marginLeft: 10,
                fontSize: 20
              }}
            >
              TOTAL PROFIT:
            </span>
          </Div>
        </div>
      </MainDiv>
    );
  }
}
