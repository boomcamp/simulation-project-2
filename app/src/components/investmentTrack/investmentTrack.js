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
import { AiOutlineReload } from "react-icons/ai";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link, Route, Switch } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";

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
  box-shadow: 5px 10px 8px #888888;
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
          title: "Coin Name",
          field: "name",
          render: rowData => (
            <React.Fragment>
              <img className="logo" src={rowData.image} alt="" />
              <Link key={rowData.coinId} to={`chartInfo/${rowData.coinId}`}>
                <Tooltip TransitionComponent={Zoom} title="Show Price Chart">
                  <div>
                    <button
                      style={{
                        color: "darkblue",
                        marginLeft: -13,
                        fontSize: 15,
                        background: "transparent",
                        border: "transparent",
                        cursor: "pointer"
                      }}
                    >
                      {rowData.coinName}
                    </button>
                  </div>
                </Tooltip>
              </Link>
              <Switch>
                <Route />
              </Switch>
            </React.Fragment>
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
              {rowData.profit ? (
                rowData.profit < 0 ? (
                  <Red>${Number(rowData.profit.toFixed(3))}</Red>
                ) : (
                  <Green>${Number(rowData.profit.toFixed(3))}</Green>
                )
              ) : (
                ""
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
      openModal: false,
      currentData: {}
    };
  }

  fetchData = () => {
    axios.get(`http://localhost:4000/transactions`).then(response => {
      console.log(response);
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
      let sum = response.data.map(x => x.amountSold).reduce((a, b) => a + b, 0);
      this.setState({ data: initialData, totalResult: sum });
    });
  };

  componentDidMount = () => {
    this.fetchData();
  };

  handleClick = () => {
    this.setState({ openModal: true });
    this.fetchData();
    setTimeout(() => {
      this.setState({ openModal: false });
    }, 500);
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
    this.setState({
      toggleModal: false
    });
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
        <div>
          <Dialog
            open={this.state.openModal}
            PaperProps={{
              style: {
                backgroundColor: "transparent",
                boxShadow: "none"
              }
            }}
          >
            <div
              style={{
                backgroundColor: "transparent",
                width: "75px",
                height: "75px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <CircularProgress color="secondary" />
            </div>
          </Dialog>
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
          <ToastContainer />
          <MaterialTable
            style={{
              marginRight: 30,
              width: 1110,
              boxShadow: "5px 10px 8px #888888"
            }}
            title="List of Investments"
            columns={this.state.columns}
            data={this.state.data.filter(x => x.invested !== 0)}
            options={{
              paging: false,
              search: false
            }}
            actions={[
              {
                icon: "replay",
                tooltip: "Reload",
                isFreeAction: true,
                onClick: () => this.handleClick()
              }
            ]}
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
                  fontSize: 35,
                  textAlign: "center",
                  marginTop: 120,
                  marginLeft: 80
                }}
              >
                {" "}
                {this.state.totalResult ? (
                  this.state.totalResult < 0 ? (
                    <Red>${parseFloat(this.state.totalResult).toFixed(3)}</Red>
                  ) : (
                    <Green>
                      ${parseFloat(this.state.totalResult).toFixed(3)}
                    </Green>
                  )
                ) : (
                  "$0.000"
                )}
              </div>
            </span>
          </Div>
        </div>
      </MainDiv>
    );
  }
}
