import React, { useState } from 'react'

function ShowPlanning() {
    // States 
        // Date
    const [anneeValue,setAnneeValue] = useState('')
    const [moisValue, setMoisValue] = useState('')
    const [monthValue, setMonthValue] = useState('')
        // Service
    const [serviceValue, setServiceValue] = useState('')
    const [jourNuitValue, setJourNuitValue] = useState('')
        // Affichage
    const [showGardes, setShowGardes] = useState(true)
    const [showCongesDemandes, setShowCongesDemandes] = useState(false)
    const [showHeuresSup, setShowHeuresSup] = useState(false)

    // Corespondance Dates 
    const correspondance = {
        "Janvier" : 0,
        "Février" : 1,
        "Mars" : 2,
        "Avril" : 3,
        "Mai" : 4,
        "Juin" : 5,
        "Juillet" : 6,
        "Août" : 7,
        "Septembre" : 8,
        "Octobre" : 9,
        "Novembre" : 10,
        "Décembre" : 11
    }

    // Formules sur Date
    const premierDuMois = new Date(anneeValue, monthValue, 1)
    const dernierDuMois = new Date(anneeValue, monthValue + 1, 0)
    const nombreDeJour = dernierDuMois.getUTCDate()

    // Fonction de Renvoi du numéro du jour
    const numeroJour = (jour) => {
        const dateJour = new Date(anneeValue, monthValue, jour)
        const dateDay = dateJour.getDay()
        // A rajouter: le test du férié.
        switch (dateDay) {
            case 6 : return 'leg-Sat'
            case 0 : return 'leg-Sun' 
            default : return ''
        }
    }

    const annee = [2019,2020,2021,2022,2023,2024,2025]
    const services = [
        "Urgences", 
        "USLD",
        "Médecine",
        "Consultations"
    ]
    const jourNuit = [
        "Jour",
        "Nuit"
    ]
    const testStockage = {
        "Agent 1" : {
            "Annee": 2023,
            "Mois": 1,
            "Jour": 1,
            "Gardes":true,
            "HS":0
        }
    }
    const agents = [
        {
            id: 1,
            nom: "Langlade",
            prénom: "Matthieu"
        },
        {
            id: 2, 
            nom: "Hydro",
            prénom: "Flaubert"
        },
        {
            id: 3, 
            nom: "Mosk",
            prénom: "Franck"
        },
        {
            id: 4, 
            nom: "Mosk",
            prénom: "Franck"
        },
        {
            id: 5, 
            nom: "Mosk",
            prénom: "Franck"
        },
        {
            id: 6, 
            nom: "Mosk",
            prénom: "Franck"
        },
    ]
    const jours = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]


  return (
    <div id='choice-planning'>
        <div id='selection'>
            <select 
                id='annee'
                onChange={(e) => setAnneeValue(e.target.value)}>
            {annee.map((annee) => (
                <option value={annee}>{annee}</option>
            ))}
            </select>
            <select 
                id='mois'
                value={moisValue}
                onChange={(e) => (
                    setMoisValue(e.target.value),
                    setMonthValue(correspondance[e.target.value]))}>
            {Object.keys(correspondance).map((mois) => (
                <option value={mois} >{mois}</option>
            ))}
            </select>
            <select 
                id='services'
                onChange={(e) => setServiceValue(e.target.value)}>
            {services.map((services) => (
                <option value={services}>{services}</option>
            ))}
            </select>
            <select 
                id='jourNuit'
                onChange={(e) => setJourNuitValue(e.target.value)}>
            {jourNuit.map((jourNuit) => (
                <option value={jourNuit}>{jourNuit}</option>
            ))}
            </select>
        </div>
        <div id='filtre-planning' className='gardes'>
            <input class="tgl tgl-skewed" id="cb3" type="checkbox" checked={showGardes} onChange={() => setShowGardes(!showGardes)}/>
            <label class="tgl-btn" data-tg-off="Gardes" data-tg-on="Gardes" for="cb3"></label>
            <input class="tgl tgl-skewed" id="cb5" type="checkbox" checked={showCongesDemandes} onChange={() => setShowCongesDemandes(!showCongesDemandes)}/>
            <label class="tgl-btn" data-tg-off="Congés demandés" data-tg-on="Congés demandés" for="cb5"></label>
            <input class="tgl tgl-skewed" id="cb4" type="checkbox" hecked={showHeuresSup} onChange={() => setShowHeuresSup(!showHeuresSup)}/>
            <label class="tgl-btn" data-tg-off="Heures sup" data-tg-on="Heures sup" for="cb4"></label>
        </div>
        <div className='mois-planning'>
            <h3>{moisValue} {anneeValue} - {serviceValue} - {jourNuitValue}</h3>
            <table>
                <thead>
                    <tr>
                        <th >Nom / Jour</th>
                        <th>Type</th>
                        {jours
                            .slice(0, nombreDeJour + 1)
                            .map((jour) => (
                            <th key={jour} className={numeroJour(jour)}>{jour}</th>
                        )) }
                    </tr>
                </thead>
                <tbody>
                    {agents.map((agent) => (
                        <>
                        {/* Affichage des Gardes */
                        showGardes && 
                        <tr key={agent.id}>
                            <td rowSpan={showGardes + showCongesDemandes + showHeuresSup}>{agent.prénom +" "+ agent.nom}</td> 
                            <td>Garde</td>
                            {jours
                                .slice(0, nombreDeJour + 1)
                                .map((jour) => (
                                    <td key={jour} className={`table-a-cocher ${numeroJour(jour)}`}>
                                </td>))}
                        </tr>}

                        {/* Affichage des Congés */
                        showCongesDemandes && 
                        <tr key={agent.id}>
                            <td>Congés</td>
                            {jours
                                .slice(0, nombreDeJour + 1)
                                .map((jour) => (
                                    <td key={jour} className={`table-a-cocher ${numeroJour(jour)}`}>
                                </td>))}
                        </tr>}

                        {/* Affichage des Heures Sup */
                        showHeuresSup && 
                        <tr key={agent.id}>
                            <td>Hr Sup</td>
                            {jours
                                .slice(0, nombreDeJour + 1)
                                .map((jour) => (
                                    <td key={jour} className={`table-a-cocher ${numeroJour(jour)}`}>
                                </td>))}
                        </tr>}
                        </>
                    ))}
                </tbody>
            </table>
            <h3>Légendes</h3>
            <div id='legende'>
            <table>
                <tr>
                    <td className='leg-Sat legende'></td>
                    <td>Samedi</td>
                </tr>
                <tr>
                    <td className='leg-Sun legende'></td>
                    <td>Dimanche</td>
                </tr>
                <tr>
                    <td className='leg-Fer legende'></td>
                    <td>Férié</td>
                </tr>
            </table>
            <table>
                <tr>
                    <td className='leg-Gar legende'></td>
                    <td>Garde validée</td>
                </tr>
                <tr>
                    <td className='leg-HrS legende'></td>
                    <td>Garde sélectionnée</td>
                </tr>
                <tr>
                    <td className='leg-CoM legende'></td>
                    <td>Congé maladie</td>
                </tr>
            </table>
            </div>

            {/* <button>Valider planning</button> */}
            
            <h3>Statistiques</h3>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th colSpan='5'>{moisValue}</th>
                        <th colSpan='5'>{anneeValue}</th>
                    </tr>
                    <tr>
                        <th >Nom</th>
                        <th>Nombre de gardes</th>
                        <th>CM restants</th>
                        <th>RH restants</th>
                        <th>Heures Sup réalisées</th>
                        <th>Heures Sup payées</th>
                        <th>Nombre de gardes</th>
                        <th>CM restants</th>
                        <th>RH restants</th>
                        <th>Heures Sup réalisées</th>
                        <th>Heures Sup payées</th>
                    </tr>
                </thead>
                <tbody>
                    {agents.map((agent) => (
                        <tr key={agent.id}>
                            <td>{agent.prénom +" "+ agent.nom}</td>
                        {/* {jours
                            .slice(0, nombreDeJour + 1)
                            .map((jour) => (
                            <td key={jour} className={`table-a-cocher ${numeroJour(jour)}`}>
                            </td>
                        )) } */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ShowPlanning