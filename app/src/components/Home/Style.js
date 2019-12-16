import styled from "styled-components";
const Div = styled.div`
  padding-top: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
`;
const Cont = styled.div`
  width: 90%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1080px) {
    width: 100%;
  }
`;
const Cont2 = styled.div`
  padding: 20px 0 5px 0;
  width: 80%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;
const Table = styled.table`
  width: 100%;
`;
const THead = styled.td`
  font-size: 18px;
  text-align: right;
  padding: 10px 15px 10px 15px;
  border-top: 2px solid gray;
`;
const TData = styled.td`
  font-size: 14px;
  padding: 10px 15px 10px 15px;
  text-align: right;
`;
const Row = styled.tr`
  border-bottom: 2px solid gray;
  :hover {
    background: whitesmoke;
  }
`;
const Paginator = styled.div`
  margin: 5px 0 0 0;
  float: right;
  padding: 5px;
`;
const Button = styled.button`
  border: none;
  border-radius: 3px;
  padding: 5px 10px 5px 10px;
  margin: 0 2px 0 2px;
  width: 50px;
  font-size: 16px;
  background: #1873f2;
  color: white;
`;
const Img = styled.img`
  height: 30px;
  margin-right: 10px;
`;
const Tloading = styled.td`
  align-content: center;
  background: black;
`;
const Red = styled.span`
  color: red;
`;
const Blue = styled.span`
  color: #3c8dd4;
`;
const Green = styled.span`
  color: green;
`;
const Span = styled.span`
  text-transform: uppercase;
`;
const Cont3 = styled.span`
  width: 300px;
`;

export {
  Button,
  Paginator,
  Row,
  TData,
  THead,
  Table,
  Cont,
  Div,
  Img,
  Tloading,
  Red,
  Blue,
  Green,
  Span,
  Cont2,
  Cont3
};
