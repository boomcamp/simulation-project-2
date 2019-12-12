import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { NavLink, useParams } from "react-router-dom";

export default function MaterialTableDemo() {
  const { id } = useParams();
  const [data, setData] = React.useState([]);

  const [state, setState] = React.useState({
    data: []
  });

  let coinList = {};
  const [coinLs, setCoinLs] = React.useState({});
  useEffect(() => {
    axios.get(`http://localhost:4000/transactions`).then(response => {
      let buyData = response.data.filter(data => data.transaction === "Buy");
      let coins = [...buyData.map(el => el.coinId)].toString();
      // setState({ ...state, data: buyData });
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
          padding: "0px 20px 20px 20px",
          borderRadius: "0px",
          boxShadow: "none"
        }}
        title="Invested Coins"
        columns={[
          {
            title: "Coin",
            headerStyle: {
              height: 10,
              fontWeight: "bold"
            },
            render: rowData => (
              <NavLink to={`/history/${rowData.coinId}`}>
                <div>
                  <img className="logo" src={rowData.img} alt="Img" />
                  <p style={{ textTransform: "uppercase" }}>{rowData.coin}</p>
                </div>
              </NavLink>
            )
          },
          {
            title: "Last Price",
            headerStyle: {
              height: 10,
              fontWeight: "bold"
            },
            field: "",
            render: rowData => {
              return <p>{"$" + (+coinLs[rowData.coinId]).toFixed(4)}</p>;
            }
          },
          {
            title: "Average Price",
            headerStyle: {
              height: 10,
              fontWeight: "bold"
            },
            render: rowData => {
              return <p>{"$" + rowData.currentPrice.toFixed(4)}</p>;
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
          },
          {
            title: "Market Value",
            headerStyle: {
              height: 10,
              fontWeight: "bold"
            },

            type: "numeric",
            render: rowData => {
              var profit =
                +rowData.totalAmount *
                (+(
                  parseInt(-1, 10) +
                  (+coinLs[rowData.coinId] - +rowData.currentPrice) /
                    +rowData.currentPrice
                ) /
                  100);
              return <p>{"$" + (+rowData.totalAmount - -profit).toFixed(2)}</p>;
            }
          },
          {
            title: "Est. Profit",
            headerStyle: {
              height: 10,
              fontWeight: "bold"
            },
            type: "numeric",
            render: rowData => {
              var profitVal =
                +rowData.totalAmount *
                (+(
                  parseInt(-1, 10) +
                  (+coinLs[rowData.coinId] - +rowData.currentPrice) /
                    +rowData.currentPrice
                ) /
                  100);
              return (
                <p className={profitVal > 0 ? "green" : "red"}>
                  {profitVal.toFixed(2)}
                </p>
              );
            }
          },
          {
            title: "% Profit",
            headerStyle: {
              height: 10,
              fontWeight: "bold"
            },
            type: "numeric",
            render: rowData => {
              var profitPercent =
                parseInt(-1, 10) +
                (+coinLs[rowData.coinId] - +rowData.currentPrice) /
                  +rowData.currentPrice;
              return (
                <p className={profitPercent > 0 ? "green" : "red"}>
                  {profitPercent.toFixed(4)}%
                </p>
              );
            }
          }
        ]}
        data={state.data}
        editable={{}}
        options={{
          paging: false
        }}
      />
    </div>
  );
}
