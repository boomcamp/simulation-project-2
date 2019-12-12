import styled from "styled-components";

const TitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const Div = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  justify-content: center;
  font-weight: bold;
`;
const white = { color: "white" };
const Span = styled.span`
  padding: 10px 0 0 15px;
  font-size: 18px;
  color: white;
`;
const font = {
  fontSize: "25px"
};
export { TitleDiv, Div, white, Span, font };
