import React from 'react'

function ShowPlanning() {
    const identifieSamedi = () => {
        
    }
    const annee = [2019,2020,2021,2022,2023,2024,2025]
    const mois = [
        "Janvier",
        "Février", 
        "Mars", 
        "Avril", 
    ]
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
    ]
    const jours = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]

  return (
    <div id='choice-planning'>
        <div id='selection'>
            <select id='annee'>
            {annee.map((annee) => (
                <option value={annee}>{annee}</option>
            ))}
            </select>
            <select id='mois'>
            {mois.map((mois) => (
                <option value={mois}>{mois}</option>
            ))}
            </select>
            <select id='services'>
            {services.map((services) => (
                <option value={services}>{services}</option>
            ))}
            </select>
            <select id='jourNuit'>
            {jourNuit.map((jourNuit) => (
                <option value={jourNuit}>{jourNuit}</option>
            ))}
            </select>
        </div>
        <div id='filtre-planning' className='gardes'>
            <input class="tgl tgl-skewed" id="cb3" type="checkbox"/>
            <label class="tgl-btn" data-tg-off="Gardes" data-tg-on="Gardes" for="cb3"></label>
            <input class="tgl tgl-skewed" id="cb5" type="checkbox"/>
            <label class="tgl-btn" data-tg-off="Congés demandés" data-tg-on="Congés demandés" for="cb5"></label>
            <input class="tgl tgl-skewed" id="cb4" type="checkbox"/>
            <label class="tgl-btn" data-tg-off="Heures sup" data-tg-on="Heures sup" for="cb4"></label>
        </div>
        <div className='mois-planning'>
            <h3>Avril 2019 - USLD - Nuit</h3>
            <table>
                <thead>
                    <tr>
                        <th >Nom / Jour</th>
                        {jours.map((jour) => (
                            <th key={jour}>{jour}</th>
                        )) }
                    </tr>
                </thead>
                <tbody>
                    {agents.map((agent) => (
                        <tr key={agent.id}>
                            <td>{agent.prénom +" "+ agent.nom}</td>
                        {jours.map((jour) => (
                            <td key={jour} className='table-a-cocher'>
                            </td>
                        )) }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ShowPlanning