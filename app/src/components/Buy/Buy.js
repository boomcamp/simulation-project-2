import React from "react";
import Select from "react-select";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { MDBIcon } from "mdbreact";
const Amount = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
export default class Buy extends React.Component {
  render() {
    const {
      allCoins,
      coin,
      handleCoins,
      handleAmount,
      amountValue,
      cryptValue,
      handleInvest
    } = this.props;
    const options = Object.keys(allCoins).map(x => {
      return {
        label: allCoins[x].name + " (" + allCoins[x].symbol + ")",
        value: allCoins[x].id,
        name: allCoins[x].name,
        symbol: allCoins[x].symbol
      };
    });
    return (
      <div>
        <Select
          menuPortalTarget={document.body}
          styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
          value={coin}
          onChange={handleCoins}
          options={options}
        />
        <Typography
          variant="h6"
          component="h6"
          style={{ paddingBottom: "10px", marginTop: "20px" }}
        >
          Amount
        </Typography>
        <form onSubmit={e => handleInvest(e)}>
          <Amount>
            <TextField
              required
              label="USD"
              variant="outlined"
              style={{ textTransform: "uppercase" }}
              value={amountValue}
              onChange={e =>
                handleAmount(+e.target.value, "amount", this.props.price)
              }
            />
            <MDBIcon icon="exchange-alt" style={{ padding: "20px" }} />
            <TextField
              required
              label={coin.symbol}
              variant="outlined"
              style={{ textTransform: "uppercase" }}
              value={cryptValue}
              onChange={e =>
                handleAmount(+e.target.value, "crypt", this.props.price)
              }
            />
          </Amount>
          <Button
            variant="outlined"
            style={{ width: "450px", marginTop: "50px" }}
            type="submit"
          >
            Invest
          </Button>
        </form>
      </div>
    );
  }
}
