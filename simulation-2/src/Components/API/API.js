import axios from 'axios';

export default function API() {
    
}

export function Get(){
    return axios.get('https://api.coingecko.com/api/v3/coins/list')
            .then(data=>{return data})
            .catch(e=>console.log(e));
}

export function GetMarket(){
    return axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d')
            .then(data=>{return data})
            .catch(e=>console.log(e));
}

