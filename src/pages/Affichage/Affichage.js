import { NavLink } from 'react-router-dom';
import Events from '../../components/Events';
import Navigation from '../../components/Navigation';
import UserSumUp from '../../components/User/UserSumUp';

const Affichage = () => {
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
                                <NavLink to='/affichage/categories' >
                                <div className='user'>
                                <img src="./images/logo/icon-left-font-monochrome-white.png" alt="" />
                                <h4>
                                     Afficher par service
                                </h4>
                                </div>
                                </NavLink>
                                <NavLink to='/affichage/trombinoscope' >
                                <div className='user'>
                                <img src="./images/logo/icon-left-font-monochrome-white.png" alt="" />
                                <h4>
                                     Afficher le trombinoscope
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

export default Affichage;