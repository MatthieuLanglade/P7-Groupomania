import React, { useEffect, useState } from 'react';

const Events = () => {
    
    const [userList,setUserList] = useState([])
    useEffect(() => {
        async function fetchUsers() {
        // setDataLoading(true)
        try {
            const response = await fetch(`http://localhost:4000/api/auth/all`)
            const  userListFetched  = await response.json()
            setUserList(userListFetched)
        } catch (err) {
            console.log('===== error =====', err)
            // setError(true)
        } finally {
            // setDataLoading(false)
        }
        }
        fetchUsers()
    }, []);
    
    const newBirthday = (date) => {
        let dateFormat = new Date(date)
        let dateJour = new Date()
        let newDate = new Date(dateJour.getFullYear(), dateFormat.getMonth(), dateFormat.getDate())
        return newDate
    }

    return (
        <div id="a-venir">
            <h2>Evenements à venir</h2>
            <h3>Anniversaires :</h3>
            {userList
                .filter(a => a.birthday != null)
                .sort((a, b) => Number(newBirthday(a.birthday)) - Number(newBirthday(b.birthday)))
                .slice(0, 5)
                .map((user, index) => (
                    <div key={index} className="birthday">
                        <i className="fa-solid fa-cake-candles"></i>
                        <div className='birthday-info'>
                            <span>{user.firstName} {user.lastName}</span>
                            <span className='date'>{String(newBirthday(user.birthday).toLocaleDateString("fr"))}</span>
                        </div>
                        <span>
                        {/* B: {user.birthday === null ? '' : newBirthday(user.birthday)} */}
                        </span>
                    </div>
                ))}
        </div>
    );
};

export default Events;