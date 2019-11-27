import React, { Fragment } from 'react'

export default function ProfileBar(props) {

    const Logout = () => {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <Fragment>
        <div className='dashboard-cab-container'>
            <div className='upper-block-container'>
                <div className='profile-picture-container'>
                    <div className='add-profile-icon'>+</div>
                </div>
                <div className='name-desc-container'>
                    <h3 className='name-desc-full'>{props.name}</h3>
                    <h3 className='email-desc-full'>{props.email}</h3>
                </div>
            </div>
            
            <h1 className='logout-btn' onClick={Logout}>Logout</h1>


        </div>

            <div className='black-overlay' onClick={props.showOther}/>
        </Fragment>
    )
}
