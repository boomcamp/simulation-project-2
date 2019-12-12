import React, { Component } from "react";
import { Card, Icon } from "semantic-ui-react";
import axios from "axios";
class modal extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    axios({
      method: `get`,
      url: `http://localhost:4000/transactions`,
      data: this.state
    }).then(res => {
      let wallet = res.data;
    });
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <Card.Content>Wallet</Card.Content>
          <Card.Content></Card.Content>
        </Card>
      </React.Fragment>
    );
  }
}
export default modal;
