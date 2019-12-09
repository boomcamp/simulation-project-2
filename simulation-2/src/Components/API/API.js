import axios from 'axios';

export default function API() {
    
}

export function Get(){
    return axios.get('https://api.coingecko.com/api/v3/coins/list')
            .then(data=>{return data})
            .catch(e=>console.log(e));
}

export function GetMarket(){
    return axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C30d%2C200d%2C1y')
            .then(data=>{return data})
            .catch(e=>console.log(e));
}

export function GetDetailsView(id,range){
    return axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${range}`)
            .then(data=>{return data})
            .catch(e=>console.log(e));
}
