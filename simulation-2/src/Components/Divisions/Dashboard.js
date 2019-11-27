import React, { Fragment, useState} from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ProfileBar from './ProfileBar';
import CoinWatch from './CoinWatch';

export default function Dashboard() {

    const [isActive, setActive] = useState(false);


    const showOther = () =>{        
        setActive(!isActive);
    }

    return (
        <Fragment>
            <div className='dashboard-container'>
                <AccountCircleIcon className='account-icon' onClick={showOther}/>
                {/* <VisibilityIcon className='account-icon' onClick={showOther}/> */}

            </div>
            {
                isActive ? <ProfileBar name={localStorage.getItem('Name')} email={localStorage.getItem('Email')} showOther={showOther}/> : ''

            }            
        </Fragment>
    )
}
