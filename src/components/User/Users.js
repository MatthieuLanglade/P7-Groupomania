import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import config from '../../config.json'

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
    if (serviceValue !== null && serviceValue !== config.services[0]) {
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
                    {config.services.map((service, index) => (<option key={index} value={service} >{service}</option>))}
                </select>
            </div>
            {
            userListFilter
                .map((service, index) => (
                <div key={index} className="tile-list">
                    <h3 className='tile-list__title'>{service}</h3>
                    {userListSorted[service].map((user) => (
                            <NavLink key={user.id} className="tile-list__element" to={"/profile/?id=" + user.id}>
                                <div  className="tile-list__element--container">
                                <img className='tile-list__element--img' src={user.profilPicture ? user.profilPicture : './images/logo/icon-left-font-monochrome-white.png'} alt="" />
                                <h4>{user.firstName} {user.lastName}</h4>
                                </div>
                            </NavLink>
                    ))}
                </div>
                ))
        }
        </div>
    )
}
export default Users;