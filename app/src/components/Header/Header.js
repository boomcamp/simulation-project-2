import React from "react";
import styled from "styled-components";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBFormInline
} from "mdbreact";

import Logo from "../../images/logo.webp";
const ImgLogo = styled.img`
  height: 45px;
`;
const NavDiv = styled.div`
  background-color: yellowgreen;
  height: 5px;
  width: 100%;
`;

export default class Header extends React.Component {
  state = {
    collapseID: ""
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));
  render() {
    return (
      <div>
        <MDBNavbar
          color="light-green lighten-5"
          light
          expand="md"
          style={{ paddingLeft: "10%", paddingRight: "10%" }}
        >
          <MDBNavbarBrand>
            <ImgLogo src={Logo} alt="" />
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse3")} />
          <MDBCollapse
            id="navbarCollapse3"
            isOpen={this.state.collapseID}
            navbar
          >
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBFormInline waves>
                  <div className="md-form my-0">
                    <input
                      className="form-control mr-sm-2"
                      type="text"
                      placeholder="Search"
                      aria-label="Search"
                    />
                  </div>
                </MDBFormInline>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
        <NavDiv />
      </div>
    );
  }
}
