import React, { Component } from "react";
import { Button } from "antd";
export default class BuySell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // size: "large"
    };
  }

  render() {
    // const { size } = this.state;
    return (
      <div>
        <Button type="primary">Buy</Button>&nbsp;&nbsp;
        <Button type="primary">Sell</Button>
      </div>
    );
  }
}
