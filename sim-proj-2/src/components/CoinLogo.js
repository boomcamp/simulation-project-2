import React from 'react';
import Logo from '../assest/logo.gif'

export default function CoinLogo() {
  return (
    <React.Fragment>
        <img src={Logo} alt="logo" width="250" height="200" />
    </React.Fragment>
  );
}