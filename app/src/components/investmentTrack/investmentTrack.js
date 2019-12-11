import React from "react";
import styled from "styled-components";
import MaterialTable from "material-table";

const MainDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 10px;
  box-shadow: 5px 10px 8px #888888;
`;

const Div = styled.div`
  border: 4px solid grey;
  border-radius: 10px;
  height: 420px;
  margin-bottom: 10px;
`;

const Info = styled.div`
  border: 4px solid grey;
  border-radius: 10px;
  height: 250px;
  width: 350px;
`;

const Details = styled.div`
  margin-top: 12px;
  border: 4px solid grey;
  border-radius: 10px;
  height: 25.5vh;
  width: 113.5vh;
`;

export default class investmentTrack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRow: null
    };
  }
  render() {
    return (
      <MainDiv>
        <div>
          <MaterialTable
            style={{
              marginRight: 30,
              width: 1110
            }}
            title="List of Investments"
            columns={[
              { title: "Coin", field: "name" },
              { title: "Current Price", field: "surname" },
              { title: "Invested Amount", field: "birthYear" },
              { title: "Profit/Loss", field: "birthYear" }
            ]}
            onRowClick={(evt, selectedRow) => this.setState({ selectedRow })}
            options={{
              rowStyle: rowData => ({
                backgroundColor:
                  this.state.selectedRow &&
                  this.state.selectedRow.tableData.id === rowData.tableData.id
                    ? "#EEE"
                    : "#FFF"
              })
            }}
          />
          <Details></Details>
        </div>
        <div>
          <Div></Div>
          <Info></Info>
        </div>
      </MainDiv>
    );
  }
}
