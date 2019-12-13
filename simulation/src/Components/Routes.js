import React,{ useState} from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Invest from './Invest';

export default function Routes(){
   return (
        <HashRouter>
            <Switch>
                <Route component={Home} exact path="/" />
                <Route component={Invest} exact path="/invest" />
            </Switch>
        </HashRouter>
    )
}