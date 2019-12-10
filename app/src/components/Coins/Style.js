import styled from "styled-components";

const Div = styled.div`
  margin: 0 0 0 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 500px;
  @media screen and (max-width: 1550px) {
    width: 95%;
  }
`;
const Div2 = styled.div`
  margin: 0 0 20px 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  @media screen and (max-width: 1550px) {
    width: 100%;
  }
`;
const Cont = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 0 30px 10px 0;
  @media screen and (max-width: 1550px) {
    justify-content: center;
  }
`;
const Name = styled.span`
  padding: 20px 0 0 30px;
  display: flex;
  align-items: center;
  align-content: center;
`;
const Img = styled.img`
  height: 120px;
`;
const Title = styled.span`
  font-size: 25px;
  margin: 0 15px 0 5px;
`;
const Desc = styled.div`
  font-size: 17px;
  height: 98px;
  overflow: hidden;
  :hover {
    overflow: auto;
  }
`;
const Box = styled.div`
  display: flex;
  width: 79%;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
  @media screen and (max-width: 1550px) {
    width: 100%;
  }
`;
const Stats = styled.div`
  padding: 75px 0 0 0;
  width: 20%;
  @media screen and (max-width: 1550px) {
    padding: 0 0 20px 0;
    width: 50%;
  }
`;
const Main = styled.div`
  padding-top: 50px;
  width: 85%;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1550px) {
    width: 95%;
    flex-direction: column;
    align-items: center;
  }
`;
const Details = styled.div`
  width: 100%;
  background: #3f51b5;
  color: white;
  border-radius: 5px;
  font-size: 18px;
  display: flex;
  flex-direction: column;
`;
const SpanDetails = styled.div`
  width: 100%;
  font-size: 16px;
  padding: 10px;
  border-top: 2px solid white;
  display: flex;
  justify-content: space-between;
`;
const Span = styled.span`
  width: 50%;
`;
const Icon = styled.span`
  margin: 15px 0 0 0;
  width: 100%;
  display: flex;
  padding-left: 30px;
  font-size: 40px;
  color: #3f51b5;
`;
const StatsDiv = styled.div`
  width: 100%;
`;
export {
  Div,
  Div2,
  Cont,
  Name,
  Img,
  Title,
  Desc,
  Box,
  Stats,
  Main,
  Details,
  SpanDetails,
  Span,
  Icon,
  StatsDiv
};
