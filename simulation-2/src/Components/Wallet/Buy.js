import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { sha256 } from 'js-sha256';

export default function Buy(props) {

    const buy_coin = (id, buyAmount, valueCurrent, ccoinBought) => {
        
        console.log(id)

        axios.post(`http://localhost:4000/transactions`,{
            id: sha256(new Date()+buyAmount+valueCurrent+ccoinBought),
            coinRef:{
                id: id
            },
            BuyRef:{
                price_from_buying: valueCurrent,
                amount_bought_usd: buyAmount,
                Crypto_coin_bought: ccoinBought
            },
            timeRef: new Date()
        }).then(data=>{
            return data
        }).catch(e=>{
            console.log(e)
        })
        
    }

    return (
        <>
            <div className='buy-action-btn' onClick={()=>{buy_coin(props.selected, props.BuyAmount, props.CoinValue, props.NumOfCoin);props.toggle()}} style={buybtn}>+ BUY COIN</div>
        </>
    )
}

const buybtn = {
    color: 'white',
    padding: '10px',
    background: 'rgb(22, 41, 66)',
    margin: '10px',
    textAlign: 'center',
    cursor: 'pointer'
}
