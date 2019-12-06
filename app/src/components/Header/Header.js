import React from "react";
import { MDBNavbar, MDBNavbarBrand } from "mdbreact";

export default class Header extends React.Component {
  render() {
    return (
      <MDBNavbar className="nav-header">
        <MDBNavbarBrand>
          <div className="title-text">Cryptocurrency</div>
        </MDBNavbarBrand>
      </MDBNavbar>
    );
  }
}
