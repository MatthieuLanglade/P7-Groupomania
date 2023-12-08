import Navigation from '../../components/Navigation';
import React, { useEffect, useState } from 'react'
import HandleAdminPlanning from '../../components/Planning/HandleAdminPlanning';

function AdminPlanning() {
    return (
    <div >
        <div className="main-container">
            <div className="top-container">
                <Navigation />
            </div>
            <div className="content-container">
                <HandleAdminPlanning />
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

export default AdminPlanning