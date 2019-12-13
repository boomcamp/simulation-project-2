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

  componentDidMount() {
    axios({
      method: `get`,
      url: `http://localhost:4000/transactions`,
      data: this.state
    }).then(res => {
      this.setState({ name: res.data });
    });
  }

  render() {
    // console.log(this.state.name ? this.state.name : null);
    return (
      <React.Fragment>
        <Table celled striped>
          <Table.Header className={classes.table}>
            <Table.Row className={classes.head}>
              <Table.HeaderCell colSpan="4">
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
                <b>Transaction</b>
              </Table.Cell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.name.map(x => (
              <Table.Row>
                <Table.Cell>{x.name}</Table.Cell>
                <Table.Cell>{x.quantity}</Table.Cell>
                <Table.Cell>{x.price}</Table.Cell>
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
