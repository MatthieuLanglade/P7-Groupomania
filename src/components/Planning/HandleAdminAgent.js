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
    const [serviceHover, setServiceHover] = useState({
        'userId' : '',
        'serviceId' : '',
        'posteId' : '',
        'UserService' : [],
        'UserPoste' : []
    })
        // MAJ DOM
    const [feed, updateFeed] = useState(true)

    // Récupération des Données
    useEffect(() => {
        fectchUsers()
        fetchServices()
        // Liste Services
        async function fetchServices() {
            try {
            const resp = await fetch(`http://localhost:4000/api/configPlanning/services/`)
            const respConfigPlanning = await resp.json() 
            setConfigPlanning(respConfigPlanning.services)
            } 
            catch (err) {console.log(err)}
            finally {updateFeed(false)}
        }
        // Liste Users
        async function fectchUsers() {
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
    async function handleAssociation(premierType, userId, secondType, serviceId, typeRequete){
        // Options Fetch
        const fetchAdress = `http://localhost:4000/api/configPlanning/${premierType}/${userId}/${secondType}/${serviceId}`
        const requestOptions = {
            method: typeRequete,
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `token ${token}`
            }
        }
        fetch(fetchAdress, requestOptions)
            .then((res) => res.json())
            .finally(() => {
                updateFeed(true)
            })
            .catch((err) => err) 
    }

    // Tester si le service est Actif 
    const filteredUserByService = (user, service) => {
        return user.UserServices.filter((user) => user.ServiceId === service)
    }
    // Tester si le Poste est Actif
    const filteredUserByPoste = (user, service, poste) => {
        let result = []
        if (filteredUserByService(user, service).length > 0){
             result = filteredUserByService(user, service)[0].UserServicePostes
            .filter(UserServicePostes => UserServicePostes.ServicePosteId === poste)} 
        return result}
    // Tester si l'Equipe est Active
    const filteredUserByEquipe = (user, service, poste, equipe) => {
        let result = []
        if (filteredUserByPoste(user, service, poste).length > 0){
            result = filteredUserByPoste(user, service, poste)[0].UserPosteEquipes
            .filter(UserPosteEquipes => UserPosteEquipes.PosteEquipeId === equipe)
        }
        return result
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
        <div 
            className='block-list'
            // onMouseLeave={() => setServiceHover({})}
        > 
           {listUsers
                .filter(user => 
                    user.firstName.toLowerCase().includes(nameFilterValue.toLowerCase()) 
                    || user.lastName.toLowerCase().includes(nameFilterValue.toLowerCase()) 
                    || nameFilterValue === '')
                .map((user) => (
                <>
                <div key={user.id} className={`element-list `}>
                    <div className={`element-list element-cadre main-element ${serviceHover.userId === user.id ? 'user-highlight' : ''}`}>
                        {user.firstName} {user.lastName}
                    </div>
                {/* GESTION DES SERVICES */}
                {configPlanning.map((service) => (
                <div 
                    key={service.id} 
                    className={`element-cadre element-choix button-text ${
                        filteredUserByService(user, service.id).length > 0 ? 'button-active' : ''
                    } ${
                        serviceHover.serviceId === service.id 
                        & serviceHover.userId === user.id ? 'element-highlight' : ''
                    }`}
                    onClick={() => handleAssociation(
                        'users', user.id, 
                        'services', service.id,  
                        filteredUserByService(user, service.serviceId).length > 0 ? 'DELETE' : 'POST')}
                    onMouseEnter={() => filteredUserByService(user, service.id).length > 0 
                        ? setServiceHover({
                        'userId' : user.id,
                        'serviceId' : service.id,
                        'UserService' : filteredUserByService(user, service.id),
                        'UserPoste' : [],
                        'equipeId' : []
                        })
                        : ''
                    }
                >{service.nom}
                </div>
                ))}
                </div>

                {/* GESTION DES POSTES */}
                {serviceHover.userId === user.id && serviceHover.UserService.length > 0
                && <div className='element-list element-sublist'>
                    <div className='ico-list'><i className="fa-solid fa-circle-arrow-right"></i></div>
                {configPlanning
                    .filter(service => service.id === serviceHover.serviceId)
                    .map((service) => (
                        service.ServicePostes.map((servicePoste) => (
                        <>
                        <div 
                            className={`element-cadre element-choix button-text ${
                                filteredUserByPoste(user, service.id, servicePoste.id).length > 0 ? 'button-active' : ''
                            } ${
                                serviceHover.posteId === servicePoste.id 
                                & serviceHover.userId === user.id ? 'element-highlight' : ''
                            }`}
                            onClick={() => {
                                handleAssociation(
                                'userservices', serviceHover.UserService[0].id, 
                                'servicepostes', servicePoste.id,  
                                serviceHover.UserPoste.length > 0 ? 'DELETE' : 'POST')}}
                            onMouseEnter={() => filteredUserByPoste(user, service.id, servicePoste.id).length > 0 
                                ? setServiceHover({
                                ...serviceHover,
                                'posteId' : servicePoste.id,
                                'UserPoste' : filteredUserByPoste(user, service.id, servicePoste.id)
                                })
                                : ''
                            }
                        >{servicePoste.Postes.nom}
                        </div>
                        </>
                        ))
                    ))}    
                </div>}
                {/* GESTION DES EQUIPES */}
                {serviceHover.userId === user.id && serviceHover.UserPoste.length > 0
                && <div className='element-list element-sublist'>
                    <div className='ico-list'><i className="fa-solid fa-circle-arrow-right"></i></div>
                {configPlanning
                    .filter(service => service.id === serviceHover.serviceId)
                    .map(service => service.ServicePostes
                        .filter(poste => poste.id === serviceHover.posteId)
                        .map(poste => poste.PosteEquipes
                            .map(equipe => (
                            <div 
                                key={equipe.Equipes.id}
                                className={`element-cadre element-choix button-text ${
                                    filteredUserByEquipe(user, service.id, poste.id, equipe.id).length > 0 ? 'button-active' : ''
                                }`}
                                onClick={() => {
                                    handleAssociation(
                                    'userservicepostes', serviceHover.UserPoste[0].id, 
                                    'posteequipes', equipe.id,  
                                    serviceHover.UserEquipe.length > 0 ? 'DELETE' : 'POST')}}
                                onMouseEnter={() => setServiceHover({
                                    ...serviceHover,
                                    'equipeId' : equipe.id,
                                    'UserEquipe' : filteredUserByEquipe(user, serviceHover.serviceId, serviceHover.posteId, equipe.id)
                                })}
                            >{equipe.Equipes.nom}</div>
                            ))
                        )
                    )
                }
                </div>} 
                </>
            ))}
        </div>
    </div>
  )
}

export default HandleAdminAgent