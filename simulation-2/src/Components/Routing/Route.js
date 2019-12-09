import React,{useState} from 'react'
import {Switch, Route} from 'react-router-dom'
import DetailsView from '../Divisions/DetailsView'
import MiniDrawer from '../Divisions/Drawer'
import CoinWatch from '../Divisions/CoinWatch'
import {Redirect} from 'react-router-dom';

// import MiniDrawer from './Components/Divisions/Drawer';




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
            <Route path='/charts' exact render={(props)=><DetailsView DataRef={data}/>} />
            <Route path='/home' exact render={(props)=><CoinWatch click={showdata}/> } />
            <Route path='/' exact render={(props)=><CoinWatch click={showdata}/> } />
        </Switch>
    )
}
