import React,{useState} from 'react'
import {Switch, Route} from 'react-router-dom'
import DetailsView from '../Divisions/DetailsView'
import CoinWatch from '../Divisions/CoinWatch'
import WalletIndex from '../Wallet/WalletIndex'

export default function RouteView(ref) {
    const [data,setData] = useState();
    const [redirecting, setRedirect] = useState(false);

    function showdata(data){
        setData(data)
        setRedirect(true);
    } 
    
    
    if(redirecting){
       setRedirect(false)
       ref.change()
       return ref.redir.push('/charts');
    }


    return (
        <Switch>
            <Route path='/wallet' exact render={(props)=><WalletIndex/>} />
            <Route path='/charts' exact render={(props)=><DetailsView DataRef={data}/>} />
            <Route path='/home' exact render={(props)=><CoinWatch click={showdata}/> } />
            <Route path='/' exact render={(props)=><CoinWatch click={showdata}/> } />
        </Switch>
    )
}
