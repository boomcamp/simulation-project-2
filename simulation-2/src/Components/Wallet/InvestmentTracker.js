import React,{useEffect, useState} from 'react'
import { textAlign } from '@material-ui/system'

export default function InvestmentTracker(props) {

    const ExpandDetails = (e) => {
        // alert(e.target.getAttribute('data-index'))
    }

    return (
        <>
            <div className='cryptocoin-container'  style={cryptocoinContainer} data-transactionId={props.transactionId} data-index={props.coinid} onClick={props.selectedpass}>
                <div className='cryptocoin-name' style={{marginLeft: '10px'}} data-transactionId={props.transactionId} data-index={props.coinid}>{String(props.index).toUpperCase()}</div>
                <div className='gen-profit-loss-percentage' data-transactionId={props.transactionId} data-index={props.coinid}>{props.percentage}</div>
                <div className='gen-profit-loss' data-transactionId={props.transactionId} style={props.percentage<0?loss:profit} data-index={props.coinid}>{props.percentage<0?'DOWN':'UP'}</div>
            </div>
        </>
    )
}


const valueTrack = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // flexDirection: ''
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
