import React, { useEffect, useState } from 'react'

function HandleAdminPlanning() {
    //States 
    const [configPlanning, setConfigPlanning] = useState([]) // Données config
    const [postesList, setPostesList] = useState([]) // Données Postes
    const [serviceCreateValue, setServiceCreateValue] = useState('') // Input Création Service
    const [posteCreateValue, setPosteCreateValue] = useState('') //  Input Création Poste 
    const [hoverPoste, setHoverPoste] = useState('') // Hover pour suppression Association Poste-service
    const [selectedPoste,setSelectedPoste] = useState([]) // Select Association Poste-Service
    const [selectedEdit, setSelectedEdit] = useState('') // Choix de l'input édité
    const [selectedEditValue, setSelectedEditValue] = useState('') // Value de l'input édité
    const [feed, updateFeed] = useState(true) // MAJ DOM
    const [listVisibility, setListVisibility] = useState([]) // Affichage du détail des listes

    // Fetch Config Planning
    useEffect(() => {
        fetchConfigPlanning()
        fetchPostes()
        async function fetchConfigPlanning() {
            try {
                const resp = await fetch(`http://localhost:4000/api/configPlanning/services/`)
                const respConfigPlanning = await resp.json() 
                setConfigPlanning(respConfigPlanning.services)
            } 
            catch (err) {console.log(err)}
            finally {updateFeed(false)}
        } 
        async function fetchPostes() {
            try {
                const resp = await fetch(`http://localhost:4000/api/configPlanning/postes/`)
                const respPostes = await resp.json() 
                setPostesList(respPostes.postes)
            } 
            catch (err) {console.log(err)}
            finally {updateFeed(false)}
        } 
    }, [feed])

    // Liste les Postes utilisés
    const listPostesUtilise = (service) => {
        const listePoste = []
        for (let i in service.PosteService) {
            listePoste.push(service.PosteService[i].Postes.id)
        }
        return listePoste
    }

    // Vérifie si Valeur Numérique
    function isNumeric(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    // Gérer Association Poste-Service
    const handlePosteService = (idATester) => {
        // Récupèration PosteId
        const posteId = selectedPoste.filter(f => f.serviceId === idATester)[0].posteId
        // Vérification du format de posteId
        if(isNumeric(parseFloat(posteId))) {
        // Options Fetch
        const requestOptions = {
            method: 'POST',
            body: '',
            // headers: {
            //     'Authorization': `token ${token}`
            // }
        }
        fetch(`http://localhost:4000/api/configPlanning/services/${idATester}/postes/${posteId}`, requestOptions)
            .then((res) => res.json())
            .finally(() => updateFeed(true))
            .catch((err) => err)
        } else {console.log("Poste Inconnue ou incorrect")}
    }

    // Gérer suppression d'association 
    const handleDeletePosteService = (serviceId, posteId) => {
       // Options Fetch
       const requestOptions = {
        method: 'DELETE',
        body: '',
        // headers: {
        //     'Authorization': `token ${token}`
        // }
    }
    fetch(`http://localhost:4000/api/configPlanning/services/${serviceId}/postes/${posteId}`, requestOptions)
        .then((res) => res.json())
        .finally(() => updateFeed(true))
        .catch((err) => err) 
    }
    // Supprimer élément 
    const handleDelete = (type, id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                // 'Authorization': `token ${token}`
            }
        }
        fetch(`http://localhost:4000/api/configPlanning/${type}/${id}`, requestOptions)
            .then((res) => res.json())
            .finally(() => updateFeed(true))
            .catch((err) => err) 
    }
    // Gérer Nouveau 
    const handleCreate = (action, type, nom, id = '') => {
        const body = {
            "nom": nom
        }
         // Options Fetch
         const requestOptions = {
            method: action,
            body: JSON.stringify(body),
            headers: {
                'Content-Type' : 'application/json',
                // 'Authorization': `token ${token}`
            }
        }
        fetch(`http://localhost:4000/api/configPlanning/${type}/${id}`, requestOptions)
            .then((res) => res.json())
            .finally(() => {
                setServiceCreateValue('')
                setPosteCreateValue('')
                setSelectedEdit('')
                setSelectedEditValue('')
                updateFeed(true)
            })
            .catch((err) => err) 
        }

    // Fonction Afficher/Masquer les listes
    const showListDetails = (listID) => {
        setListVisibility([...listVisibility, listID ])
    }
    const hideListDetails = (listID) => {
        for (let i in listVisibility){
            if(listVisibility[i] === listID) {
                listVisibility.splice(i,1)
            }
        }
        setListVisibility([...listVisibility])
    }
