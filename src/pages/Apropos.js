import React from 'react';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';

const Apropos = () => {
    return (
        <div>
            <Logo />
            <div className="main-container">
                    <Navigation />
                    <div className="content-container">
                        <h1>En savoir plus</h1>
                    </div>
            </div>
        </div>
    );
};

export default Apropos;