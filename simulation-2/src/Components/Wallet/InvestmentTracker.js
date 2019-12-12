import React,{useEffect, useState} from 'react'
import { textAlign } from '@material-ui/system'

export default function InvestmentTracker(props) {
    return (
        <>
            <div className='cryptocoin-container' style={cryptocoinContainer}>
                <div className='cryptocoin-name' style={{marginLeft: '10px'}}>{String(props.index).toUpperCase()}</div>
                        
                <div className='gen-profit-loss-percentage' >{props.percentage}</div>
                <div className='gen-profit-loss' style={props.percentage<0?loss:profit}>{props.percentage<0?'DOWN':'UP'}</div>
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
