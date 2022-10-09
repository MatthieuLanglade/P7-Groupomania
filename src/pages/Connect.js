import React, { useState } from 'react';
import Logo from '../components/Logo';
import Login from '../components/User/Login'
import Signup from '../components/User/Signup'
import PrivateRoutes from '../utils/PrivateRoute';

const Connect = () => {
    const [loading, setloading] = useState(false)
    const [isActive, setIsActive] = useState('login')


    if(loading) {return <PrivateRoutes/>}
    return (
        <div id='login'>
            <div className="login-container">
                <Logo />
                <div className="connect-choice">
                    <h1 onClick={() => setIsActive('login')} className={isActive==='login' ? 'Active' : ''}>
                        <i className="fa-solid fa-user"></i>
                        Se connecter
                        </h1>
                    <h1 onClick={() => setIsActive('signup')} className={isActive==='signup' ? 'Active' : ''}>
                        <i className="fa-solid fa-user-plus"></i>
                        S'enregistrer
                        </h1>
                </div>
                <div className="connect">
                    {isActive==='login' 
                    ? <Login 
                        loading={loading}
                        setloading={setloading}
                    /> 
                    : <Signup 
                        isActive={isActive} 
                        setIsActive={setIsActive}
                        updateUser={false} 
                        />}
                </div>
            </div>
        </div>
    );
};

export default Connect;