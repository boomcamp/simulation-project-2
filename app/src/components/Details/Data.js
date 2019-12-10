import styled from "styled-components";

const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`;
const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  margin-right: 4%;
  margin-left: 4%;
  width: 100%;
  height: 280px;
`;
const ContainerTwo = styled.div`
  display: flex;
  box-sizing: border-box;
  margin-right: 4%;
  margin-left: 4%;
  width: 100%;
  height: 550px;
`;
const Filter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px;
`;
const Logo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 30%;
`;
const Description = styled.div`
  display: flex;
  justify-content: flex-start;
  overflow-y: auto;
  width: 70%;
  height: 180px;
  margin-top: 50px;
`;
const Chart = styled.div`
  width: 70%;
`;
const Table = styled.div`
  width: 30%;
  padding-right: 30px;
  padding-left: 30px;
`;

const days = [
  { name: "24h", value: 1 },
  { name: "7d", value: 7 },
  { name: "30d", value: 30 },
  { name: "6M", value: 180 },
  { name: "1Y", value: 365 },
  { name: "Max", value: "max" }
];
const Buttons = styled.div``;

const Amount = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
export {
  MainDiv,
  Container,
  ContainerTwo,
  Filter,
  Logo,
  Description,
  Chart,
  Table,
  days,
  Buttons,
  Amount
};
