import React, { Component } from "react";
import { Button } from "antd";
export default class Transactions extends Component {
    handleClick(){

    }
  render() {
    return (
      <div>
        {/* <Button type="primary" >
        <Icon type="shopping-cart" label='buy' />
        </Button> */}
        <Button icon="shopping-cart" style={{backgroundColor:'whitesmoke'}} onClick={this.handleClick}>Buy</Button>
        <Button icon="shopping-cart" type="primary"  onClick={this.handleClick}>Sell</Button>
      </div>
    );
  }
}
