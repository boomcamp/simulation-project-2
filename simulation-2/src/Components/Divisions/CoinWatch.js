import React, { Fragment, useEffect} from 'react'
import MaterialTable from 'material-table';
import {Get, GetMarket} from '../API/API';
import Axios from 'axios';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {Redirect,Link} from 'react-router-dom';

import Sparkline from './Sparkline';



export default function CoinWatch(props) {

    const [state, setState] = React.useState({
        columns: [
                {
                     title: 'Rank', field: 'rank' },
                { title: 'Index', field: 'index', render: rowdata=>{return <h3 style={{color:'#143D73', textAlign:'center', margin:'0 auto'}} >{rowdata.index}</h3>}, headerStyle:{
                    width:'200px',
                    margin: '0 auto',
                    textAlign: 'center'
                }},

                { title: 'Name', field: 'coin', 
                render: rowdata=>{
                    return <div style={{display: 'flex', justifyContent:'flex-start', alignItems:'center' }}>
                            <img style={{width: '30px'}} src={rowdata.coin.image} alt={rowdata.coin.name} />
                            <p style={{marginLeft:'20px', color:'#143D73'}}>{rowdata.coin.name}</p>
                        </div>
                }, headerStyle:{
                    width:'200px',
                    margin: '0 auto',
                    textAlign: 'center'
                }},

                { title: 'Value(USD)', field: 'value', type: 'numeric', 
                    render: rowdata =>{
                    return <div style={{color:'#143D73'}}>{'$' + rowdata.value.current}</div>
                    },
                    customSort: (a,b) => a.value.current - b.value.current, headerStyle:{
                        width:'200px',
                        margin: '0 auto',
                        textAlign: 'center'
                    }
                },
                { title: '1H', field: 'onehour', type: 'numeric', render: rowdata=> {
                    return <span style={rowdata.onehour>0?{color:'green'}:{color:'#F20C1F'}}> {rowdata.onehour.toFixed(2)+'%'}</span>
                }},
                { title: '24H', field: 'oneday', type: 'numeric', render: rowdata=> {
                    return <span style={rowdata.oneday>0?{color:'green'}:{color:'#F20C1F'}}> {rowdata.oneday.toFixed(2)+'%'}</span>
                }},
                { title: '7DAYS', field: 'sevendays', type: 'numeric', render: rowdata=> {
                    return <span style={rowdata.sevendays>0?{color:'green'}:{color:'#F20C1F'}}> {rowdata.oneday.toFixed(2)+'%'} </span>
                } },
                { title: 'ATH%', field: 'pchange', type: 'numeric', render: rowdata=>{return <span style={{color:'#143D73', textAlign:'left'}} >{rowdata.pchange}</span>}},
                {title: 'Lasft 7 Days', field: 'sparkline',  type: 'numeric', render: rowdata=>{
                    return <Sparkline clicks={()=>props.click(rowdata)} style={{marginLeft:'-500px'}} datasignal={(rowdata.sevendays>0? true: false )} sparkdata={rowdata.sparkline}/>
                }, headerStyle:{
                    width:'200px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}
        ]
      });
    useEffect(() => {
        GetMarket()
        .then(data=>{
            let cdata = [];
            data.data.map(data=>{
                cdata.push({
                    id: data.id,
                    index: data.symbol.toUpperCase(),
                    coin: {
                        name: data.name,
                        image: data.image 
                    },
                    value: {
                        current: data.current_price,
                        changePercentage: data.price_change_percentage_24h
                    },
                    pchange: data.ath_change_percentage,
                    rank: data.market_cap_rank,
                    onehour: data.price_change_percentage_1h_in_currency?data.price_change_percentage_1h_in_currency:0,
                    oneday: data.price_change_percentage_24h_in_currency?data.price_change_percentage_24h_in_currency:0,
                    sevendays: data.price_change_percentage_7d_in_currency?data.price_change_percentage_7d_in_currency:0,
                    month: data.price_change_percentage_30d_in_currency?data.price_change_percentage_30d_in_currency:0,
                    smonth: data.price_change_percentage_200d_in_currency?data.price_change_percentage_200d_in_currency:0,
                    oneyear: data.price_change_percentage_1y_in_currency?data.price_change_percentage_1y_in_currency:0,
                    sparkline: data.sparkline_in_7d.price
                })
            });

            console.log(cdata)

            setState(prevState=>{
                return {...prevState, data: cdata}
            });
        })
        .catch(e=>{
            console.log(e)
        })
    }, [])

    return (
        <Fragment>
            <MaterialTable
                title='Crypto Watcher'
                columns={state.columns}
                data={state.data}
                // actions= {[{
                //     tooltip: 'Watch List',
                //     onClick: (event, rowData) => props.ChangeDashBoard(rowData)
                // }]}

                options={{
                    actionsColumnIndex: -1,
                    pageSize: 20
                    // selection: true,
                    // filtering: true
                    }}

                // components={{
                //     Action: props => (
                //     <VisibilityIcon onClick={(event) => props.action.onClick(event, props.data)}/>
                //     ),
                // }}
                />
        </Fragment>
    );
}
