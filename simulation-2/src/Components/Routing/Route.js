import React from 'react'
import {Switch} from 'react-router-dom'
import DetailsView from '../Divisions/DetailsView'
import MiniDrawer from '../Divisions/Drawer'

// import MiniDrawer from './Components/Divisions/Drawer';
export default function Route() {
    return (
        <Switch>

            {/* <Route path='/detailedview' exact component={DetailsView} /> */}
            <Route path='/sample' exact component={MiniDrawer} />

        </Switch>
    )
}
