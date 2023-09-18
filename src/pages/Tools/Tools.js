import { NavLink } from 'react-router-dom';
import Events from '../../components/Events';
import Navigation from '../../components/Navigation';
import UserSumUp from '../../components/User/UserSumUp';
import { useState } from 'react';

const TodoList = () => {
    return (
        <div >
            <div className="main-container">
                <div className="top-container">
                    <Navigation />
                </div>
                <div className="content-container">
                    <div id='trombinoscope'>
                    <h2>Mes outils</h2>
                        <div className='service'>
                            <div className='users'>
                                <NavLink to='/todolist' >
                                <div className='user'>
                                <img src="./images/logo/icon-left-font-monochrome-white.png" alt="" />
                                <h4>
                                     TodoList
                                </h4>
                                </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-container">
                    {/* <Search /> */}
                    <UserSumUp />
                    <Events />
                </div>    
            </div>
        </div>
    );
};

export default TodoList;