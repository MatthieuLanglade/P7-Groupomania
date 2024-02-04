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
    const [serviceFilterList, setServiceFilterList] = useState(['aucun'])
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
    const handleAssociation = (userId, typeClassement, serviceId, typeRequete) => {
        // Options Fetch
        const requestOptions = {
            method: typeRequete,
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `token ${token}`
            }
        }
        fetch(`http://localhost:4000/api/configPlanning/users/${userId}/${typeClassement}/${serviceId}`, requestOptions)
            .then((res) => res.json())
            .finally(() => {
                updateFeed(true)
            })
            .catch((err) => err) 
    }
    return (
    <div id='config-planning'>
        {console.log({configPlanning}, listUsers)}
        <div className='block-titre'>
            <h2>Filtrer la liste:</h2>
        </div>
        {/* GESTION DES FILTRES */}
        <div className='block-list'>
            {/* FILTRE PAR SERVICE */}
            <h3>Choix du service</h3>
            <div className='element-list'>
                {/* TOUS LES SERVICES */}
                <div 
                    className={`element-choix element-cadre ${configPlanning.length === serviceFilterList.filter(e => e !== "aucun").length ? 'element-active' : ''}`}
                    onClick={() => {
                        const listService = []
                        for (const service of configPlanning){listService.push(service.id)}
                        setServiceFilterList(listService)
                    }}
                >Tous les services</div>
                {/* AUCUN FILTRE */}
                <div 
                    className={`element-choix element-cadre ${serviceFilterList[0] ? '' : 'element-active'}`}
                    onClick={() => setServiceFilterList([])}
                >Aucun filtre</div>
                {/* AUCUN SERVICE */}
                <div 
                    className={`element-choix element-cadre ${serviceFilterList.includes('aucun') ? 'element-active' : ''}`}
                    onClick={() => serviceFilterList.includes('aucun') 
                        ? setServiceFilterList([...serviceFilterList.filter(e => e !== 'aucun')])
                        : setServiceFilterList([...serviceFilterList, 'aucun'])}
                >Aucun service associé</div>
            </div>
                {/* LISTES SERVICES */}
            <div className='element-list'>
                {configPlanning.map((service) => (
                    <div 
                        key={service.id} 
                        className={`element-list element-cadre ${serviceFilterList.includes(service.id) ? 'element-active' : ''}`}
                        onClick={() => serviceFilterList.includes(service.id) 
                            ? setServiceFilterList([...serviceFilterList.filter(element => element !== service.id)]) 
                            : setServiceFilterList([...serviceFilterList, service.id])}
                        >{service.nom}</div>
                ))}
            </div>
            {/* FILTRE PAR NOM / PRENOM */}
            <h3>Choix par nom/prénom : </h3>
            <div className='element-list'>
                <input 
                    onChange={(e) => setNameFilterValue(e.target.value)} 
                    placeholder='Ecrire les premières lettres...'
                    value={nameFilterValue}
                ></input>
            </div>
        </div>
        <div className='block-titre'>
            <h2>Liste Agents:</h2>
        </div>
        {/* AFFICHAGE DES AGENTS */}
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
                {/* GESTION DES SERVICES */}
                {configPlanning.map((service) => (
                <div 
                    key={service.id} 
                    className={`element-cadre element-choix button-text ${
                        user.UserServices.some(userServices => userServices.ServiceId === service.id) ? 'button-active' : ''
                    }`}
                    onClick={() => handleAssociation(
                        user.id, 
                        'services', service.id,  
                        user.UserServices.some(userServices => userServices.ServiceId === service.id) ? 'DELETE' : 'POST')}
                >{service.nom}
                </div>
                ))}
                </div>
            ))}
        </div>
    </div>
  )
}

export default HandleAdminAgent