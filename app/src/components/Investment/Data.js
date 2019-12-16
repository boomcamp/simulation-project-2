import btcIcon from "../Images/bitcoin.webp";
import ethIcon from "../Images/ethereum.webp";
import liteIcon from "../Images/litecoin.webp";
import React from "react";
import {
  Span,
  Span2,
  Img,
  blue,
  red,
  green,
  CoinName,
  ImgCont,
  arrow
} from "./Style";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";

const list = [
  {
    value: "bitcoin",
    label: "Bitcoin",
    unit: "btc",
    icon: btcIcon
  },
  { value: "ethereum", label: "Ethereum", unit: "eth", icon: ethIcon },
  { value: "litecoin", label: "Litecoin", unit: "ltc", icon: liteIcon }
];
const table2 = [
  {
    title: "Coin",
    field: "crypto.id",
    render: rowData => (
      <Link to={`/coins/${rowData.crypto.id}`}>
        <CoinName data-tip={rowData.crypto.id}>
          <ImgCont>
            <Img src={rowData.crypto.img} />
          </ImgCont>
          <Span>{rowData.crypto.id}</Span>
        </CoinName>
        <ReactTooltip />
      </Link>
    )
  },
  {
    title: "Price",
    field: "price",
    render: rowData => (
      <span style={blue}>
        ${rowData.price ? Number(rowData.price.toFixed(3)) : 0}
      </span>
    )
  },
  {
    title: "Current Price",
    field: "currentPrice",
    render: rowData => (
      <React.Fragment>
        <span
          style={
            rowData.currentPrice > rowData.price
              ? green
              : rowData.currentPrice === rowData.price
              ? blue
              : red
          }
        >
          ${rowData.currentPrice ? Number(rowData.currentPrice.toFixed(3)) : 0}
          {rowData.currentPrice > rowData.price ? (
            <FaArrowAltCircleUp style={arrow} />
          ) : rowData.currentPrice < rowData.price ? (
            <FaArrowAltCircleDown style={arrow} />
          ) : (
            ""
          )}
        </span>
      </React.Fragment>
    )
  },
  {
    title: "Amount Sold",
    field: "amountSold",
    render: rowData => (
      <Span2>
        {rowData.amountSold ? Number(rowData.amountSold.toFixed(9)) : 0}{" "}
        {rowData.crypto.unit ? rowData.crypto.unit : ""}
      </Span2>
    )
  },
  {
    title: "Profit/Loss",
    field: "profit",
    render: rowData => (
      <span
        style={rowData.profit > 0 ? green : rowData.profit < 0 ? red : blue}
      >
        ${rowData.profit ? Number(rowData.profit.toFixed(3)) : 0}
        {rowData.profit > 0 ? (
          <FaArrowAltCircleUp style={arrow} />
        ) : rowData.profit < 0 ? (
          <FaArrowAltCircleDown style={arrow} />
        ) : (
          ""
        )}
      </span>
    )
  },
  {
    title: "Last Transaction",
    field: "dateSold",
    render: rowData => <span style={blue}>{rowData.dateSold}</span>
  }
];
const tempDate = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit"
}).format(Date.now());

export { list, table2, tempDate };
