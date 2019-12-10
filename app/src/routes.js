import React from "react";
import { Route, Switch } from "react-router-dom";
import { Pagination } from "semantic-ui-react";
import styled from "styled-components";
import "semantic-ui-css/semantic.min.css";

import Currency from "./components/Currency/Currency";
import Table from "./components/Table/Table";
import Details from "./components/Details/Details";
import Entries from "./components/Entries/Entries";

const MainDiv = styled.div``;
const TableDiv = styled.div`
  margin-right: 2%;
  margin-left: 2%;
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
      handleEntries,
      dataPerPage,
      totalEntries
    } = this.props;
    const total = parseInt(totalEntries / dataPerPage);
    return (
      <Switch>
        <Route
          exact
          render={() => (
            <MainDiv>
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
                      totalPages={total}
                      ellipsisItem={null}
                    />
                  </div>
                </Container>
                <Table getData={getData} isLoading={isLoading} unit={unit} />
              </TableDiv>
            </MainDiv>
          )}
          path="/"
        />
        <Route
          render={props => (
            <MainDiv>
              <Details {...props} currency={currency} />
            </MainDiv>
          )}
          path="/details/:id"
        />
      </Switch>
    );
  }
}
