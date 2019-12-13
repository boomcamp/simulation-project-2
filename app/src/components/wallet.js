import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
export default class wallet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalAmount: "",
      totalUsd: ""
    };
  }
  componentDidMount() {
    let totalamount = 0;
    let totalusd = 0;
    axios.get(`http://localhost:4000/transactions`).then(response => {
      response.data.map(res => {
        if (localStorage.getItem("id") === res.idname) {
          totalamount += parseFloat(res.amount);

          totalusd += parseFloat(res.sum);
          this.setState({
            totalAmount: totalamount,
            totalUsd: totalusd
          });
        }
      });
    });
  }

  render() {
    //   console.log(this.state.data)
    return (
      <React.Fragment>
        <div
          style={{
            width: "40%",
            height: "500px",
            backgroundColor: "	#C0C0C0",
            marginLeft: "30%",
            borderRadius: "20px",
            marginTop: " 60px",

            boxShadow: " 5px 10px #888888"
          }}
        >
          <div
            style={{
              padding: "30px"
            }}
          >
            <img
              src={this.props.details.image}
              style={{
                height: "50px"
              }}
            />
            <span
              style={{
                fontWeight: "bold"
              }}
            >
              {this.props.details.name}
            </span>
          </div>
          <div
            style={{
              fontWeight: "normal",
              padding: "60px"
            }}
          >
            <h1>Total Buy: {this.state.totalAmount}</h1>
            <h1>Total Usd: ${this.state.totalUsd}</h1>
          </div>
          {/* <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => this.handleOpenSell()}
            >
              Sell
            </Button>
          </div> */}
        </div>
      </React.Fragment>
    );
  }
}
