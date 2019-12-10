import React from "react";
import styled from "styled-components";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import TextField from "@material-ui/core/TextField";
import Select from "react-select";

const Div = styled.div`
  width: 100%;
  display: flex;
  padding: 80px;
`;

const Left = styled.div`
  width: 75%;
`;
const Right = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
`;
const Buy = styled.div`
  margin: 0 0 10px 0;
  width: 100%;
  border: 5px solid #3f51b5;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;
const Tracking = styled.div`
  width: 100%;
  border: 5px solid #3f51b5;
  padding: 30px 0 30px 0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  font-size: 28px;
  font-weight: bold;
`;
const Label = styled.span`
  padding: 5px 30px 5px 30px;
  border-bottom: 2px solid #3f51b5;
`;
const Value = styled.span`
  padding: 5px 0 5px 0;
  width: 80%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;
const Green = styled.span`
  color: green;
`;
const Red = styled.span`
  color: red;
`;
const move = {
  marginTop: "-5px"
};
const Button = styled.button`
  padding: 10px 20px 10px 20px;
  font-size: 18px;
  width: 100%;
  border: 2px solid #3f51b5;
  background: transparent;
  border-radius: 15px;
  :hover {
    background: #3f51b5;
    color: white;
  }
`;
const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 0 15px 0;
`;

export default class Investment extends React.Component {
  render() {
    return (
      <Div>
        <Left>some table...</Left>
        <Right>
          <Buy>
            <Box>
              <Select />
              <TextField label="BTC" fullWidth></TextField>
            </Box>
            <Box>
              <Select />
              <TextField label="USD" fullWidth></TextField>
            </Box>
            <Button>INVEST</Button>
          </Buy>
          <Tracking>
            <Label>Total Profit / Loss</Label>
            <Value>
              $ 567{" "}
              <Green>
                <FaArrowUp style={move} />
              </Green>
              <Red>
                <FaArrowDown style={move} />
              </Red>
            </Value>
          </Tracking>
        </Right>
      </Div>
    );
  }
}
