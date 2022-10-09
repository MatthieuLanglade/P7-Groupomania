import Events from '../components/Events';
import Navigation from '../components/Navigation';
import Posts from '../components/Posts';
import Publish from '../components/Publish';
import UserSumUp from '../components/User/UserSumUp';

const Home = ({feed, updateFeed, activePostUpdate, setActivePostUpdate}) => {
    return (
        <div >
            <div className="main-container">
                <div className="top-container">
                    <Navigation />
                </div>
                <div className="content-container">
                    {!activePostUpdate &&
                    <Publish 
                        feed={feed} 
                        updateFeed={updateFeed}
                        />}
                    <Posts 
                        feed={feed} 
                        updateFeed={updateFeed}
                        activePostUpdate={activePostUpdate}
                        setActivePostUpdate={setActivePostUpdate} 
                        serviceValue={null}
                    />
                </div>
                <div className="right-container">
                    {/* <Search /> */}
                    <UserSumUp profileId={false}/>
                    <Events />
                </div>    
            </div>
        </div>
    );
};

export default Home;