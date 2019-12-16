import React,{useEffect, useState} from 'react'
import Axios from 'axios'
import { borderLeft } from '@material-ui/system';

export default function PastTransactions(props) {

    const [state, setState] = useState();

    useEffect(() => {

        // console.log(props.CoinData.coin_click_ontracker)

        Axios.get('http://localhost:4000/selltransactions')
        .then(data=>{
            stateinput(data.data)
        })  
        .catch(e=>{
            console.log(e)
        })

    }, [state])

    const stateinput = (data) =>{
        setState(data)
    }
    
    let coinref = [];

    if(state){
        coinref = state.filter(data=>{
            return data.coin_id === props.CoinData.coin_click_ontracker
        })
    }

    return (
        <>
        {
            coinref.length>0?<table style={headerTable} className='past-transaction-container'>
            <thead>
            <tr style={cryptocoinContainer}>
                <th  className='cryptocoin-sold' style={{width:'200px', padding:'10px'}}  data-transactionId={props.transactionId} data-index={props.coinid}>
                    TRANSACTION DATE
                </th>

                <th className='cryptocoin-sold' style={{width:'200px'}}  data-transactionId={props.transactionId} data-index={props.coinid}>
                    COIN SOLD
                </th>

                <th className='cryptocoin-price-date-sold' style={{width:'200px'}}  data-transactionId={props.transactionId} data-index={props.coinid}>
                    PRICE FROM DATE SOLD
                </th>

                <th  className='cryptocoin-price-date-sold' style={{width:'200px'}}  data-transactionId={props.transactionId} data-index={props.coinid}>
                    AMOUNT GAIN / LOSS
                </th>

                <th  className='gen-profit-loss' style={{width:'200px'}} data-transactionId={props.transactionId}  data-index={props.coinid}>
                    MARKER
                </th>
            </tr>
            </thead>
                <tbody>
                {
                   coinref.map(coin=>{
                        return <tr  key={props.coinid}  style={cryptocoinContainer} className='cryptocoin-container' data-transactionId={props.transactionId} data-index={props.coinid} onClick={props.selectedpass}>
                                <td style={tdata}  className='cryptocoin-date-of-transaction'  data-transactionid={props.transactionId} data-index={props.coinid}>
                                    {(new Date(coin.timeRef).getMonth()+1)+'/'+new Date(coin.timeRef).getDate()+'/'+new Date(coin.timeRef).getFullYear()+' ('+new Date(coin.timeRef).getHours()+':'+new Date(coin.timeRef).getMinutes()+')'}
                                </td>

                                <td style={tdata} className='cryptocoin-sold'  data-transactionid={props.transactionId} data-index={props.coinid}>
                                    {coin.number_of_ccoin_sold}
                                </td>

                                <td style={tdata} className='cryptocoin-price-date-sold' data-transactionid={props.transactionId} data-index={props.coinid}>
                                    {coin.price_from_date_sold}
                                </td>

                                <td style={tdata} className='cryptocoin-price-date-sold'  data-transactionid={props.transactionId} data-index={props.coinid}>
                                    {coin.net_amount_gain_loss}
                                </td>

                                <td>
                                     <div  className='gen-profit-loss'  data-transactionid={props.transactionId} style={coin.net_amount_gain_loss<0?loss:profit} data-index={props.coinid}>
                                    {coin.net_amount_gain_loss<0?'LOSS':'GAIN'}
                                    </div>
                                </td>
                            </tr>
                    })
                }
            </tbody>
        </table>:<div style={{textAlign:'center', padding:'10px', marginBottom:'10px', color:'white'}}>data not available yet</div>
        }
        </>
        
    )
}

const tablestyle={
    postion: 'relative'

}

const cryptocoinContainer={
    // display: 'table',
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'column',
    margin: '10px',
    color: 'white',
    textAlign: 'center',
    // padding: '10px 0',
    border: '1px solid rgb(3, 36, 64)',
    cursor: 'pointer',
    borderLeft: 'none',
    borderRight: 'none'
}

const headerTable = {
    borderCollapse: 'collapse',
    margin: '10px',
    border: '1px solid rgb(3, 36, 64)',
}   

const tdata = {
    padding: '10px',
    textAlign: 'center'
}

const profit = {
    width: '50px',
    // height: '10px',
    color: 'white',
    background: 'green',
    textAlign: 'center',
    // borderRadius: '10px',
    fontSize: '0.8em',
    padding: '5px 0',
    // marginRight: '10px',
    // marginLeft: '50px'
    margin: '0 auto'
}

const loss = {
    width: '50px',
    // height: '10px',
    color: 'white',
    background: 'rgb(183, 0, 15)',
    textAlign: 'center',
    // borderRadius: '10px',
    fontSize: '0.8em',
    padding: '5px 0',
    // marginRight: '10px',
    // marginLeft: '50px'
    margin: '0 auto'
}