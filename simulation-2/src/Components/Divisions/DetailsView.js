    import React, { PureComponent, useEffect, useState } from 'react';
    import {GetDetailsView} from '../API/API';
    import DVHeader from './DVHeader';

    import ToggleButton from '@material-ui/lab/ToggleButton';
    import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

    import {
        AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
      } from 'recharts';

   function CustomizedAxisTick({x, y, stroke, payload}){
        return (
            <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} style={{fontSize:'0.7em'}} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
          </g>)
    }

    export default function DetailsView(props) {

        const [coinData, setCoinData] = useState();
        const [duration, setDuration] = useState(1);
        const [timeformat, setTformat] = useState('');

        useEffect(() => {
            console.log(props.DataRef)
            GetDetailsView(props.DataRef.id, '1')
                .then(data=>{priceDataProcess(data.data.prices, '1')})
                .catch(e=>console.log(e));
        }, [])

        const addZero = (time) => {
            return time < 10 ? '0'+time:time
        }

        let format = '';
        function formattime(time){
            format = time > 12 ? 'am' : 'pm';
            // setTformat(format);
            return time % 12
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

        const handleDuration = (event, time) => {

            setDuration(time);

            GetDetailsView(props.DataRef.id,time)
                .then(data=>{priceDataProcess(data.data.prices, time)})
                .catch(e=>console.log(e));

            if(!time)
                return 1
        };

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

        return (
            
            <div className='details-view-container' 
                style={{display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'}}>

                <DVHeader DataRef={props.DataRef}/>
                
                {/* <div className='chart-container'>
                    <LineChart width={1200} height={300} data={coinData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis domain={['auto', 'auto']}  />
                        <Tooltip />
                        <Line isAnimationActive={true} dot={false} type="monotone" dataKey="value" stroke="#143D73" />
                    </LineChart>
                </div> */}

                <div className='chart-2-container' style={{margin: '0 auto'}}>
                    <AreaChart width={1500} height={500} data={coinData}
                    margin={{ top: 100, right: 40, left: 40, bottom: 100 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#143D73" stopOpacity={0.9}/>
                        <stop offset="95%" stopColor="#143D73" stopOpacity={0.68}/>
                        </linearGradient>
                    </defs>
                    <XAxis tick={<CustomizedAxisTick/>} dataKey="time" />
                    <YAxis domain={['auto', 'auto']} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#143959" fillOpacity={1} fill="url(#colorUv)" />
                    </AreaChart>
                </div>

                <ToggleButtonGroup
                    value={duration}
                    exclusive
                    onChange={handleDuration}
                    aria-label="text duration"
                >
                    <ToggleButton value="1" aria-label="centered" selected={(duration == null || duration == 1) ? true : false}>
                        24 Hours
                    </ToggleButton>
                    <ToggleButton value="7" aria-label="right aligned">
                        1 Week  
                    </ToggleButton>
                    <ToggleButton value="30" aria-label="justified">
                        1 Month
                    </ToggleButton>
                    <ToggleButton value="180" aria-label="justified">
                        6 Months
                    </ToggleButton>
                    <ToggleButton value="365" aria-label="justified">
                        1 Year
                    </ToggleButton>
                    <ToggleButton value="max" aria-label="justified">
                        All Time
                    </ToggleButton>
                </ToggleButtonGroup>

            </div>
        )
    }