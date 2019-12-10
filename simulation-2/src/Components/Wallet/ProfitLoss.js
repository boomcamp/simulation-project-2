import React, {useState} from 'react'

export default function ProfitLoss() {

    const [state, setState] = useState({
        total: {
            amount_invested: 19.69,
            profit: 15.66,
            loss: 0,
            isGain: true,
        }
    });

    return (
        <>
            <div className='' style={{background: '#032440', width:'100%', height:'100vh', position:'fixed', zIndex:'-1', top:'0'}}>
            </div>

            <div className='tamount-tracker-container' style={tamount_tracker_container}>
                <div className='tamount-invested-container' style={tamount_invested_container}>
                    <p className='tamount-invested-main'> Amount Invested</p>
                    <h1 className='tamount-invested-value' style={tamount_invested}> {state.total.amount_invested} </h1>
                </div>
                <div className='profit-loss-container' style={profit_loss_container}>
                    <p className='tamount-invested-main'> Profit/Loss</p>   
                    <h1 className='profit-loss-state' style={profit_loss_state}> {state.total.isGain?state.total.profit:state.total.loss} </h1>
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
    // margin: '0 auto'
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