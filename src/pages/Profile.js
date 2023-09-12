import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Navigation from '../components/Navigation';
import Posts from '../components/Posts';
import DeleteUser from '../components/User/DeleteUser';
import ProfileSumUp from '../components/User/ProfileSumUp';
import UserSumUp from '../components/User/UserSumUp';
import ShowTodoList from '../components/TodoList/ShowTodoList';

const Profile = ({feed, updateFeed, activePostUpdate, setActivePostUpdate}) => {
    const [profileId, setProfileId] = useState('')
    useEffect(() => {
        let urlP = new URL(window.location.href);
        setProfileId(urlP.searchParams.get("id"))
    }, [feed])

    return (
        <div >
            <div className="main-container">
                <div className="top-container">
                    <Navigation />
                </div>
                <div className="content-container">
                    <ProfileSumUp 
                        profileId={profileId} 
                        feed={feed} 
                        updateFeed={updateFeed}/>

                    <Posts
                        feed={feed} 
                        updateFeed={updateFeed}
                        activePostUpdate={activePostUpdate}
                        setActivePostUpdate={setActivePostUpdate}
                        serviceValue={null} />
                </div>
                <div className="right-container">
                    <UserSumUp 
                        profileId={profileId}
                        feed={feed} 
                        updateFeed={updateFeed}/>
                    <DeleteUser />
                    <ShowTodoList />
                </div>    
            </div>
        </div>
    );
};

export default Profile;