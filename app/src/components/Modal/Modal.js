import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

import { MDBIcon } from "mdbreact";

const Amount = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export default class Modal extends React.Component {
  render() {
    const {
      toggleModal,
      handleClose,
      handleInvest,
      logo,
      name,
      symbol,
      handleAmount,
      amountValue,
      cryptValue,
      price,
      details,
      handleSell,
      handleChange,
      data
    } = this.props;

    return details === "details" ? (
      <Dialog open={toggleModal} onClose={handleClose}>
        <form onSubmit={e => handleInvest(e)}>
          <DialogTitle>
            <img
              src={logo}
              alt=""
              style={{ width: "60px", height: "50px", paddingRight: "15px" }}
            />
            {name}
          </DialogTitle>
          <DialogContent>
            <Typography
              variant="h6"
              component="h6"
              style={{ paddingBottom: "10px" }}
            >
              Amount
            </Typography>
            <Amount>
              <TextField
                required
                label="USD"
                variant="outlined"
                style={{ textTransform: "uppercase" }}
                value={amountValue}
                onChange={e => handleAmount(+e.target.value, "amount", price)}
              />
              <MDBIcon icon="exchange-alt" style={{ padding: "20px" }} />
              <TextField
                required
                label={symbol}
                variant="outlined"
                style={{ textTransform: "uppercase" }}
                value={cryptValue}
                onChange={e => handleAmount(+e.target.value, "crypt", price)}
              />
            </Amount>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" type="submit" autoFocus>
              Invest
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    ) : (
      <Dialog open={toggleModal} onClose={handleClose}>
        <form onSubmit={e => handleSell(e, data)}>
          <DialogTitle>
            <img
              src={data.details.image}
              alt=""
              style={{
                width: "60px",
                height: "50px",
                paddingRight: "15px"
              }}
            />
            {data.details.name}
          </DialogTitle>
          <DialogContent>
            <Typography
              variant="h6"
              component="h6"
              style={{ paddingBottom: "10px" }}
            >
              Amount to Sell
            </Typography>
            <TextField
              required
              type="number"
              label="USD"
              variant="outlined"
              style={{ textTransform: "uppercase", width: "300px" }}
              inputProps={{
                min: 0,
                max: data.amount,
                step: ".000000001"
              }}
              onChange={e => handleChange(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button type="submit" color="primary" autoFocus>
              Sell
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}
