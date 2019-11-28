import React from 'react'

export default function ToggleBtn(props) {
    
    return (
        <div className='chart-control-container' onClick={props.chartTime}>
            <button className='chart-control selected' data-time='hour' data-time='hour'>
                    1 Hour
            </button>,
            <button className='chart-control day' data-time='day' data-time='day'>
                    24 Hours
            </button>,
            <button className='chart-control week' data-time='week' data-time='week'>
                    1 Week
            </button>,
            <button className='chart-control month' data-time='month'  data-time='month'>
                    1 Month
            </button>,
            <button className='chart-control smonth' data-time='smonth' data-time='smonth'>
                    6 Month
            </button>,
            <button className='chart-control year' data-time='year' data-time='year'>
                    1 Year
            </button>
        </div>
    )
}
