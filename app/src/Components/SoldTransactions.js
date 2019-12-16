import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MaterialTable from "material-table";
import NumberFormat from "react-number-format";
export default function SoldTransactions(props) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleCoinTarget = e => {
    setOpen(true);
    var filteredSoldTrans = props.soldTrans.filter(function(transaction) {
      return transaction.coinName === e;
    });
    setState({ ...state, data: filteredSoldTrans });
  };

  const [state, setState] = React.useState({
    columns: [
      {
        title: "Coin",
        field: "image",
        render: state => (
      <img
        alt=""
        src={state.image.large}
        style={{ width: 30, borderRadius: "50%" }}
      />
        )
      },
      { title: "Name", field: "coinName" },
      {
        title: "Coin Amount",
        render: state => `${state.value} ${state.symbol}`
      },
      { title: "Date Sold", field: "date", defaultSort: "desc" },
      {
        title: "Bought @",
        cellStyle: {
          color: "Blue"
        },
        render: state => (
          <NumberFormat
            value={state.amount}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            decimalScale={"2"}
          />
        )
      },
      {
        title: "Sold @",
        render: state => (
          <NumberFormat
            value={state.amountBalance}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            decimalScale={"2"}
            style={{
              color:
              state.amountBalance < state.amount
                  ? "red"
                  : "green"
            }}
          />
        )
      },
    ],
    data: []
  });

  return (
    <>
      {props.totalinvestment.map(data => (
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography
              variant="h7"
              gutterBottom
              className="coinTarget"
              onClick={() => handleCoinTarget(data.coinName)}
            >
              {data.coinName}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {data.totalValue}
          </Grid>
        </Grid>
      ))}

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="lg"
          fullWidth={true}
        >
          <MaterialTable
            options={{
              pageSize: 10
            }}
            title="Sold Coins"
            columns={state.columns}
            data={state.data}
          />
        </Dialog>
      </div>
    </>
  );
}
