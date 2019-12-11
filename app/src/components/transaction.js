import React, { Component } from "react";
import { Icon, Table } from "semantic-ui-react";
import Axios from "axios";

class transaction extends Component {
  constructor() {
    super();
    this.setState = {
      buyhistory: {}
    };
  }

  componentDidMount() {
    // Axios.get(`http://localhost:4000/transactions`).then(res =>
    //   this.setState({
    //     buyhistory: res.data
    //   })
    // );
  }
  render() {
    return (
      <React.Fragment>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="3">
                Historical Transaction
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell collapsing textAlign="right">
                10 hours ago
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell></Table.Cell>
              <Table.Cell>Initial commit</Table.Cell>
              <Table.Cell textAlign="right">10 hours ago</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell></Table.Cell>
              <Table.Cell>Initial commit</Table.Cell>
              <Table.Cell textAlign="right">10 hours ago</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell></Table.Cell>
              <Table.Cell>Initial commit</Table.Cell>
              <Table.Cell textAlign="right">10 hours ago</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell></Table.Cell>
              <Table.Cell>Initial commit</Table.Cell>
              <Table.Cell textAlign="right">10 hours ago</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </React.Fragment>
    );
  }
}
export default transaction;
