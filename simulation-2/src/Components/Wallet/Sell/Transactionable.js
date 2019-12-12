import React, { useEffect, useState } from 'react'

export default function Transactionable(props) {

    const [state, setState] = useState()
    const [transactionState, setTransactionState] = useState()

    useEffect(()=>{
        // console.log(props.CoinData.coin_click_ontracker);
        (async()=>{
            const responce = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${props.CoinData.coin_click_ontracker}&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C30d%2C200d%2C1y`)

            const coin = await responce.json();

            setState({
                id: coin[0].id,
                name: coin[0].name,
                index: coin[0].symbol,
                image: coin[0].image,
                onehour: coin[0].price_change_percentage_1h_in_currency,
                oneday: coin[0].price_change_percentage_24h_in_currency,
                sevendays: coin[0].price_change_percentage_7d_in_currency,
                month: coin[0].price_change_percentage_30d_in_currency,
                smonth: coin[0].price_change_percentage_200d_in_currency,
                oneyear: coin[0].price_change_percentage_1y_in_currency,
                currentPrice: coin[0].current_price
            })
            console.log(coin);
            // console.log(props.CoinData.transaction_id)
            const transactiondata = await fetch(`http://localhost:4000/transactions/${props.CoinData.transaction_id}`)
            const data = await transactiondata.json();
            setTransactionState({
                id: data.id,
                coinRef: data.coinRef,
                buyref:{
                    ...data.BuyRef
                },
                // price_from_buying: data.price_from_buying,
                // amount_bought_usd: data.amount_bought_usd,
                // crypto_bougth: data.BuyRef.Crypto_coin_bought,
                timeRef: data.timeRef 
            });  
        })()

    },[props.CoinData.coin_click_ontracker,props.CoinData.transaction_id])

    const arrowcolor =(value)=>{
        // console.log(state)

        if(value < 0){
            return <div className='down' style={{borderBottomColor:'red'}}/>
        }
            return <div className='up' style={{borderBottomColor:'green'}}/>
    }

    const profit_loss_amount = (buyamunt, coinnum) => {
        return(buyamunt * coinnum) - (state.currentPrice * coinnum);
    }

    const profit_loss_percentage = (buyamunt, coinnum) => {
        return(buyamunt * coinnum)/(state.currentPrice * coinnum);
    }

    const net_amount_bought = (buyamunt, coinnum) => {
        return(buyamunt * coinnum);
    }

    return (
        // console.log(conso)
        <div className='transactionable-container'>
            {/* Display Coin Details */}    

                {state?<div className='coin-details-container' style={mainText}>

                {/* <div style={{position:'absolute',background:state?`url(${state.image}) no-repeat`:'', width: '200px', height:'200px',zIndex:'0', backgroundSize:'cover', opacity: '0.3'}}/> */}


                    <div className='coin-name'>{state.name}</div>


                    <div className='current-coin-status-containers' style={coin_stats_style}>
                        <div className='coin-status hour'>
                            <div className='coin-time-ref'>
                                1 Hour
                            </div>
                            <div className='coin-context'>
                                {arrowcolor(state.onehour.toFixed(2))}
                                {state.onehour.toFixed(2)}
                            </div>
                        </div>
                        <div className='coin-status day'>
                            <div className='coin-time-ref'>
                                24 Hour
                            </div>
                            <div className='coin-context'>
                                {arrowcolor(state.oneday.toFixed(2))}
                                {state.oneday.toFixed(2)}
                            </div>
                        </div>
                        <div className='coin-status week'>

                            <div className='coin-time-ref'>
                                1 Week
                            </div>
                            <div className='coin-context'>
                                {arrowcolor(state.sevendays.toFixed(2))}
                                {state.sevendays.toFixed(2)}
                            </div>
                        </div>
                        <div className='coin-status month'>

                        <div className='coin-status week'>
                            <div className='coin-time-ref'>
                                1 Month
                            </div>
                            <div className='coin-context'>
                                {arrowcolor(state.month.toFixed(2))}
                                {state.month.toFixed(2)}
                            </div>
                            </div>
                        </div>

                        <div className='coin-status smonth'>
                            <div className='coin-time-ref'>
                                6 Month
                            </div>
                            <div className='coin-context'>
                                {arrowcolor(state.smonth.toFixed(2))}
                                {state.smonth.toFixed(2)}
                            </div>
                        </div>
                        {state.oneyear?<div className='coin-status year'>
                            <div className='coin-time-ref'>
                                1 Year
                            </div>
                            <div className='coin-context'>
                                {state.oneyear?arrowcolor(state.oneyear.toFixed(2)):''}
                                {state.oneyear?state.oneyear.toFixed(2):''}
                            </div>
                        </div>:''}

                    </div>
                </div>:console.log('none')}
            {/* Display Current Coin and Investment History */}

                {
                    // console.log(transactionState?transactionState.buyref.Crypto_coin_bought:'')
                    transactionState?<div className="coin-current-investment-status-container">
                        <div className="coin-investment-summary" style={investmentStatsStlye}>
                            <div className="coin-status-container" style={{margin:'20px'}}>
                                <div className="title-main-coin" >COIN</div>
                                <div className="coin-number">{transactionState?transactionState.buyref.Crypto_coin_bought:''}</div>
                            </div>
                            <div>
                                <div className="title-main-buy">CURRENT VALUE(USD)</div>
                                <div className="coin-number">{state.currentPrice}</div>
                            </div>
                            <div>
                                <div className="title-main-buy">BOUGHT VALUE(USD)</div>
                                <div className="coin-number">{transactionState?transactionState.buyref.price_from_buying:''}</div>
                            </div>
                            <div style={{margin:'20px'}}>
                                <div className="title-main-buy">NET AMOUNT BOUGHT(USD)</div>
                                <div className="coin-number">{net_amount_bought(transactionState?transactionState.buyref.price_from_buying:'',transactionState?transactionState.buyref.Crypto_coin_bought:'')}</div>
                            </div>
                            <div style={{margin:'20px'}}>
                                <div className="title-main-buy">PROFIT/LOSS(%)</div>
                                <div className="coin-number">{profit_loss_percentage(transactionState?transactionState.buyref.price_from_buying:'',transactionState?transactionState.buyref.Crypto_coin_bought:'').toFixed(2) }</div>
                            </div>
                            <div style={{margin:'20px'}}>
                                <div className="title-main-buy">PROFIT/LOSS(USD)</div>
                                <div className="coin-number">{profit_loss_amount(transactionState?transactionState.buyref.price_from_buying:'',transactionState?transactionState.buyref.Crypto_coin_bought:'').toFixed(3) }</div>
                            </div>
                            
                        </div>

                        <div className='buy-action-btn' style={sellbtn}>SELL COIN</div>
                        
                    </div>:''

                    
                }
                

            {/* Add Action Buttons for Sell */}
        </div>
    )
}

const sellbtn = {
    color: 'white',
    padding: '10px',
    background: 'rgb(22, 41, 66)',
    margin: '10px',
    textAlign: 'center',
    cursor: 'pointer'
}


const coin_stats_style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:'9'
}

const mainText = {
    margin: '10px 10px',
    border: '1px #032440 solid',
    // width: '340px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 0',
    color: 'white',
    flexDirection: 'column',
}

const investmentStatsStlye = {
    margin: '10px 10px',
    border: '1px #032440 solid',
    // width: '340px',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '10px 0',
    color: 'white',
    // flexDirection: 'column',
}
