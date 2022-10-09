import React from 'react';
import { Outlet } from 'react-router-dom';
import Connect from '../pages/Connect';

const PrivateRoutes = () => {
    let token = localStorage.getItem('token')
    
    return (
        (token? <Outlet/> : <Connect />)
    );
};

export default PrivateRoutes;