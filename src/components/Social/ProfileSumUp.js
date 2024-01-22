import React, { useEffect, useState } from 'react';
import Singup from '../User/Signup';

const ProfileSumUp = ({profileId, feed, updateFeed}) => {
    // State
    const [userInfo, setUserInfo] = useState('')
    const [updateUser, setUpdateUser] = useState(null)
    const [token, setToken] = useState('')

    const newDate = (date) => {
        let dateFormat = new Date(date)
        return dateFormat.toLocaleDateString("fr")
    }
    let admin = localStorage.getItem('admin')
    const activeUser = localStorage.getItem('userId')
    useEffect(() => {
    // Constance identifications
    setToken(localStorage.getItem('token'))
        async function fetchUsers() {
        // setDataLoading(true)
        try {
            const response = await fetch(`http://localhost:4000/api/auth/${profileId}`,{
            headers: {
                'Authorization': `token ${token}`}
            })
            const  userInfo  = await response.json()
            setUserInfo(userInfo)
        } catch (err) {
            console.log('===== error =====', err)
        } 
        }
        if (token) fetchUsers()
    }, [token, feed, profileId]);
    //Supprimer profile        
        const handleUserDelete = () => {
            let requestOptions = {
                method: 'DELETE',
                headers: {
                    'Authorization': `token ${token}`}
            };
            fetch(`http://localhost:4000/api/auth/${profileId}`, requestOptions)
                .then((res) => {res.json();
                    if (res.status == 201) 
                    {alert('Utilisateur supprimé')} else {alert('Suppression non autorisée')}
                })
                .catch((err) => err)
        }
    
    if (updateUser !== null) {return (
        <div className='login-container update-user'>
        <Singup 
            updateUser={updateUser} 
            setUpdateUser={setUpdateUser}
            feed={feed} 
            updateFeed={updateFeed}/>
        </div>)} 

    return (
        <div id='profile-sumup'>
        <div className="sumProfilPicture">
            <img src={userInfo.profilPicture} alt={"Photo de" + userInfo.firstName}/>
            <div className="identity">
                    <h3>{userInfo.firstName} {userInfo.lastName}</h3>
            </div>
        </div>
        <div className="sumProfilPicture-bot">
            <div className="user-infos">
                <p><i className="fa-solid fa-briefcase"></i> {userInfo.service}</p>
                {userInfo.birthday && <p><i className="fa-solid fa-cake-candles"></i> {newDate(userInfo.birthday)}</p>}
                {(activeUser == userInfo.id || admin === 'true' ) && <p className='edit' onClick={(e) => setUpdateUser(profileId)}>Modifier <i className="fa-solid fa-pen-to-square"></i></p>}
                {(admin === 'true' ) && <p className='edit' onClick={(e) => { if (window.confirm('Êtes-vous sûr de vouloir supprimer votre profile ? Toutes les publications et interactions seront également supprimées.')) handleUserDelete()}}>Supprimer <i className="fa-solid fa-trash-can"></i></p>}
            </div>
        </div>
        </div>
    );
};

export default ProfileSumUp;