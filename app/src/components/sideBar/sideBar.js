import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      <Link to="/investmentTrack">
        <p className="menu-item">Investment Tracking</p>
      </Link>
    </Menu>
  );
};
