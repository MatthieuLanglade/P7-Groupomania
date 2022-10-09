import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import services from '../../config.json'

const Users = () => {
    const [serviceValue, setServiceValue] = useState('')
    const [userList,setUserList] = useState([])

    useEffect(() => {
        async function fetchUsers() {
        // setDataLoading(true)
        try {
            const response = await fetch(`http://localhost:4000/api/auth/all`)
            const  userList  = await response.json()
            setUserList(userList)
        } catch (err) {
            console.log('===== error =====', err)
            // setError(true)
        } finally {
            // setDataLoading(false)
        }
        }
        fetchUsers()
    }, []);

// Fonction regrouper par service
const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {}); 
  };
//  Filtre si State
  const listFilter = (array) => {
    if (serviceValue !== null) {
        return Object.keys(array).filter((service) => service.includes(serviceValue))
    } else {return Object.keys(array)}
  } 
  
  // Array triés et filtrés
  let userListSorted = groupBy(userList, 'service');
  let userListFilter = listFilter(userListSorted)

    return (
        <div id="trombinoscope">
            <div id="filtre">
                <label htmlFor="service">Filtrer par service :</label>
                <select name="service" id="service" value={serviceValue} onChange={(e) => setServiceValue(e.target.value)}>
                        <option value="">Sélectionner un service</option>
                    {services.map((service, index) => (<option key={index} value={service} >{service}</option>))}
                </select>
            </div>
            {
            userListFilter
                .map((service, index) => (
                <div key={index} className="service">
                    <h3 >{service}</h3>
                        <div className="users">
                            {userListSorted[service].map((user) => (
                                <NavLink key={user.id} to={"/profile/?id=" + user.id}>
                                <div  className="user">
                                    {user.profilPicture && <img src={user.profilPicture} alt="" />}
                                    {!user.profilPicture && <img src="./images/logo/icon-left-font-monochrome-white.png" alt="" />}
                                    <h4>{user.firstName} {user.lastName}</h4>
                                </div>
                                </NavLink>
                            ))}
                        </div>
                </div>
                ))
        }
        </div>
    )
}
export default Users;