import React, { useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { NavLink, useParams } from "react-router-dom";
import { Search } from "semantic-ui-react";

export default function MaterialTableDemo() {
  const { id } = useParams();

  const [state, setState] = React.useState({
    data: []
  });

  let coinList = {};
  const [coinLs, setCoinLs] = React.useState({});

  const reducer = objs => {
    return objs.reduce(function(o, cur) {
      var occurs = o.reduce(function(n, item, i) {
        return item.coinId === cur.coinId ? i : n;
      }, -1);
      if (occurs >= 0) {
        o[occurs].currentPrice =
          add(o[occurs].currentPrice, cur.currentPrice) / 2;
        o[occurs].totalAmount = add(o[occurs].totalAmount, cur.totalAmount);
        o[occurs].coinQuantity = add(o[occurs].coinQuantity, cur.coinQuantity);
      } else {
        var obj = {
          ...cur,
          price: Number(cur.currentPrice),
          coinQuantity: Number(cur.coinQuantity),
          totalAmount: Number(cur.totalAmount)
        };
        o = o.concat([obj]);
      }
      return o;
    }, []);
  };
  const add = (num1, num2) => {
    return Number(num1) + Number(num2);
  };
  const minus = (num1, num2) => {
    return Number(num1) - Number(num2);
  };
  const distinct = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  useEffect(() => {
    axios.get(`http://localhost:4000/transactions`).then(response => {
      let buyData = response.data.filter(data => data.transaction === "Buy");
      let sellData = response.data.filter(data => data.transaction === "Sell");
      var output = reducer(buyData);
      var outputAfterSell = reducer(sellData);
      var all = [...output, ...outputAfterSell];
      var overall = all.reduce(function(o, cur) {
        var occurs = o.reduce(function(n, item, i) {
          return item.coinId === cur.coinId ? i : n;
        }, -1);
        if (occurs >= 0) {
          o[occurs].currentPrice =
            add(o[occurs].currentPrice, cur.currentPrice) / 2;
          o[occurs].totalAmount = minus(o[occurs].totalAmount, cur.totalAmount);
          o[occurs].coinQuantity = minus(
            o[occurs].coinQuantity,
            cur.coinQuantity
          );
        } else {
          var obj = {
            ...cur,
            currentPrice: Number(cur.currentPrice),
            coinQuantity: Number(cur.coinQuantity),
            totalAmount: Number(cur.totalAmount)
          };
          o = o.concat([obj]);
        }
        return o;
      }, []);

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
          setState({
            ...state,
            data: overall
          });
        });
      };
    });
  }, [id]);

  const gainLoss = (priceSold, current) => {
    return (Number(priceSold) - Number(current)) / Number(current);
  };

  return (
    <div
      style={{
        overflowY: "scroll"
      }}
    >
      <MaterialTable
        style={{
          minHeight: "50vh",
          maxHeight: "50vh",
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
                  <p
                    style={{
                      textTransform: "uppercase"
                    }}
                  >
                    {rowData.coin}
                  </p>
                </div>
              </NavLink>
            )
          },
          {
            title: "Last Price (USD)",
            headerStyle: {
              height: 10,
              fontWeight: "bold"
            },
            field: "",
            render: rowData => {
              return <p> {(+coinLs[rowData.coinId]).toFixed(4)} </p>;
            }
          },
          {
            title: "Average Price (USD)",
            headerStyle: {
              height: 10,
              fontWeight: "bold"
            },
            render: rowData => {
              return <p> {rowData.currentPrice.toFixed(4)} </p>;
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
              return <p> {rowData.coinQuantity.toFixed(4)} </p>;
            }
          },
          {
            title: "Total Cost (USD)",
            headerStyle: {
              height: 10,
              fontWeight: "bold"
            },
            type: "numeric",
            render: rowData => {
              return <p> {rowData.totalAmount.toFixed(2)} </p>;
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
              var gainLosss = gainLoss(
                coinLs[rowData.coinId],
                rowData.currentPrice
              );
              var onePer = (Number(gainLosss) - Number(0.01)) * 100;
              var percentageProfit = Number(gainLosss) + Number(onePer);
              var profit =
                Number(rowData.totalAmount) *
                (Number(percentageProfit) / Number(100));
              var marketVal = Number(rowData.totalAmount) + Number(profit);
              return <p> {(+marketVal).toFixed(2)} </p>;
            }
          },
          {
            title: "Est. Profit (USD)",
            headerStyle: {
              height: 10,
              fontWeight: "bold"
            },
            type: "numeric",
            render: rowData => {
              var gainLosss = gainLoss(
                coinLs[rowData.coinId],
                rowData.currentPrice
              );
              var onePer = (Number(gainLosss) - Number(0.01)) * 100;
              var percentageProfit = Number(gainLosss) + Number(onePer);
              var profit =
                Number(rowData.totalAmount) *
                (Number(percentageProfit) / Number(100));
              return (
                <p className={profit > 0 ? "green" : "red"}>
                  {" "}
                  {(+profit).toFixed(2)}{" "}
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
              var gainLosss = gainLoss(
                coinLs[rowData.coinId],
                rowData.currentPrice
              );
              var onePer = (Number(gainLosss) - Number(0.01)) * 100;
              var percentageProfit = Number(gainLosss) + Number(onePer);
              return (
                <p className={percentageProfit > 0 ? "green" : "red"}>
                  {" "}
                  {(+percentageProfit).toFixed(4)} %
                </p>
              );
            }
          }
        ]}
        data={state.data}
        editable={{}}
        options={{
          paging: false,
          search: false
        }}
      />{" "}
    </div>
  );
}
