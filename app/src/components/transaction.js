import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import axios from "axios";
import { classes } from "istanbul-lib-coverage";
import { withStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";

const useStyles = theme => ({
  head: {
    backgroundColor: "#304050"
  }
});

class transaction extends Component {
  constructor() {
    super();
    this.state = {
      name: []
    };
  }

  componentDidMount(i) {
    axios({
      method: `get`,
      url: `http://localhost:4001/transactions`,
      data: this.state
    }).then(res => {
      this.setState({ name: res.data });
    });
  }

  render() {
    return (
      <React.Fragment>
        <Table celled striped>
          <Table.Header className={classes.table}>
            <Table.Row className={classes.head}>
              <Table.HeaderCell colSpan="5">
                <Typography variant="h4"> Historical Transaction</Typography>
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <b>Coin Name</b>
              </Table.Cell>
              <Table.Cell>
                <b>Coin Quantity</b>
              </Table.Cell>
              <Table.Cell>
                <b>Coin price</b>
              </Table.Cell>
              <Table.Cell>
                <b>Total Price</b>
              </Table.Cell>
              <Table.Cell>
                <b>Transaction</b>
              </Table.Cell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.name.map(x => (
              <Table.Row key={x.id}>
                <Table.Cell>{x.name}</Table.Cell>
                <Table.Cell>{Math.abs(x.quantity)}</Table.Cell>
                <Table.Cell>{x.price}</Table.Cell>
                <Table.Cell>{x.totalPrice}</Table.Cell>
                <Table.Cell>{x.transaction}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </React.Fragment>
    );
  }
}
export default withStyles(useStyles)(transaction);
