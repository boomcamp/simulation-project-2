import React, {useState, useEffect, useRef} from 'react'
import Axios from 'axios';

// re-net Amount invested

export default function ProfitLoss() {

    const [netInvestment, setNetInvestment] = useState();
    const [amountInvestedTotal, setAIT] = useState();
    const [netInvestmentgainloss, setNetInvestmentgainloss] = useState();

    const [state, setState] = useState({
        total: {
            amount_invested: 19.69,
            profit: 15.66,
            loss: 0,
            isGain: true,
        }
    });

    useEffect(()=>{
        Axios.get('http://localhost:4000/transactions')
        .then(data=>{
            netInvestmentCalc(data.data);
        })
        .catch(e=>{
           console.log(e)
        })

        Axios.get('http://localhost:4000/selltransactions')
        .then(data=>{
            netgainloss(data.data)
        })  
        .catch(e=>{
            console.log(e)
        })

    },[])

    const netgainloss = (data) => {
        setNetInvestmentgainloss(data)
    }

    const netInvestmentCalc = (data) => {
        setNetInvestment(data)
    }

    let total = 0;

    if(netInvestment){
        netInvestment.map(data=>{
            console.log(data.BuyRef.amount_bought_usd)
            if(data.BuyRef.Crypto_coin_bought === 0){
                total = total + data.BuyRef.amount_bought_usd;
            }else{
                total = total + (data.BuyRef.price_from_buying * data.BuyRef.Crypto_coin_bought)
            }
        })
    }

    let gain_loss = 0;

    if(netInvestmentgainloss){
        netInvestmentgainloss.map(data=>{
            return gain_loss += data.net_amount_gain_loss;
        })
    }

    return (
        <>  
            <div className='tamount-tracker-container' style={tamount_tracker_container}>
                <div className='tamount-invested-container' style={tamount_invested_container}>
                    <p className='tamount-invested-main'> NET AMOUNT INVESTED</p>
    <h1 className='tamount-invested-value' style={tamount_invested}>{
        total.toFixed(3)
    }(USD)</h1>
                </div>
                <div className='profit-loss-container' style={profit_loss_container}>
                    <p className='tamount-invested-main'> NET PROFIT/LOSS</p>   
                    <h1 className='profit-loss-state' style={profit_loss_state}> {gain_loss.toFixed(3)} </h1>
                </div>  
            </div>
        </>
    )
}


const tamount_tracker_container = {
    width: '360px',
    margin: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    background: 'rgb(20, 57, 89)',
    color: 'white',
}   

const tamount_invested = {
    marginTop:'20px'
}


const profit_loss_container = {
    marginTop:'20px',
    marginBottom: '35px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
}

const tamount_invested_container = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop:'35px'
}

const profit_loss_state ={
    marginTop: '20px'
}