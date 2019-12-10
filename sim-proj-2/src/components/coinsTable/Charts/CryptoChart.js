import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Label} from 'recharts';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CustomizedXAxisTick from '../CustomizedXAxisTick'
import ChangesTable from './ChangesTable'
import axios from 'axios'

export default function CryptoChart({id}){
  const [percentage, setPercentage] = useState({ oneH: 0, oneD: 0, oneW: 0, twoW: 0, oneM: 0, oneY: 0});
  const [data, setData] = useState();
  const [history, setHistory] = useState("1");

  useEffect(() => {
    let isCancelled = false;
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${history}`)
      .then(res => {
        let temp=[]
          res.data.prices.map(price => {
            return temp.push({  date: (history === "1" || history === null) ? new Date(price[0]).toLocaleTimeString("en-US") : new Date(price[0]).toLocaleDateString("en-US") , 
                                price: price[1], 
                            })
          })
        if (!isCancelled)
          setData(temp)
      })

    axios
      .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=${id}&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C1y`)
      .then(res => {   
        if (!isCancelled)       
          setPercentage({ oneH: Math.round(res.data[0].price_change_percentage_1h_in_currency * 100) / 100 , 
                          oneD: Math.round(res.data[0].price_change_percentage_24h_in_currency * 100) / 100 , 
                          oneW: Math.round(res.data[0].price_change_percentage_7d_in_currency * 100) / 100 , 
                          twoW: Math.round(res.data[0].price_change_percentage_14d_in_currency * 100) / 100 , 
                          oneM: Math.round(res.data[0].price_change_percentage_30d_in_currency * 100) / 100 , 
                          oneY: Math.round(res.data[0].price_change_percentage_1y_in_currency * 100) / 100  
          })
      })
    return () => { isCancelled = true; };

  }, [id, history])

  return (
    <div style={{display:`flex`}}>
      <div>
          <ChangesTable percentage={percentage}/>
          
          <ToggleButtonGroup
              style={{margin:`30px 0 0 280px`}}
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
            width={950}
            height={300}
            data={data}
            margin={{ top: 10, right: 30, left: 20, bottom: 50,}}
          >
            <defs>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={1}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.3}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis type="number" domain={['auto', 'auto']} >
              <Label angle={270} position="left" style={{ textAnchor: 'middle' }} >
                  Price ($)
              </Label>
            </YAxis>
            <XAxis dataKey="date" tick={<CustomizedXAxisTick/>} />
            <Tooltip />
            {/* <Legend /> */}
            <Area type="monotone" dataKey="price" stroke="#82ca9d" fill="url(#colorPv)" dot={false} strokeWidth="2" />
          </AreaChart>
      </div>

      <Table aria-label="simple table">
          <TableHead>
              <TableRow>
                  <TableCell>Quick Stats</TableCell>
              </TableRow>
          </TableHead>

          <TableBody>
              <TableRow>
                  <TableCell align="">sample</TableCell>
              </TableRow>
              <TableRow>
                  <TableCell align="">sample</TableCell>
              </TableRow>
              <TableRow>
                  <TableCell align="">sample</TableCell>
              </TableRow>
          </TableBody>
      </Table>
    </div>
  );
}