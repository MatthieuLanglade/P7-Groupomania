import React, { useEffect, useState } from 'react'

function HandleAdminAgent() {
    // Constance identifications
    let token = localStorage.getItem('token')
    // States
        // Donées
    const [configPlanning, setConfigPlanning] = useState([])
    const [listUsers, setListUsers] = useState([])
        // Gestion Sélection
    const [nameFilterValue, setNameFilterValue] = useState('')
        // MAJ DOM
    const [feed, updateFeed] = useState(true)

    // Récupération des Données
    useEffect(() => {
        fectchUsers()
        fetchServices()
        // Liste Users
        async function fectchUsers() {
            try {
            const resp = await fetch(`http://localhost:4000/api/configPlanning/services/`)
            const respConfigPlanning = await resp.json() 
            setConfigPlanning(respConfigPlanning.services)
            } 
            catch (err) {console.log(err)}
            finally {updateFeed(false)}
        }
        // Liste Services
        async function fetchServices() {
            try {
            const resp = await fetch(`http://localhost:4000/api/auth/all/`)
            const respListUsers = await resp.json() 
            setListUsers(respListUsers)
            } 
            catch (err) {console.log(err)}
            finally {updateFeed(false)}
        }
    }, [feed])

    // Ajout/Suppression d'un service sur un user
    const handleServiceUser = (serviceId, userId, userServiceList) => {
        // Création de la liste de serviceId
        const body = []
        if (userServiceList.includes(serviceId)) {
            const index = userServiceList.indexOf(serviceId)
            body = userServiceList.splice(index, 1)
        } else {
            body = [...userServiceList, serviceId]
        }
        console.log({body})
        // Options Fetch
        // const requestOptions = {
        //     method: 'PUT',
        //     body: JSON.stringify(),
        //     headers: {
        //         'Content-Type' : 'application/json',
        //         'Authorization': `token ${token}`
        //     }
        // }
        // fetch(`http://localhost:4000/api/auth`, requestOptions)
        //     .then((res) => res.json())
        //     .finally(() => {
        //         updateFeed(true)
        //     })
        //     .catch((err) => err) 
    }
    return (
    <div id='config-planning'>
        {/* {console.log({configPlanning}, listUsers)} */}
        <div className='filtre block-titre'>
            <h2>Filtrer la liste:</h2>
        </div>
        <div className='block-list'>
            <h3>Choix du service</h3>
            <div className='element-list'>
                <div className='element-choix element-cadre '>Tous les services</div>
                <div className='element-choix element-cadre element-active'>Aucun filtre</div>
                <div className='element-choix element-cadre'>Aucun service associé</div>
            </div>
            <div className='element-list'>
                {configPlanning.map((service) => (
                    <div key={service.id} className='element-list element-cadre'>{service.nom}</div>
                ))}
            </div>
            <h3>Choix par nom/prénom : </h3>
            <div className='element-list'>
                <input 
                    onChange={(e) => setNameFilterValue(e.target.value)} 
                    placeholder='Ecrire les premières lettres...'
                    value={nameFilterValue}
                ></input>
                {/* <div className='button-choice delete-choice'>
                <i class="fa-solid fa-ban" aria-hidden="true"></i>
                </div> */}
            </div>
        </div>
        <div className='filtre block-titre'>
            <h2>Liste Agents:</h2>
        </div>
        <div className='block-list'> 
            {listUsers
                .filter(user => 
                    user.firstName.toLowerCase().includes(nameFilterValue.toLowerCase()) 
                    || user.lastName.toLowerCase().includes(nameFilterValue.toLowerCase()) 
                    || nameFilterValue === '')
                .map((user) => (
                <div key={user.id} className='element-list'>
                <div className='element-list element-cadre main-element'>
                    {user.firstName} {user.lastName}
                </div>
                {configPlanning.map((service) => (
                <div 
                    key={service.id} 
                    className='element-cadre element-choix button-text'
                    onClick={() => handleServiceUser(service.id, user.id, ['1','2'])}
                >{service.nom}</div>
                ))}
                </div>
            ))}
        </div>
    </div>
  )
}

export default HandleAdminAgent