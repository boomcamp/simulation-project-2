import styled from "styled-components";

const Div = styled.div`
  width: 100%;
  display: flex;
  padding: 80px;
`;

const Left = styled.div`
  width: 65%;
`;
const Right = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
`;
const Buy = styled.div`
  margin: 10px 0 0 0;
  width: 100%;
  border: 2px solid gray;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
const Tracking = styled.div`
  width: 100%;
  border: 2px solid gray;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
`;
const Label = styled.div`
  font-size: 35px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  text-transform: capitalize;
`;
const Value = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
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
  border: 2px solid gray;
  background: transparent;
  border-radius: 5px;
  :hover {
    background: gray;
    color: white;
  }
`;
const Box = styled.div`
  width: 100%;
  display: flex;
  margin: 0 0 15px 0;
  flex-direction: column;
`;
const CryptoText = styled.span`
  width: 100%;
  font-size: 40px;
  display: flex;
  justify-content: center;
  overflow: auto;
`;
const CryptoBtn = styled.button`
  width: 33%;
  border: 3px solid gray;
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 10px 10px 10px 10px;
  :hover {
    border: 3px solid #5ee52e;
  }
`;
const CryptoImg = styled.img`
  height: 40px;
`;
const CryptoName = styled.span`
  margin: 5px 0 0 0;
  font-size: 18px;
`;
const Suggestions = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 10px 0 20px 0;
`;
const Title = styled.span`
  font-size: 25px;
  margin: 0 0 10px 0;
`;
const TableCont = styled.div`
  width: 100%;
  padding: 0 20px 0 0;
`;
const Convert = styled.div`
  margin: 20px 0 0 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const ConvertBox = styled.div`
  width: 45%;
`;
const Icon = styled.span`
  padding-top: 20px;
`;
const History = styled.span`
  font-size: 20px;
  margin: 0 0 10px 0;
  color: #3f51b5;
`;
const ValueBox = styled.div`
  width: 230px;
`;
const Span = styled.span`
  text-transform: capitalize;
`;
const Img = styled.img`
  height: 40px;
`;
const Fresh = styled.span`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const active = { border: "3px solid #5ee52e" };
export {
  Div,
  Left,
  Right,
  Buy,
  Tracking,
  Label,
  Value,
  Green,
  Red,
  move,
  Button,
  Box,
  CryptoText,
  CryptoBtn,
  CryptoImg,
  CryptoName,
  Suggestions,
  Title,
  active,
  TableCont,
  Convert,
  ConvertBox,
  Icon,
  History,
  ValueBox,
  Span,
  Img,
  Fresh
};
