import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Label} from 'recharts';
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
  const [percentage, setPercentage] = useState();
  const [data, setData] = useState();
  const [history, setHistory] = useState("1");

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${history}`)
      .then(res => {
        let temp=[]
          res.data.prices.map(price => {
            return temp.push({  date: (history === "1" || history === null) ? new Date(price[0]).toLocaleTimeString("en-US") : new Date(price[0]).toLocaleDateString("en-US") , 
                                price: price[1], 
                            })
          })
        setData(temp)
      })

    axios
      .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=${id}&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C1y`)
      .then(res => {          
          setPercentage({ oneH: Math.round(res.data[0].price_change_percentage_1h_in_currency * 100) / 100 , 
                          oneD: Math.round(res.data[0].price_change_percentage_24h_in_currency * 100) / 100 , 
                          oneW: Math.round(res.data[0].price_change_percentage_7d_in_currency * 100) / 100 , 
                          twoW: Math.round(res.data[0].price_change_percentage_14d_in_currency * 100) / 100 , 
                          oneM: Math.round(res.data[0].price_change_percentage_30d_in_currency * 100) / 100 , 
                          oneY: Math.round(res.data[0].price_change_percentage_1y_in_currency * 100) / 100  
          })
      })
    return () => { };

  }, [id, history])

  return (
    <React.Fragment>
      <table className="price_change_percentage">
        <thead>
          <tr>
            <th className="day"> 1H </th>
            <th className="day"> 24H </th>
            <th className="day"> 7D </th>
            <th className="day"> 14D </th>
            <th className="day"> 30D </th>
            <th className="day"> 1Y </th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td className="percent"> {(percentage) ? percentage.oneH : null} </td>
              <td className="percent"> {(percentage) ? percentage.oneD : null} </td>
              <td className="percent"> {(percentage) ? percentage.oneW : null} </td>
              <td className="percent"> {(percentage) ? percentage.twoW : null} </td>
              <td className="percent"> {(percentage) ? percentage.oneM : null} </td>
              <td className="percent"> {(percentage) ? percentage.oneY : null} </td>
            </tr>
        </tbody>
      </table>

      <ToggleButtonGroup
          style={{display:`flex`, justifyContent:`center`, marginTop:`30px`}}
          value={history}
          exclusive
          onChange={(e, newDate) => setHistory(newDate)}
        >
          <ToggleButton value="1" aria-label="1 day" selected={(history === "1" || history === null) ? true : false }> 24 Hours </ToggleButton>
          <ToggleButton value="7" aria-label="1 week"> 1 Week </ToggleButton>
          <ToggleButton value="30" aria-label="1 month"> 1 Month </ToggleButton>
          <ToggleButton value="180" aria-label="6 months"> 6 Months </ToggleButton>
          <ToggleButton value="365" aria-label="1 year"> 1 Year </ToggleButton>
          <ToggleButton value="max" aria-label="max"> Max </ToggleButton>
      </ToggleButtonGroup>

      <AreaChart  
        style={{margin: `30px 0`}}
        width={1200}
        height={300}
        data={data}
        margin={{ top: 10, right: 30, left: 20, bottom: 50,}}
      >
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis type="number" domain={['auto', 'auto']}>
          <Label angle={270} position="left" style={{ textAnchor: 'middle' }}>
              Price ($)
          </Label>
        </YAxis>
        <XAxis dataKey="date" tick={<CustomizedXAxisTick/>} />
        <Tooltip />
        {/* <Legend /> */}
        <Area type="monotone" dataKey="price" stroke="#82ca9d" fill="url(#colorPv)" dot={false} strokeWidth="2" />
      </AreaChart>
    </React.Fragment>
  );
}