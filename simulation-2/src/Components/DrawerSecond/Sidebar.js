import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import React from 'react'
import ViewListIcon from '@material-ui/icons/ViewList';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import TimelineIcon from '@material-ui/icons/Timeline';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import RouteView from '../Routing/Route'

export default function Sidebar() {

    const [dataRef, setDataRef] = React.useState();
    const [chartDisabled, setChartDisabled] = React.useState(true);
    const [selected, setSelected] = React.useState(false);

    const ChangeDashBoard =(data)=>{
        console.log(data)
        setChartDisabled(false);
    }

    return (
        <Router>
        <Route render={({ location, history }) => (
            <React.Fragment>
                <SideNav
                    onSelect={(selected) => {
                        const to = '/' + selected;
                        if (location.pathname !== to) {
                            history.push(to);
                        }
                    }}
                    style={{position:'fixed',background:'#143959'}}
                >
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected="home" onClick={()=>setSelected(false)} >
                        <NavItem eventKey="home" >
                            <NavIcon>
                                <ViewListIcon/>
                            </NavIcon>
                            <NavText>
                                Home
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="charts" active={selected} disabled={chartDisabled} >
                            <NavIcon>
                            <TimelineIcon/>
                            </NavIcon>
                            <NavText>
                                Charts
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="wallet" onClick={()=>setSelected(false)}>
                            <NavIcon>
                                <AccountBalanceWalletIcon/>
                            </NavIcon>
                            <NavText>
                                Wallet
                            </NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
                <main style={{
                    margin: '0 auto',
                    paddingLeft: '65px'
                }}>
                    <RouteView redir={history} change={ChangeDashBoard}/>
                </main>
            </React.Fragment>
        )}
        />
        </Router>
    )
}
