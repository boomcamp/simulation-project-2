import React from 'react'
import {Route, Switch} from "react-router-dom"

import CoinList from "./component/CoinList/CoinList"
import CoinDetails from "./component/CoinDetails/CoinDetails"
export default function Routes(){
return(
    <Switch>
        <Route exact component={CoinList} path="/coinlist" />
        <Route component={CoinDetails} path="/coindetails"/>
        {/* <Route /> */}
    </Switch>
)
}