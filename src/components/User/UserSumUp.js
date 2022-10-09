import React, { useState } from 'react';
import { useEffect } from 'react';
import Singup from './Signup';

const UserSumUp = ({profileId, feed, updateFeed}) => {
    // State
    const [userInfo, setUserInfo] = useState('')
    const [updateUser, setUpdateUser] = useState(false)
    const activeUser = localStorage.getItem('userId')

    useEffect(() => {
        // Constance identifications
        const token = localStorage.getItem('token')
        async function fetchUsers() {
        try {
            const response = await fetch(`http://localhost:4000/api/auth/${activeUser}`,{
            headers: {
                'Authorization': `token ${token}`}
            })
            const  userInfo  = await response.json()
            setUserInfo(userInfo)
        } catch (err) {
            console.log('===== error =====', err)
        } 
        }
        fetchUsers()
    }, [feed]);

    const newDate = (date) => {
        let dateFormat = new Date(date)
        return dateFormat.toLocaleDateString("fr")
    }
    
    if (updateUser) {return (
        <div className='login-container update-user'>
        <Singup 
            updateUser={updateUser} 
            setUpdateUser={setUpdateUser}
            feed={feed} 
            updateFeed={updateFeed}/>
        </div>)} 
    return (
        <div id='ProfilSumUp'>
            <div className="sumProfilPicture">
                <img src={userInfo.profilPicture} alt={"Photo de" + userInfo.firstName}/>
            </div>
            <div className="sumProfilPicture-bot">
            </div>
            <h2>Bienvenue:</h2>
            <div id="identity">
                <h3>{userInfo.firstName} {userInfo.lastName}</h3>   
                {profileId == userInfo.id && <p onClick={(e) => setUpdateUser(activeUser)}>Modifier <i className="fa-solid fa-pen-to-square"></i></p>}
            </div>
            <div id="user-infos">
                <p><i className="fa-solid fa-briefcase"></i> {userInfo.service}</p>
                {userInfo.birthday && <p><i className="fa-solid fa-cake-candles"></i> {newDate(userInfo.birthday)}</p>}
            </div>

        </div>
    );
};

export default UserSumUp;