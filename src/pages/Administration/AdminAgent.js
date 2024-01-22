import React from 'react'
import Navigation from '../../components/Navigation'
import HandleAdminAgent from '../../components/Planning/HandleAdminAgent'

function AdminAgent() {
  return (
    <div>
    <div className="main-container">
        <div className="top-container">
            <Navigation />
        </div>
        <div className="content-container">
            <HandleAdminAgent />
        </div>
    </div>
    </div>
  )
}

export default AdminAgent