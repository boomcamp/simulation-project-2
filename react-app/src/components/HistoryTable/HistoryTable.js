import React, { useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { useParams } from "react-router-dom";

export default function MaterialTableDemo() {
  const { id } = useParams();

  const [state, setState] = React.useState({
    data: []
  });

  let coinList = {};
  const [coinLs, setCoinLs] = React.useState({});
  useEffect(() => {
    axios.get(`http://localhost:4000/transactions`).then(response => {
      let buyData = response.data.filter(data => data.coinId === id);
      let coins = [...buyData.map(el => el.coinId)].toString();
      response.data.filter(val => {
        val.timestamp = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        }).format(val.timestamp);
        return val.coinID === id;
      });

      const pricesWs = new WebSocket(
        `wss://ws.coincap.io/prices?assets=${coins}`
      );
      pricesWs.onmessage = function(msg) {
        Object.keys(JSON.parse(msg.data)).forEach(e => {
          if (JSON.parse(msg.data)[`${e}`] !== "")
            coinList[e] = JSON.parse(msg.data)[`${e}`];
          setCoinLs(coinList);
          setState({ ...state, data: buyData });
        });
      };
    });
  }, [id]);
  return (
    <div style={{ overflowY: "scroll" }}>
      <MaterialTable
        style={{
          minHeight: "50vh",
          maxHeight: "50vh",
          padding: "0px 20px 20px 20px",
          borderRadius: "0px",
          boxShadow: "none"
        }}
        title=""
        columns={[
          {
            title: "Date of Transaction",
            headerStyle: {
              height: 10,
              fontWeight: "bold"
            },
            render: rowData => (
              <div>
                <p style={{ textTransform: "uppercase" }}>
                  {rowData.timestamp}
                </p>
              </div>
            ),
            type: "text"
          },
          {
            title: "Transaction",
            headerStyle: {
              height: 10,
              fontWeight: "bold"
            },
            render: rowData => (
              <p style={{ textTransform: "uppercase" }}>
                {rowData.transaction}
              </p>
            ),
            type: "text"
          },
          {
            title: "Price Bought",
            headerStyle: {
              height: 10,
              fontWeight: "bold"
            },
            render: rowData => {
              return <p>{"$" + rowData.currentPrice.toFixed(2)}</p>;
            },
            type: "numeric"
          },
          {
            title: "Coin Quantity",
            headerStyle: {
              height: 10,
              fontWeight: "bold"
            },
            headerStyle: {
              height: 10,
              fontWeight: "bold"
            },
            type: "numeric",
            render: rowData => {
              return <p>{rowData.coinQuantity.toFixed(4)}</p>;
            }
          },
          {
            title: "Total Cost",
            headerStyle: {
              height: 10,
              fontWeight: "bold"
            },
            type: "numeric",
            render: rowData => {
              return <p>{"$" + rowData.totalAmount.toFixed(2)}</p>;
            }
          }
        ]}
        data={state.data}
        editable={{}}
        options={{
          paging: false,
          search: false
        }}
      />
    </div>
  );
}
