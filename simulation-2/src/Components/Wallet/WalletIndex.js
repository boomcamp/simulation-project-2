import React, {useState, useEffect} from 'react'
import ProfitLoss from './ProfitLoss'
import GraphTracking from './GraphTracking'
import CryptoList from './CryptoList'
import SellIndex from './Sell/SellIndex'

export default function WalletIndex(props) {

    const [state, setState] = useState({
        UserHasData : false,
        coin_click_ontracker: ''    
    });

    const selected = (data) =>{
        if( data.target.getAttribute('data-index') &&  data.target.getAttribute('data-transactionid') && data){
            setState({coin_click_ontracker: data.target.getAttribute('data-index'), transaction_id: data.target.getAttribute('data-transactionid')})
        }
    }

    return (
        <>
            <div style={{position:'fixed',top:'0',right:'0', width:'100%', height:'100vh', background:'#032440', zIndex:'-1'}}/>
            <div className='wallet-component-container' style={{display:'flex',justifyContent:'start',alignItems:'start'}}>
                <div>
                    <ProfitLoss/>
                    <CryptoList selectedpass={selected}/>    
                </div>
                {
                    state.coin_click_ontracker?<SellIndex SelectedCoinData={state}/>:''
                }
                    {/* <SellIndex SelectedCoinData={state}/> */}
            </div>
            {/* <GraphTracking userdata={state.UserHasData}/> */}
        </>
    )
}

