import React, { PureComponent, useEffect, useState } from 'react';
import {GetDetailsView} from '../API/API';
import DVHeader from './DVHeader';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';


export default function DetailsView(props) {

    const [coinData, setCoinData] = useState();

    useEffect(() => {
        GetDetailsView(props.DataRef.id, '24h')
            .then(data=>{priceDataProcess(data.data.prices)})
            .catch(e=>console.log(e));
    }, [])

    const priceDataProcess = (data) => {
        let pdata = [];
        data.map(val=>{
            
            pdata.push({
                name : convertUnix(val[0], 'day').toString(),
                value: val[1].toFixed(5)
            })
        })

        setCoinData(pdata);
    }

    const convertUnix = (unix, type) => {
        let dateObj = new Date(unix * 1000); 
        // let utcString = dateObj.toUTCString(); 
        switch(type){
            case 'day':
                let mins = dateObj.getMinutes().toString().length === 1? '0'+ dateObj.getMinutes(): dateObj.getMinutes();
                dateObj = dateObj.getHours() + ':' + mins
                break;

            case 'week':

                break;

            case 'month':

                break;

            case 'year':
                    break
            default:
                break;
        }

        return dateObj;
    }

    const chartTime = (e) => {
        let ref = e.target.getAttribute('data-time');

        let newbtn = [];
        
        buttongrp.map(btn=>{
            let nbtn = Object.assign({}, btn);

            nbtn = {
                ...nbtn, 
                props:{
                    ...props,
                    className: btn.props.className.replace(' selected', '')
                }
            }
            // let data = btn.props.className.replace(' selected', '');
            newbtn.push(nbtn)
        })

        setButtonGrp(newbtn);
        
        e.target.classList.contains('selected')? e.target.classList.remove('selected') : e.target.classList.add('selected')

        // e.target.classList.add('selected')
    }

    const [buttongrp, setButtonGrp] = useState([   
        <button className='chart-control selected' data-time='hour' data-time='hour' onClick={chartTime}>
                1 Hour
        </button>,
        <button className='chart-control day' data-time='day' data-time='day' onClick={chartTime}>
                24 Hours
        </button>,
        <button className='chart-control week' data-time='week' data-time='week' onClick={chartTime}>
                1 Week
        </button>,
        <button className='chart-control month' data-time='month' onClick={chartTime} data-time='month' onClick={chartTime}>
                1 Month
        </button>,
        <button className='chart-control smonth' data-time='smonth' data-time='smonth' onClick={chartTime}>
                6 Month
        </button>,
        <button className='chart-control year' data-time='year' data-time='year' onClick={chartTime}>
                1 Year
        </button>
    ])
        

    return (
        
        <div className='details-view-container'>

            <DVHeader DataRef={props.DataRef}/>
            
            <div className='chart-container'>
                <LineChart width={window.innerWidth} height={300} data={coinData}
                margin={{ top: 20, right: 90, left: 20, bottom: 5 }} >
                    <CartesianGrid vertical={false} y={[0]} x={[0]}  
                    strokeDasharray="10 3" />
                    <XAxis minTickGap={30} padding={{ left: 10 }} dataKey="name" />
                    <YAxis  domain={['auto', 'auto']}  />
                    <Tooltip />
                    {/* <Legend /> */}
                    <Line isAnimationActive={true} dot={false} type="monotone" dataKey="value" stroke="#143D73" />
                    {/* <Line type="monotone" dataKey="aa" stroke="#82ca9d" /> */}
                </LineChart>
            </div>

            <div className='chart-control-container'>
                {
                    buttongrp
                }
            </div>
        </div>

       
    )
}