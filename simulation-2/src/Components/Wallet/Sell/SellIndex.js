import React, { useEffect } from 'react'
import { height } from '@material-ui/system'
import Transactionable from './Transactionable';
import PastTransactions from './PastTransactions'

export default function SellIndex(props) {

    useEffect(()=>{
        // console.log(props.SelectedCoinData)
    })

    return (
        <div className='sell-index-container' style={sellIndexContainerStyle}>
            {/* Current Atainable Transaction */}
                <Transactionable CoinData={props.SelectedCoinData?props.SelectedCoinData:'bitcoin'}/>
                <div className='transaction-history-title' style={mainText}>Transaction History</div>
            {/* Past Transaction History */}
                <PastTransactions/>
        </div>
    )
}

const sellIndexContainerStyle = {
    // width: '500px',
    height: '500px',
    background: 'rgb(20, 57, 89)',
    marginTop: '20px'
}

const mainText = {
    margin: '10px 10px',
    border: '1px #032440 solid',
    // width: '340px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 0',
    color: 'white'
}
