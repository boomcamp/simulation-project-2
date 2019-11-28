import React,{useEffect} from 'react'

export default function DVHeader(props) {

    useEffect(() => {
        console.log(props.DataRef)
    });

    const arrowcolor =(value)=>{
        if(value < 0){
            return <div className='down' style={{borderBottomColor:'red'}}/>
        }
            return <div className='up' style={{borderBottomColor:'green'}}/>
    }


    return (
        <div className="dv-header-container">
            
            <div className='header-name-container'>
                <img className="dv-coin-image" src={props.DataRef.coin.image} alt=''/>
                <p className="dv-coin-name">{props.DataRef.coin.name}</p>
                <p className="dv-coin-index">({props.DataRef.index})</p>
            </div>
            <div className='current-coin-status-container'>
                <div className='coin-status hour'>
                    <div className='coin-time-ref'>
                        1 Hour
                    </div>
                    <div className='coin-context'>
                        {arrowcolor(props.DataRef.onehour.toFixed(2))}
                        {props.DataRef.onehour.toFixed(2)}
                    </div>
                </div>
                <div className='coin-status day'>
                    <div className='coin-time-ref'>
                        24 Hour
                    </div>
                    <div className='coin-context'>
                        {arrowcolor(props.DataRef.oneday.toFixed(2))}
                        {props.DataRef.oneday.toFixed(2)}
                    </div>
                </div>
                <div className='coin-status week'>

                    <div className='coin-time-ref'>
                        1 Week
                    </div>
                    <div className='coin-context'>
                        {arrowcolor(props.DataRef.sevendays.toFixed(2))}
                        {props.DataRef.sevendays.toFixed(2)}
                    </div>
                </div>
                <div className='coin-status month'>

                <div className='coin-status week'>
                    <div className='coin-time-ref'>
                        1 Month
                    </div>
                    <div className='coin-context'>
                        {arrowcolor(props.DataRef.month.toFixed(2))}
                        {props.DataRef.month.toFixed(2)}
                    </div>
                    </div>
                </div>
                <div className='coin-status smonth'>
                    <div className='coin-time-ref'>
                        6 Month
                    </div>
                    <div className='coin-context'>
                        {arrowcolor(props.DataRef.smonth.toFixed(2))}
                        {props.DataRef.smonth.toFixed(2)}
                    </div>
                </div>
                <div className='coin-status year'>
                    <div className='coin-time-ref'>
                        1 Year
                    </div>
                    <div className='coin-context'>
                        {arrowcolor(props.DataRef.oneyear.toFixed(2))}
                        {props.DataRef.oneyear.toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    )
}
