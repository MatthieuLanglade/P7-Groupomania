import React from 'react'
import Events from '../../components/Social/Events';
import Navigation from '../../components/Navigation';
import UserSumUp from '../../components/User/UserSumUp';
import ShowPlanning from '../../components/Planning/ShowPlanning';
import { NavLink } from 'react-router-dom';

function Planning() {
  return (
    <div >
        <div className="main-container">
            <div className="top-container">
                <Navigation />
            </div>
            <div className="content-container">
                <div id='planning'>
                <ShowPlanning />
                </div>
            </div>
            {/* <div className="right-container"> */}
                {/* <Search /> */}
                {/* <UserSumUp /> */}
                {/* <Events /> */}
            {/* </div>     */}
        </div>
    </div>
  )
}

export default Planning