import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import Typography from "@material-ui/core/Typography";

class content extends Component {
  render() {
    return (
      <React.Fragment>
        <Typography variant="h4">
          {this.props.details.name}({this.props.details.symbol})
        </Typography>
        <Typography
          align="center"
          dangerouslySetInnerHTML={{
            __html: this.props.details.description.en
          }}
        ></Typography>

        <Table celled fixed singleLine textAlign="center">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>24h</Table.HeaderCell>
              <Table.HeaderCell>1 week</Table.HeaderCell>
              <Table.HeaderCell>1 Month</Table.HeaderCell>
              <Table.HeaderCell>6 Months</Table.HeaderCell>
              <Table.HeaderCell>1 year</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                {" "}
                {this.props.details.market_data.price_change_percentage_24h}
              </Table.Cell>
              <Table.Cell>
                {this.props.details.market_data.price_change_percentage_7d}
              </Table.Cell>
              <Table.Cell>
                {" "}
                {this.props.details.market_data.price_change_percentage_30d}
              </Table.Cell>
              <Table.Cell>
                {this.props.details.market_data.price_change_percentage_200d}
              </Table.Cell>
              <Table.Cell>
                {this.props.details.market_data.price_change_percentage_1y}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </React.Fragment>
    );
  }
}
export default content;