return (
<div id='config-planning'>
    <div className='block-titre'>
        <h2>Association Service - Poste - Equipe</h2>
    </div>
    <div className='block-list'>
    <ul>
    {configPlanning.map((service, index) => (
        <li 
        className='list-service' 
        key={service.id}>
                <h3>
                    {index+1} ➖ {service.nom}
                    <div className='list-visibility'>
                        {!listVisibility.includes(service.id) &&
                        <i className="fa-solid fa-arrow-down" onClick={() => showListDetails(service.id)}></i>
                        }
                        {listVisibility.includes(service.id) &&
                        <i className="fa-solid fa-arrow-up" onClick={() => hideListDetails(service.id)}></i>
                        }
                    </div>
                </h3>
            {listVisibility.includes(service.id) && 
            <ul>
                {/* ASSOCIER UN POSTE */}
                <li className='element-list'>
                    <div 
                        className='validate-choice button-choice'
                        onClick={() => handlePosteService(service.id)}
                    ><i className="fa-solid fa-plus"></i></div>
                    <select id='poste-select' 
                        onChange={(e) => setSelectedPoste([...selectedPoste.filter(f => f.serviceId !== service.id), {'posteId':e.target.value, 'serviceId': service.id}])}>
                    <option selected value=''>-- Sélectionner un poste --</option>
                        {postesList
                        .filter(poste => !listPostesUtilise(service).includes(poste.id))
                        .map((poste) => (
                    <option value={poste.id}>{poste.nom}</option>))}
                    </select>
                </li>
                
                {/* LISTE DES POSTES ASSOCIES */}
                {service.PosteService.map((poste, index) => (<>
                <li className='element-list' 
                    key={poste.id}
                    onMouseEnter={() => setHoverPoste(poste.id)}
                    onMouseLeave={() => setHoverPoste('')}>
                    <div className='sort-choice button-choice element-hidden'>
                        <i className='fa-solid fa-sort'></i></div>
                    <div className='element-list element-cadre'>{index+1}.  {poste.Postes.nom}</div>
                    <div className='delete-choice button-choice element-hidden'
                        onClick={() => handleDeletePosteService(service.id, poste.Postes.id)}>
                    <i className="fa-solid fa-trash"></i></div>
                </li>
                    {/* LISTE DES EQUIPES ASSOCIEES */}
                    <li>
                
                    <ul>
                        <li className='element-list'>
                            <div className='sort-choice button-choice element-hidden'><i className='fa-solid fa-sort'></i></div>
                            <div className='element-list element-cadre'>Equipe 1</div>
                            <div className='delete-choice button-choice element-hidden'><i className="fa-solid fa-trash"></i></div>
                        </li>
                        <li className='element-list'>
                            <div className='sort-choice button-choice element-hidden'><i className='fa-solid fa-sort'></i></div>
                            <div className='element-list element-cadre'>Equipe de Nuit</div>
                            <div className='delete-choice button-choice element-hidden'><i className="fa-solid fa-trash"></i></div>
                        </li>
                    </ul>
               
                </li> 
                    </>))}
            </ul>}
        </li>
    ))}
    </ul>
    </div>

    <div className='block-titre'>
    <h2>Créer Service - Poste - Equipe</h2>
    </div>
    <div className='block-list'>
    <h3>Créer Service</h3>
        {/* AJOUTER UN SERVICE */}
        <ul>
        <li className='element-list'>
        {selectedEdit !== '' ||
            <div 
                className='validate-choice button-choice' 
                onClick={() => handleCreate('POST', 'services', serviceCreateValue)}>
            <i className="fa-solid fa-check"></i></div>}
            <input
            className={selectedEdit ? 'grey-input' : ''}
                value={serviceCreateValue}
                placeholder='Ajouter un Service'
                onChange={(e) => setServiceCreateValue(e.target.value)}/>
        </li>
        {/* LISTE DES SERVICES */}
        {configPlanning.map((service, index) => (
        <li key={index} className='element-list'>
            {selectedEdit.service === service.id 
            ? (<>
                {/* MODIFICATION DU SERVICE */}
            <div className='validate-choice button-choice'
                onClick={() => handleCreate('PUT', 'services', selectedEditValue, selectedEdit.service)}>
            <i className="fa-solid fa-check"></i>
            </div>
            <input 
                value={selectedEditValue}
                onChange={(e) => setSelectedEditValue(e.target.value)}
                autoFocus/>
            <div className='delete-choice button-choice'
                onClick={() => {setSelectedEdit(''); setSelectedEditValue('')}}>
            <i className="fa-solid fa-ban"></i>
            </div>
            </>)
            : (<>
                {/* AFFICHAGE DU SERVICE */}
            <div className='sort-choice button-choice element-hidden'>
                <i className='fa-solid fa-sort'></i></div>
            <div className='element-list element-cadre'>{service.nom}</div>
            <div className='edit-choice button-choice element-hidden' 
                onClick={() => {
                    setSelectedEdit({'service': service.id})
                    setSelectedEditValue(service.nom)}}>
            <i className="fa-solid fa-pen-to-square"></i>
            </div>
            <div className='delete-choice button-choice element-hidden'
                onClick={() => handleDelete('services', service.id)}>
                <i className="fa-solid fa-trash"></i></div>
                </>)}
        </li>
        ))}
        </ul>
    </div>
    <div className='block-list'>
    <h3>Créer Poste</h3>
        {/* AJOUTER UN POSTE */}
        <ul>
        <li className='element-list'>
        {selectedEdit !== '' ||
            <div 
                className='validate-choice button-choice' 
                onClick={() => handleCreate('POST', 'postes', posteCreateValue)}>
            <i className="fa-solid fa-check"></i></div>}
            <input
            className={selectedEdit ? 'grey-input' : ''}
                value={posteCreateValue}
                placeholder='Ajouter un Poste'
                onChange={(e) => setPosteCreateValue(e.target.value)}/>
        </li>
        {/* LISTE DES POSTES */}
        {postesList.map((postList, index) => (
        <li key={index} className='element-list'>
            {selectedEdit.poste === postList.id 

            ? (<>
            {/* MODIFICATION DU POSTE */}
            <div className='validate-choice button-choice'
                onClick={() => handleCreate('PUT', 'postes', selectedEditValue, selectedEdit.poste)}>
            <i className="fa-solid fa-check"></i>
            </div>
            <input 
                value={selectedEditValue}
                onChange={(e) => setSelectedEditValue(e.target.value)}
                autoFocus/>
            <div className='delete-choice button-choice'
                onClick={() => {setSelectedEdit(''); setSelectedEditValue('')}}>
            <i className="fa-solid fa-ban"></i>
            </div>
            </>)

            : (<>
            {/* AFFICHAGE DU POSTE */}
            <div className='sort-choice button-choice element-hidden'
                draggable='true'
                // onDrag={(e) => console.log(e.dataTransfer)}
                >
                <i className='fa-solid fa-sort'></i></div>
            <div className='element-list element-cadre'>{postList.nom}</div>
            <div className='edit-choice button-choice element-hidden' 
                onClick={() => {
                    setSelectedEdit({'poste': postList.id})
                    setSelectedEditValue(postList.nom)}}>
            <i className="fa-solid fa-pen-to-square"></i>
            </div>
            <div className='delete-choice button-choice element-hidden'
                onClick={() => handleDelete('postes', postList.id)}>
                <i className="fa-solid fa-trash"></i></div>
                </>)}
        </li>
        ))}
        </ul>
    </div>
</div>
)
}

export default HandleAdminPlanning