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

const Red = styled.p`
  color: red;
`;
const Green = styled.p`
  color: green;
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
                  height: 25,
                  width: 25
                }}
              />
              <div
                style={{
                  marginLeft: 35,
                  marginTop: -25,
                  fontWeight: "bold"
                }}
              >
                {rowData.coinName}
              </div>
            </div>
          )
        },
        {
          title: "Price before Investing",
          field: "price",
          render: rowData => <React.Fragment>${rowData.price}</React.Fragment>,
          cellStyle: rowData => ({ color: "purple" })
        },
        {
          title: "Current Price",
          field: "current_price",
          render: rowData => (
            <React.Fragment>${rowData.current_price}</React.Fragment>
          ),
          cellStyle: rowData => ({ color: "darkgreen" })
        },
        {
          title: "Invested Amount",
          field: "invested",
          render: rowData => (
            <React.Fragment>$ {rowData.invested}</React.Fragment>
          ),
          cellStyle: rowData => ({ color: "darkblue" })
        },
        {
          title: "Sold Amount",
          field: "amountSold",
          render: rowData => (
            <React.Fragment>$ {rowData.amountSold}</React.Fragment>
          ),
          cellStyle: rowData => ({ color: "red" })
        },
        {
          title: "Profit/Loss",
          field: "profit",
          render: rowData => (
            <React.Fragment>
              {rowData.profit < 0 ? (
                <Red>${Number(rowData.profit.toFixed(3))}</Red>
              ) : (
                <Green>${Number(rowData.profit.toFixed(3))}</Green>
              )}
            </React.Fragment>
          )
        },
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
                onClick={() => this.handleClickOpen(rowData)}
              >
                Sell
              </Button>
            </React.Fragment>
          )
        }
      ],
      data: [],
      toggleModal: false,
      currentData: {}
    };
  }

  fetchData = () => {
    axios.get(`http://localhost:4000/transactions`).then(response => {
      const initialData = response.data.map(e => {
        axios
          .get(
            `https://api.coingecko.com/api/v3/simple/price?ids=${e.coinId}&vs_currencies=usd`
          )
          .then(response => {
            e.current_price = response.data[e.coinId].usd;
          });
        return e;
      });
      console.log(initialData);
      let sum = response.data.map(x => x.amountSold).reduce((a, b) => a + b, 0);
      this.setState({ data: initialData, totalResult: sum });
    });
  };

  componentDidMount = () => {
    this.fetchData();
  };

  handleClickOpen = val => {
    this.setState({ toggleModal: true, currentData: val });
  };

  handleClose = () => {
    this.setState({ toggleModal: false });
  };

  sellChange = val => {
    this.setState({ amountSold: val });
  };

  sellHandler = (e, data) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:4000/transactions/${data.id}`, {
        amountSold: this.state.amountSold + data.amountSold,
        profit:
          data.profit +
          (this.state.amountSold * data.current_price -
            this.state.amountSold * data.price),
        invested: data.invested - this.state.amountSold
      })
      .then(() => {
        this.fetchData();
        toast.info("SUCCESS!");
      });
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
            {this.state.currentData ? (
              <form onSubmit={e => this.sellHandler(e, this.state.currentData)}>
                <DialogTitle id="alert-dialog-title">{"Amount"}</DialogTitle>

                <DialogContent>
                  <TextField
                    label="USD"
                    margin="normal"
                    value={this.state.usd}
                    variant="outlined"
                    onChange={e => this.sellChange(+e.target.value)}
                    required
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
            ) : (
              ""
            )}
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
            data={this.state.data.filter(x => x.invested !== 0)}
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
              TOTAL PROFIT/LOSS:
              <div
                style={{
                  textAlign: "center",
                  marginTop: 120,
                  marginLeft: 120
                }}
              >
                {this.state.totalResult < 0 ? (
                  <Red>${parseFloat(this.state.totalResult).toFixed(3)}</Red>
                ) : (
                  <Green>
                    ${parseFloat(this.state.totalResult).toFixed(3)}
                  </Green>
                )}
              </div>
            </span>
          </Div>
        </div>
      </MainDiv>
    );
  }
}
