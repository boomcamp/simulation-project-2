import React from "react";
import { MDBIcon } from "mdbreact";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Title = styled.div`
  display: flex;
  padding-bottom: 20px;
`;
const Total = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MainDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Table = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 70%;
  height: 500px;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  width: 28%;
`;
const BuySell = styled.div`
  width: 100%;
  height: 120px;
  background-color: white;
  padding: 20px;
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

const Buy = styled.div`
  margin-top: 50px;
  height: 500px;
  width: 100%;
  padding: 50px;
  background-color: white;
`;

const investColumn = [
  {
    title: "Coin",
    field: "details.name",
    render: rowData => (
      <React.Fragment>
        <Link to={`details/${rowData.details.coinId}`}>
          <Img src={rowData.details.image} alt="" />
          {rowData.details.name}
        </Link>
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
    title: "Profit/Loss",
    field: "amountSold",
    render: rowData => (
      <React.Fragment>$ {rowData.amountSold.toFixed(3)}</React.Fragment>
    )
  },
  {
    title: "Date Invested",
    field: "date"
  }
];

export {
  investColumn,
  Title,
  Total,
  MainDiv,
  Table,
  BuySell,
  Img,
  Green,
  Red,
  Buy,
  Container
};
