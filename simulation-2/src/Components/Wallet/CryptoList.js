import React,{useState} from 'react'
import { height, textAlign, fontSize } from '@material-ui/system'
import InvestmentTracker from './InvestmentTracker'
import SearchForBuy from './SearchForBuy'
export default function CryptoList() {

    const [state, setState] = useState();

    return (
        <div className='list-container-container' style={investment_container}>
            <div className='list-container-title-actions' style={mainText}>
                <div className='component-container-title'>Investment Tracker</div>
                
            </div>
            <div className='list-table-container' style={tableContainer}>
                
                <InvestmentTracker/>
                <SearchForBuy/>
               
                <div className='buy-action-btn' style={buybtn}>+ BUY COIN</div>
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
    height: '520px'
}

const mainText = {
    // padding: '20px 0 ',
    margin: '10px 10px',
    border: '1px #032440 solid',
    width: '340px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const tableContainer = {
    border: '1px #032440 solid',
    width:  '340px',
    height: '100%',
    marginBottom: '10px'
}

