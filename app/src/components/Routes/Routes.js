import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../Home/Home";
import Coins from "../Coins/Coins";
import Investment from "../Investment/Investment";

export default class Routes extends React.Component {
  render() {
    const {
      data,
      currentPage,
      currency,
      handleSelect,
      loading,
      handlePagination,
      currencies,
      crypto,
      cryptoList,
      handleCrypto,
      currentPrice,
      cryptoValue,
      moneyValue,
      handleOnChange,
      handleSubmitInvest,
      lastTrans,
      transList,
      handleSubmitSell,
      handleClickOpen,
      handleClose,
      open,
      totalProfit,
      currentTransaction
    } = this.props;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Home
              currency={currency}
              handleSelect={handleSelect}
              handlePagination={handlePagination}
              data={data}
              loading={loading}
              currentPage={currentPage}
              currencies={currencies}
            />
          )}
        />
        <Route
          path="/coins/:id"
          render={props => <Coins {...props} currency={currency} />}
        />
        <Route
          path="/investment/tracking"
          render={props => (
            <Investment
              {...props}
              currency={currency}
              crypto={crypto}
              cryptoList={cryptoList}
              currencies={currencies}
              handleCrypto={handleCrypto}
              currentPrice={currentPrice}
              cryptoValue={cryptoValue}
              moneyValue={moneyValue}
              handleOnChange={handleOnChange}
              handleSubmitInvest={handleSubmitInvest}
              lastTrans={lastTrans}
              transList={transList}
              loading={loading}
              handleSubmitSell={handleSubmitSell}
              handleClickOpen={handleClickOpen}
              handleClose={handleClose}
              open={open}
              totalProfit={totalProfit}
              currentTransaction={currentTransaction}
            />
          )}
        />
      </Switch>
    );
  }
}
