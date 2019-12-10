import React from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
  ResponsiveContainer
} from "recharts";
import { Div, Cont } from "./Style";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { days } from "./Data";

export default class Chart extends React.Component {
  render() {
    const { data, active, currency, handleDays } = this.props;
    return (
      <Div>
        <Cont>
          <ButtonGroup>
            {days.map(x => (
              <Button
                key={x.value}
                style={
                  active === x.value
                    ? { background: "#3f51b5", color: "white" }
                    : {}
                }
                onClick={() => handleDays(x.value)}
              >
                {x.name}
              </Button>
            ))}
          </ButtonGroup>
        </Cont>
        <ResponsiveContainer width="100%">
          <AreaChart data={data}>
            <Area
              type="monotone"
              dataKey="Price"
              fill="#3f51b5"
              stroke="#2b33a1"
              strokeWidth={2}
            />
            <CartesianGrid stroke="#ccc" vertical={false} />
            <XAxis dataKey="Date" />
            <YAxis
              domain={["auto", "auto"]}
              tickFormatter={label => `${currency.unit}${label}`}
            />
            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      </Div>
    );
  }
}
