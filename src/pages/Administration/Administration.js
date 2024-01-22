import { NavLink } from 'react-router-dom';
import Events from '../../components/Social/Events';
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
                        <div className='tile-list'>
                            <h3 className='tile-list__title'>Gestion du planning</h3>
                            <NavLink to='/admin/planning' className='tile-list__element'>
                                <div className='tile-list__element--container'>
                                    <img className="tile-list__element--img" src="./images/logo/icon-left-font-monochrome-white.png" alt="" />
                                <h4>Gérer Planning</h4>
                                </div>
                            </NavLink>
                            <NavLink to='/admin/agents' className='tile-list__element'>
                                <div className='tile-list__element--container'>
                                <img className='tile-list__element--img' src="./images/logo/icon-left-font-monochrome-white.png" alt="" />
                                <h4>Gérer Agents</h4>
                                </div>
                            </NavLink>
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