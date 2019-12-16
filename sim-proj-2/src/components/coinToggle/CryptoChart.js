import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Label} from 'recharts';
import CustomizedXAxisTick from './CustomizedXAxisTick'

export default function CryptoChart({data}) {
    return (
        <AreaChart  
            style={{margin: `30px 0`}}
            width={1200}
            height={300}
            data={data}
            margin={{ top: 10, right: 30, left: 50, bottom: 35,}}
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
    )
}
