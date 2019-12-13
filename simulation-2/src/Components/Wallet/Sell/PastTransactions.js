import React,{useEffect, useState} from 'react'
import Axios from 'axios'

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

    }, [])

    const stateinput = (data) =>{
        setState(data)
    }
    let coinref = [];

    if(state){
        coinref = state.filter(data=>{
            return data.coin_id === props.CoinData.coin_click_ontracker
        })
        console.log(coinref)
    }

    return (
        <div className='past-transaction-container' style={{color:'white'}}>
            <div style={cryptocoinContainer}>
                <div className='cryptocoin-sold' style={{width:'200px', marginLeft: '10px'}} data-transactionId={props.transactionId} data-index={props.coinid}>
                    COIN SOLD
                </div>

                <div className='cryptocoin-price-date-sold' style={{width:'200px'}} data-transactionId={props.transactionId} data-index={props.coinid}>
                    PRICE FROM DATE SOLD
                </div>

                <div className='cryptocoin-price-date-sold' style={{width:'200px'}} data-transactionId={props.transactionId} data-index={props.coinid}>
                    AMOUNT GAIN / LOSS
                </div>

                <div className='gen-profit-loss' data-transactionId={props.transactionId} style={{width:'100px'}} data-index={props.coinid}>
                    {''}
                </div>
            </div>
                {
                    coinref?coinref.map(coin=>{
                        return <> 
                            <div className='cryptocoin-container'  style={cryptocoinContainer} data-transactionId={props.transactionId} data-index={props.coinid} onClick={props.selectedpass}>
                                <div className='cryptocoin-sold' style={{width:'100px', marginLeft: '10px'}} data-transactionId={props.transactionId} data-index={props.coinid}>
                                    {coin.number_of_ccoin_sold}
                                </div>

                                <div className='cryptocoin-price-date-sold' style={{width:'100px'}} data-transactionId={props.transactionId} data-index={props.coinid}>
                                    {coin.price_from_date_sold.toFixed(2)}
                                </div>

                                <div className='cryptocoin-price-date-sold' style={{width:'100px'}} data-transactionId={props.transactionId} data-index={props.coinid}>
                                    {coin.net_amount_gain_loss.toFixed(2)}
                                </div>

                                <div className='gen-profit-loss'  data-transactionId={props.transactionId} style={coin.net_amount_gain_loss<0?loss:profit} data-index={props.coinid}>
                                    {coin.net_amount_gain_loss<0?'LOSS':'GAIN'}
                                </div>
                            </div>
                        </>
                    }):''
                }
            {/* </div> */}
        </div>
    )
}

const tablestyle={
    postion: 'relative'

}

const cryptocoinContainer={
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // flexDirection: 'column',
    margin: '10px',
    padding: '10px 0',
    border: '1px #032440 solid',
    cursor: 'pointer',
    ':hover' : {
        border: '1px white solid',
    }
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
    marginRight: '10px'
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
    marginRight: '10px'
}