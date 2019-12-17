import React, { Component } from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import axios from "axios";
export default class CoinWallet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coins: []
    };
  }
  componentDidMount() {
    axios.get("http://localhost:4000/transactions").then(res => {
      // console.log(res.data);
      let result = res.data.reduce((c, v) => {
        const num = parseFloat(v.coinBalance);
        c[v.name] = (c[v.name] || 0) + num;
        return c;
      }, {});
      let newData = [];
      let init = 0;

      for (var key in result) {
        newData.push({
          id: init++,
          name: key,
          amount: result[key]
          // image: image
        });
      }
      this.setState({
        coins: newData
      });
    });
  }
  render() {
    return (
      <div>
        {/* {this.state.name} */}
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th>CoinName</th>
              <th>CoinBalance</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {this.state.coins
              ? this.state.coins.map(x => {
                  //     console.log(x);
                  return (
                    <tr key={x.id}>
                      <td>{x.name}</td>
                      <td>{x.amount}</td>
                    </tr>
                  );
                })
              : null}

            <tr>
              {/* {this.state.coins.map(r => {
                console.log(r);
              })} */}

              <td></td>
            </tr>
          </MDBTableBody>
        </MDBTable>
        {/* <MDBDataTable striped hover data={data} /> */}
      </div>
    );
  }
}
