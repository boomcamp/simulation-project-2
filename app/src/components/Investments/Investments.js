import React from "react";
import MaterialTable from "material-table";
import {
  MDBContainer,
  MDBTabPane,
  MDBTabContent,
  MDBNav,
  MDBNavItem,
  MDBNavLink
} from "mdbreact";

import styled from "styled-components";
import axios from "axios";

const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Table = styled.div`
  width: 70%;
`;
const BuySell = styled.div`
  width: 30%;
`;
const Img = styled.img`
  height: 30px;
  padding-right: 20px;
`;

export default class Investments extends React.Component {
  constructor() {
    super();
    this.state = {
      activeItem: "1",
      data: []
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
      this.setState({ data: tempData });
    });
  };

  render() {
    return (
      <MainDiv>
        <Table>
          <MaterialTable
            title="Investment Tracking"
            columns={[
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
                title: "Current Price",
                field: "current_price"
              },
              {
                title: "Amount Invested",
                field: "amount"
              },
              {
                title: "Profit/Loss",
                field: "profit",
                render: rowData => (
                  <React.Fragment>{rowData.amount}</React.Fragment>
                )
              }
            ]}
            data={this.state.data}
          />
        </Table>
        <BuySell>
          <MDBContainer>
            <MDBNav className="nav-tabs">
              <MDBNavItem>
                <MDBNavLink
                  to="#"
                  active={this.state.activeItem === "1"}
                  onClick={this.toggle("1")}
                  role="tab"
                  style={{ width: "100px", textAlign: "center" }}
                >
                  Buy
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  to="#1"
                  active={this.state.activeItem === "2"}
                  onClick={this.toggle("2")}
                  role="tab"
                  style={{ width: "100px", textAlign: "center" }}
                >
                  Sell
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  to="#2"
                  active={this.state.activeItem === "3"}
                  onClick={this.toggle("3")}
                  role="tab"
                  style={{ width: "150px", textAlign: "center" }}
                >
                  Total Profit/Loss
                </MDBNavLink>
              </MDBNavItem>
            </MDBNav>
            <MDBTabContent
              activeItem={this.state.activeItem}
              style={{ height: "380px", backgroundColor: "white" }}
            >
              <MDBTabPane tabId="1" role="tabpanel">
                <p className="mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Nihil odit magnam minima, soluta doloribus reiciendis
                  molestiae placeat unde eos molestias. Quisquam aperiam,
                  pariatur. Tempora, placeat ratione porro voluptate odit
                  minima.
                </p>
              </MDBTabPane>
              <MDBTabPane tabId="2" role="tabpanel">
                <p className="mt-2">
                  Quisquam aperiam, pariatur. Tempora, placeat ratione porro
                  voluptate odit minima. Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit. Nihil odit magnam minima, soluta doloribus
                  reiciendis molestiae placeat unde eos molestias.
                </p>
                <p>
                  Quisquam aperiam, pariatur. Tempora, placeat ratione porro
                  voluptate odit minima. Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit. Nihil odit magnam minima, soluta doloribus
                  reiciendis molestiae placeat unde eos molestias.
                </p>
              </MDBTabPane>
              <MDBTabPane tabId="3" role="tabpanel">
                <p className="mt-2">
                  Quisquam aperiam, pariatur. Tempora, placeat ratione porro
                  voluptate odit minima. Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit. Nihil odit magnam minima, soluta doloribus
                  reiciendis molestiae placeat unde eos molestias.
                </p>
                <p>
                  Quisquam aperiam, pariatur. Tempora, placeat ratione porro
                </p>
              </MDBTabPane>
            </MDBTabContent>
          </MDBContainer>
        </BuySell>
      </MainDiv>
    );
  }
}
