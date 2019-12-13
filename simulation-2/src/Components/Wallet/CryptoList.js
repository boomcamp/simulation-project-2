import React,{useState, useEffect} from 'react'
import { height, textAlign, fontSize } from '@material-ui/system'
import InvestmentTracker from './InvestmentTracker'
import SearchForBuy from './SearchForBuy'
import axios from 'axios'
import { tsConstructSignatureDeclaration } from '@babel/types'
import {GetDetail} from '../API/API'

let donesignal = false;

export default function CryptoList(props) {

    const [state, setState] = useState();


    const selected = (data) =>{
        // alert(data);
    }

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
            donesignal = true
        })()
    },[])


    // const ExpandUserTransactionsData = (data) => {

    //     let datastate = [];

    //     data.map(coin=>{
    //         GetDetail(coin.coinRef.id)
    //         .then(data=>{
    //             datastate.push({
    //                 symbol: data.data[0].symbol,
    //                 priceChangePercentage: data.data[0].price_change_percentage_24h
    //             })
    //         })
    //         .catch(e=>{
    //             console.log(e)
    //         })
    //     })
    //     setState(datastate)
    //     donesignal = true;
    //     return
    // }

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
                    toggleInvest?<div className='buy-action-btn' style={buybtn} onClick={()=>{setBuying(!isBuying);setInvest(false)}}>CLICK TO INVEST</div>:''
                }
                {
                    isBuying?<SearchForBuy toggle={()=>toggle()} selectedpass={selected}/>:''
                }
                {
                    state?state.map((coin)=>(<InvestmentTracker transactionId={coin.transaction_id} index={coin[0].symbol}  percentage={coin[0].price_change_percentage_24h.toFixed(2)} selectedpass={props.selectedpass} coinid={coin[0].id}/>)):''
                }
            </div>
        </div>
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

