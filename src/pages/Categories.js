import React, { useState } from 'react';
import Events from '../components/Events';
import Navigation from '../components/Navigation';
import Posts from '../components/Posts';
import UserSumUp from '../components/User/UserSumUp';
import config from '../config.json'

const Categories = ({feed, updateFeed}) => {
    const [serviceValue, setServiceValue] = useState("")
    return (
        <div >
            <div className="main-container">
                <div className="top-container">
                    <Navigation />
                </div>
                <div className="content-container">
                <div id="filtre">
                    <label htmlFor="service">Filtrer par service :</label>
                    <select name="service" id="service" value={serviceValue} onChange={(e) => setServiceValue(e.target.value)}>
                        {config.services.map((service, index) => (<option key={index} value={service} >{service}</option>))}
                    </select>
                </div>
                    {/* <h1>Liste des utilisateurs :</h1> */}
                    <Posts 
                        serviceValue={serviceValue}
                        feed={feed} 
                        updateFeed={updateFeed}/>

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

export default Categories;