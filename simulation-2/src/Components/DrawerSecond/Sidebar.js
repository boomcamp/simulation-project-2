import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import React from 'react'

import ViewListIcon from '@material-ui/icons/ViewList';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import TimelineIcon from '@material-ui/icons/Timeline';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

export default function Sidebar() {
    return (
        <>
            <SideNav
            onSelect={(selected) => {
                // Add your code here
            }}>
                
            <SideNav.Toggle />

            <SideNav.Nav defaultSelected="home">
                <NavItem eventKey="home">
                    <NavIcon>
                        <ViewListIcon/>
                    </NavIcon>
                    <NavText>
                        Home
                    </NavText>
                </NavItem>
                <NavItem eventKey="charts">
                    <NavIcon>
                        <TimelineIcon/>
                    </NavIcon>
                    <NavText>
                        Charts
                    </NavText>
                </NavItem>
                <NavItem eventKey="wallet">
                    <NavIcon>
                        <AccountBalanceWalletIcon/>
                    </NavIcon>
                    <NavText>
                        Wallet
                    </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
        </>
    )
}
