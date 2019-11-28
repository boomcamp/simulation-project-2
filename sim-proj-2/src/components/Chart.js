import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Label} from 'recharts';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import axios from 'axios'


function CustomizedXAxisTick ({x, y, payload}) {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
      </g>
    );
 };

export default function Chart({id}){
  const [data, setData] = useState();
  const [history, setHistory] = useState("1");

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${history}`)
      .then(res => {
        let temp=[]
          res.data.prices.map(price => {
            return temp.push({  date: (history === "1") ? new Date(price[0]).toLocaleTimeString("en-US") : new Date(price[0]).toLocaleDateString("en-US") , 
                                price: price[1], 
                            })
          })
        setData(temp)
      })

    return () => { };
  }, [id, history])

  return (
    <React.Fragment>
      <ToggleButtonGroup
          style={{display:`flex`, justifyContent:`center`, marginTop:`30px`}}
          value={history}
          exclusive
          onChange={(e, newDate) => setHistory(newDate)}
        >
          <ToggleButton value="1" aria-label="1 day"> 24 Hours </ToggleButton>
          <ToggleButton value="7" aria-label="1 week"> 1 Week </ToggleButton>
          <ToggleButton value="30" aria-label="1 month"> 1 Month </ToggleButton>
          <ToggleButton value="180" aria-label="6 months"> 6 Months </ToggleButton>
          <ToggleButton value="365" aria-label="1 year"> 1 Year </ToggleButton>
          <ToggleButton value="max" aria-label="max"> Max </ToggleButton>
      </ToggleButtonGroup>

      <LineChart  
        style={{margin: `30px 0`}}
        width={1200}
        height={300}
        data={data}
        margin={{ top: 10, right: 30, left: 20, bottom: 50,}}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis type="number" domain={['auto', 'auto']}>
          <Label angle={270} position="left" style={{ textAnchor: 'middle' }}>
              Price ($)
          </Label>
        </YAxis>
        <XAxis dataKey="date" tick={<CustomizedXAxisTick/>} />
        <Tooltip />
        {/* <Legend /> */}
        <Line type="monotone" dataKey="price" stroke="#82ca9d" dot={false} strokeWidth="2" />
      </LineChart>
    </React.Fragment>
  );
}