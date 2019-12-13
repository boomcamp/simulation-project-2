import React from "react";
import { MDBNavbar, MDBNavbarBrand } from "mdbreact";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  render() {
    return (
      <MDBNavbar className="nav-header">
        <MDBNavbarBrand>
          <Link to="/">
            <div className="title-text">Cryptocurrency</div>
          </Link>
        </MDBNavbarBrand>
        <div className="right">
          <Link to={"/investment"}>
            <Button color="primary">Investment Tracking</Button>
          </Link>
        </div>
      </MDBNavbar>
    );
  }
}
