import Events from '../components/Events';
import Navigation from '../components/Navigation';
import Users from '../components/User/Users'
import UserSumUp from '../components/User/UserSumUp';

const Trombinoscope = () => {
    return (
        <div >
            <div className="main-container">
                <div className="top-container">
                    <Navigation />
                </div>
                <div className="content-container">
                    <Users />

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

export default Trombinoscope;