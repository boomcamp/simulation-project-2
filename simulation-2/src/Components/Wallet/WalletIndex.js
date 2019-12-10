import React, {useState, useEffect} from 'react'
import ProfitLoss from './ProfitLoss'
import GraphTracking from './GraphTracking'
import CryptoList from './CryptoList'

export default function WalletIndex(props) {

    const [state, setState] = useState({
        UserHasData : false
    });

    return (
        <>
            <ProfitLoss/>
            <CryptoList/>
            {/* <GraphTracking userdata={state.UserHasData}/> */}
        </>
    )
}

