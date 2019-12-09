import React from "react";
import { Route, Switch } from "react-router-dom";
import { Pagination } from "semantic-ui-react";
import styled from "styled-components";
import "semantic-ui-css/semantic.min.css";

import Currency from "./components/Currency/Currency";
import Table from "./components/Table/Table";
import Details from "./components/Details/Details";
import Investment from "./components/Investment/Investment";
import Entries from "./components/Entries/Entries";

const TableDiv = styled.div`
  margin-top: 2%;
  margin-right: 10%;
  margin-left: 10%;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
`;
const Select = styled.div`
  width: 200px;
`;

export default class Routes extends React.Component {
  render() {
    const {
      currencies,
      handleChange,
      currency,
      activePage,
      getData,
      isLoading,
      unit,
      handleOnChange,
      handleEntries
    } = this.props;
    return (
      <Switch>
        <Route
          exact
          render={() => (
            <TableDiv>
              <Container>
                <Select>
                  <Currency
                    currencies={currencies}
                    handleChange={handleChange}
                    currency={currency}
                  />
                </Select>
                <div>
                  <Entries handleEntries={handleEntries} />
                  <Pagination
                    activePage={activePage}
                    onPageChange={handleOnChange}
                    totalPages={62}
                    ellipsisItem={null}
                  />
                </div>
              </Container>
              <Table getData={getData} isLoading={isLoading} unit={unit} />
            </TableDiv>
          )}
          path="/"
        />
        <Route
          render={props => <Details {...props} currency={currency} />}
          path="/details/:id"
        />
        <Route render={() => <Investment />} path="/investment" />
      </Switch>
    );
  }
}
