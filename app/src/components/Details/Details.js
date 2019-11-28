import React from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

const Div = styled.div`
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
`;
export default class Details extends React.Component {
  render() {
    return <Div>{this.props.match.params.id}</Div>;
  }
}
