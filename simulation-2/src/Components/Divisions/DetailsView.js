import React, { PureComponent, useEffect, useState } from 'react';
import {GetDetailsView} from '../API/API';
import DVHeader from './DVHeader';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

function chartTime(e){

    console.log(e)
    let ref = e.target.getAttribute('data-time');

    // e.target.classList.contains('selected')? e.target.classList.remove('selected') : e.target.classList.add('selected')

    // e.target.classList.add('selected')
}

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

    const [alignment, setAlignment] = React.useState('left');
    const [formats, setFormats] = React.useState(() => ['bold']);

    const handleAlignment = (event, time) => {
        GetDetailsView(props.DataRef.id,time)
            .then(data=>{priceDataProcess(data.data.prices)})
            .catch(e=>console.log(e));
    };

    console.log(alignment)

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
            
            <ToggleButtonGroup
                 value={alignment}
                 exclusive
                 onChange={handleAlignment}
                 aria-label="text alignment"
            >
                <ToggleButton value="1h" aria-label="left aligned">
                    1 Hour
                </ToggleButton>
                <ToggleButton value="24h" aria-label="centered">
                    24 Hours
                </ToggleButton>
                <ToggleButton value="7d" aria-label="right aligned">
                    1 Week  
                </ToggleButton>
                <ToggleButton value="30d" aria-label="justified">
                    1 Month
                </ToggleButton>
                <ToggleButton value="200d" aria-label="justified">
                    6 Months
                </ToggleButton>
                <ToggleButton value="1y" aria-label="justified">
                    1 Year
                </ToggleButton>
            </ToggleButtonGroup>
        </div>

       
    )
}