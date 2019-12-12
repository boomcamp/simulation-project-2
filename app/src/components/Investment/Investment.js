import React from "react";
import { FaExchangeAlt } from "react-icons/fa";
import TextField from "@material-ui/core/TextField";
import Select from "react-select";
import {
  Div,
  Left,
  Right,
  Buy,
  Tracking,
  Label,
  Value,
  Button,
  Box,
  CryptoBtn,
  CryptoImg,
  CryptoName,
  Suggestions,
  Title,
  active,
  Convert,
  ConvertBox,
  Icon,
  History,
  ValueBox,
  Fresh,
  red,
  blue,
  green
} from "./Style";
import "../../App.css";
import Table from "./Table";
import { list } from "./Data";
export default class Investment extends React.Component {
  render() {
    const {
      crypto,
      cryptoList,
      currency,
      handleCrypto,
      cryptoValue,
      moneyValue,
      handleOnChange,
      handleSubmitInvest,
      lastTrans,
      transList,
      loading,
      handleSubmitSell,
      handleClickOpen,
      handleClose,
      open,
      totalProfit,
      currentTransaction
    } = this.props;
    const cryptoList2 = cryptoList.map(x => {
      return { value: x.id, label: x.name, unit: x.symbol };
    });
    return (
      <Div>
        <Left>
          <Table
            transList={transList}
            loading={loading}
            handleOnChange={handleOnChange}
            handleSubmitSell={handleSubmitSell}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            open={open}
            currentTransaction={currentTransaction}
          />
        </Left>
        <Right>
          <Tracking>
            {lastTrans ? (
              <React.Fragment>
                <History>Last Transation Made:</History>
                <Label>
                  {lastTrans.crypto ? lastTrans.crypto.id : ""} :
                  <ValueBox>
                    {lastTrans.amount ? lastTrans.amount.toFixed(6) : ""}
                  </ValueBox>
                </Label>
                <Value>
                  Price : <ValueBox>${lastTrans.price}</ValueBox>
                </Value>
                <History style={{ margin: "20px 0 10px 0" }}>
                  <Label style={{ padding: "0px" }}>
                    Total Profit/Loss:{" "}
                    <ValueBox
                      style={
                        totalProfit > 0 ? green : totalProfit < 0 ? red : blue
                      }
                    >
                      ${totalProfit ? Number(totalProfit.toFixed(4)) : 0}
                    </ValueBox>
                  </Label>
                </History>
              </React.Fragment>
            ) : (
              <Fresh>Invest to CryptoCurrency Now!</Fresh>
            )}
          </Tracking>

          <Buy>
            <Title>Investment: </Title>
            <Suggestions>
              {list.map(x => (
                <CryptoBtn
                  key={x.value}
                  onClick={() => handleCrypto(x)}
                  style={x.value === crypto.value ? active : {}}
                >
                  <CryptoImg src={x.icon} />
                  <CryptoName>{x.label}</CryptoName>
                </CryptoBtn>
              ))}
            </Suggestions>
            <form onSubmit={e => handleSubmitInvest(e)}>
              <Box>
                <Select
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                  options={cryptoList2}
                  value={crypto}
                  onChange={handleCrypto}
                />

                <Convert>
                  <ConvertBox>
                    <TextField
                      label={currency.label}
                      value={moneyValue}
                      onChange={e => handleOnChange(+e.target.value, "money")}
                      type="number"
                      required
                      fullWidth
                      variant="outlined"
                    />
                  </ConvertBox>
                  <Icon>
                    <FaExchangeAlt />
                  </Icon>
                  <ConvertBox>
                    <TextField
                      label={crypto.label}
                      value={cryptoValue}
                      onChange={e => handleOnChange(+e.target.value, "crypto")}
                      type="number"
                      required
                      fullWidth
                      variant="outlined"
                    />
                  </ConvertBox>
                </Convert>
              </Box>
              <Button type="submit">INVEST</Button>
            </form>
          </Buy>
        </Right>
      </Div>
    );
  }
}
