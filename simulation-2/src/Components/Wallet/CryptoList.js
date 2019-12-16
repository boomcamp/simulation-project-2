import React,{useState, useEffect} from 'react'
import { height, textAlign, fontSize } from '@material-ui/system'
import InvestmentTracker from './InvestmentTracker'
import SearchForBuy from './SearchForBuy'
import axios from 'axios'
import {style} from 'glamor'


export default function CryptoList(props) {

    const [state, setState] = useState();

    useEffect(()=>{
        let data = [];

        (async()=>{
            const responce = await fetch('http://localhost:4000/transactions')
            const coinlist = await responce.json();
            if(coinlist){
                for(let coin of coinlist){
                    if(typeof coin.coinRef !== 'undefined' && coin.BuyRef.Crypto_coin_bought){

                        const coinmarketdata = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin.coinRef.id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
    
                        const coindata = await coinmarketdata.json()
                        
                        data.push({...coindata, transaction_id:coin.id})
                    }
                }
            }
            setState(data)
        })()
    },[state])

    const [isBuying, setBuying] = useState(false)
    const [toggleInvest, setInvest] = useState(true)
   
    const toggle = () => {
        setInvest(!toggleInvest)
        setBuying(!isBuying)
        console.log('toggle')
    }

    return (
        <div className='list-container-container' style={investment_container}>
            <div className='list-container-title-actions' style={mainText}>
                <div className='component-container-title'>Investment Tracker</div>
            </div>
            <div className='list-table-container' style={tableContainer}>
                {
                    toggleInvest?<div className='buy-action-btn' {...buybtn} onClick={()=>{setBuying(!isBuying);setInvest(false)}}>CLICK TO INVEST</div>:''
                }
                {
                    isBuying?<><SearchForBuy toggle={()=>toggle()}/><div className='buy-action-btn' {...buybtn} onClick={()=>toggle()}>CANCEL</div></>:''
                }
                <div className='cryptocoin-container'  style={cryptocoinContainer} data-transactionid={props.transactionId} data-index={props.coinid} onClick={props.selectedpass}>
                    <div className='cryptocoin-name' style={{marginLeft: '10px', textAlign:'center'}} data-transactionid={props.transactionId} data-index={props.coinid}>INDEX(PERCETAGE GAIN)</div>
                </div>
                {

                    state?state.map((coin)=>(<InvestmentTracker key={coin.transaction_id} transactionId={coin.transaction_id} index={coin[0].symbol}  percentage={coin[0].price_change_percentage_24h.toFixed(2)} selectedpass={props.selectedpass} coinid={coin[0].id}/>)):''
                }
                
            </div>
        </div>
    )
}

const cryptocoinContainer= {
    display: 'flex',
    justifyContent: 'center',
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

const buybtn = style({
    color: 'white',
    padding: '10px',
    background: 'rgb(22, 41, 66)',
    margin: '10px',
    textAlign: 'center',
    cursor: 'pointer',
    ':hover' : {
        background: 'rgb(12, 11, 123)',
    }
})  

const investment_container = {
    width: '360px',
    margin: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    background: 'rgb(20, 57, 89)',
    color: 'white',
}

const mainText = {
    margin: '10px 10px',
    border: '1px #032440 solid',
    width: '340px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 0'
}

const tableContainer = {
    border: '1px #032440 solid',
    width:  '340px',
    height: '100%',
    marginBottom: '10px'
}

