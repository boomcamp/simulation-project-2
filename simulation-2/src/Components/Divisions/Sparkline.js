import React, { PureComponent, useEffect, useState } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  } from 'recharts';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

export default function Sparkline(props) {

    const [coinData, setCoinData] = useState();
    const [sparkColor, setSparkColor] = useState();

    useEffect(() => {
        let datacoin = [];
        let count = 0;

        props.sparkdata.map(data=>{
            datacoin.push({
                time: count,
                value: data
            })
            count++;
        })
        setCoinData(datacoin);

        setSparkColor(props.datasignal?'green':'#F20C1F')
    }, [])


    return (
        <div className='chart-2-container' styly={{width:'200px'}} >
                <AreaChart width={200} height={75} data={coinData}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} onClick={props.clicks}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={'#F20C1F'} stopOpacity={0.6}/>
                    <stop offset="95%" stopColor={'#F20C1F'} stopOpacity={0.6}/>
                    </linearGradient>

                    <linearGradient id="colorUl" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={'#C4F21D'} stopOpacity={0.6}/>
                    <stop offset="95%" stopColor={'#C4F21D'} stopOpacity={0.6}/>
                    </linearGradient>
                </defs>
                <XAxis axisLine={false} tick={false} dataKey="time" />
                <YAxis axisLine={false}  tick={false} domain={['auto', 'auto']} />
                <Area type="monotone" dataKey="value" stroke={sparkColor} fillOpacity={1} fill={props.datasignal? "url(#colorUl )": "url(#colorUv)"} />
                </AreaChart>
        </div>
    )
}
