import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import axios from 'axios'

import ProfilePic from '../assest/download.jpeg'

export default function User() {
    const [coins, setCoins] = useState([]);
    const [state, setState] = useState();

    useEffect(() => {
        axios
            .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&per_page=600&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`)
            .then(res => {
                console.log(res.data.name)
                let temp=[]
                res.data.map(coin => { return temp.push({ value: coin.name, label: `${coin.name} (${coin.symbol.toUpperCase()})`}) })
                setCoins(temp)
            })

        return () => { };
    }, [])

    return (
        <div style={{display:`flex`}}>
            <img src={ProfilePic} alt="profile-pic" width="200" height="200" className="profilePic"/>
            <div style={{width: `30%`}}>
            <Select 
                placeholder="Cryptocurrency to Invest"
                value={state} 
                onChange={(state) => setState(state)} 
                options={coins} loading={true} />
            
            <Button variant="contained" color="primary">Buy</Button>
            <Button variant="contained" color="secondary">Sell</Button>
            </div>


        </div>
   
    );
}


