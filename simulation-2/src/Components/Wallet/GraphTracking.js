import React, {useState, useEffect} from 'react'
import ProfitLoss from './ProfitLoss'
import {GetDetailsView} from '../API/API'

import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  } from 'recharts';
import { relative } from 'path';

function CustomizedAxisTick({x, y, stroke, payload}){
    return (
        <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} style={{fontSize:'0.7em'}} textAnchor="end" fill="white" transform="rotate(-35)">{payload.value}</text>
        </g>)
}

function YCustomizedAxisTick({x, y, stroke, payload}){
    return (
        <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} style={{fontSize:'0.7em'}} textAnchor="end" fill="white">{payload.value}</text>
        </g>)
}

export default function GraphTracking(props) {

    const [coinData, setCoinData] = useState();

    useEffect(() => {
        // console.log(props.DataRef)
        if(!props.userdata){
            //will default to bitcoin
            // console.log(props.DataRef)
            GetDetailsView('bitcoin', '1')
                .then(data=>{priceDataProcess(data.data.prices, '1')})
                .catch(e=>console.log(e));
        }
    }, [])

    const priceDataProcess = (data, time) => {
        let pdata = [];

        data.map(val=>{
            pdata.push({
                time : convertUnix(val[0], time).toString(),
                value: val[1]
            })
        })
        setCoinData(pdata);
    }

    const convertUnix = (unix, type) => {
        let dateObj = '';

        switch(type){
            case '1':
                var hours =  addZero(formattime(Math.round((new Date(unix)).getHours())));
                var minutes = addZero(Math.round((new Date(unix)).getMinutes()));
                var seconds = addZero(Math.round((new Date(unix)).getSeconds()));
                dateObj = hours + ':' + minutes + ':' + seconds +' '+ format;
                break;
            case null:
                var hours =  addZero(formattime(Math.round((new Date(unix)).getHours())));
                var minutes = addZero(Math.round((new Date(unix)).getMinutes()));
                var seconds = addZero(Math.round((new Date(unix)).getSeconds()));
                dateObj = hours + ':' + minutes + ':' + seconds +' '+ format;
                break;
            default:
                var month = addZero(new Date(unix).getMonth() + 1)
                var date = addZero(Math.round(new Date(unix).getDate())) 
                var year = addZero(Math.round(new Date(unix).getFullYear())) 
                dateObj = month + '/' + date + '/' + year;
                break;
        }
        return dateObj;
    }

    const addZero = (time) => {
        return time < 10 ? '0'+time:time
    }

    let format = '';
        function formattime(time){
            format = time > 12 ? 'am' : 'pm';
            // setTformat(format);
            return time % 12
        }

    return (
        <>
             <div className='' style={{position:'absolute', top: '20px', left:'450px', }}>
            <AreaChart width={1000} height={370} data={coinData}
            margin={{ top: 0, right: 0, left: 0, bottom: 100 }}>
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(101, 17, 122)" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="rgb(101, 17, 122)" stopOpacity={0.3}/>
                </linearGradient>
            </defs>
            <XAxis tick={<CustomizedAxisTick/>} dataKey="time" />
            <YAxis tick={<YCustomizedAxisTick/>} domain={['auto', 'auto']} />
            <CartesianGrid strokeDasharray="0.5 1"/>
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="rgb(192, 3, 240)" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
        </div>
        </>
    )
}
