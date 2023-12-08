import React, { useEffect, useState } from 'react'

function HandleAdminPlanning() {
    //States 
    const [configPlanning, setConfigPlanning] = useState([])
    const [postesList, setPostesList] = useState([])
    const [hoverPoste, setHoverPoste] = useState('')
    const [selectedPoste,setSelectedPoste] = useState([])
    const [feed, updateFeed] = useState(true)
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
        const posteId = selectedPoste.filter(f => f.serviceId == idATester)[0].posteId
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
    // Gérer Nouveau 
  return (
    <div id='config-planning'>
        <h2>Gestion de l'organigramme des équipes.</h2>
        <div id='config-list'>
        <ul>
        <li className='ajout-service'>
            <div className='validate-choice'><i className="fa-solid fa-check"></i></div>
            <textarea
                placeholder='Ajouter un service'
            ></textarea>
        </li>
        {configPlanning.map((service, index) => (
            <li 
            className='list-service' 
            key={service.id}>
                    <h3>{index+1}. {service.nomService}</h3>
                <ul>
                    <li className='ajout-poste' >
                        <div 
                        className='validate-choice'
                        onClick={() => handlePosteService(service.id)}
                        ><i className="fa-solid fa-plus"></i></div>
                        <label for='poste-select'></label>
                        <select id='poste-select' 
                        onChange={(e) => setSelectedPoste([...selectedPoste.filter(f => f.serviceId !== service.id), {'posteId':e.target.value, 'serviceId': service.id}])}>
                            <option value=''>--Sélectionner un poste--</option>
                        {postesList
                            .filter(poste => !listPostesUtilise(service).includes(poste.id))
                            .map((poste) => (
                            <option value={poste.id}>
                                {poste.nomPoste}
                            </option>
                        ))}
                            <option className='nouveau-poste'>
                                Nouveau Poste:
                            </option>
                        </select>
                        {selectedPoste.some(objet => objet.serviceId == service.id && objet.posteId == "Nouveau Poste:")
                        &&
                        <textarea
                            type='text'
                            name='poste'
                            id={service.id}
                            placeholder='Ajouter un poste'/>
                        }
                    </li>
                    {service.PosteService.map((poste, index) => (
                        <li className='list-poste' 
                        key={poste.id}
                        onMouseEnter={() => setHoverPoste(poste.id)}
                        onMouseLeave={() => setHoverPoste('')}>
                            {index+1}.  {poste.Postes.nomPoste}
                            <div className={`delete-poste ${hoverPoste === poste.id ? 'display' : ''}`}>
                            <i className="fa-solid fa-trash"></i>
                            Supprimer le poste 
                            </div>
                            </li>
                        ))}
                </ul>
            </li>
        ))}
        </ul>
        </div>
    </div>
  )
}

export default HandleAdminPlanning