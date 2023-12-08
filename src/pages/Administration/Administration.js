import { NavLink } from 'react-router-dom';
import Events from '../../components/Events';
import Navigation from '../../components/Navigation';
import UserSumUp from '../../components/User/UserSumUp';

const Administration = () => {
    return (
        <div >
            <div className="main-container">
                <div className="top-container">
                    <Navigation />
                </div>
                <div className="content-container">
                    <div id='trombinoscope'>
                    <h2>Paramètrage</h2>
                        <div className='service'>
                            <div className='users'>
                                <NavLink to='/admin/planning' >
                                <div className='user'>
                                <img src="./images/logo/icon-left-font-monochrome-white.png" alt="" />
                                <h4>
                                     Gérer Planning
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

export default Administration;