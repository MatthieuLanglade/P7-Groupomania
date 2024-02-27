import React, { useEffect, useState } from 'react'

function ShowPlanning() {
    // States 
        // Date
    const [anneeValue,setAnneeValue] = useState('')
    const [moisValue, setMoisValue] = useState('')
    const [monthValue, setMonthValue] = useState('')
        // Choix du SELECT 
    const [serviceValue, setServiceValue] = useState(0)
    const [posteValue, setPosteValue] = useState('')
    const [equipeValue, setEquipeValue] = useState('')
        // Affichage
    const [showGardes, setShowGardes] = useState(true)
    const [showCongesDemandes, setShowCongesDemandes] = useState(false)
    const [showHeuresSup, setShowHeuresSup] = useState(false)
        // Données 
    const [servicesList, setServicesList] = useState([]) // Données Services + Association
    const [userList, setUserList] = useState([]) // Données Users
        // MAJ DOM
    const [feed, updateFeed] = useState(true)

    // UseEffect 
    useEffect(() => {
        fetchConfigPlanning()
        fetchUsers()
        // Récupération des Services Avec Associations
        async function fetchConfigPlanning() {
            try {
                const resp = await fetch(`http://localhost:4000/api/configPlanning/services/`)
                const respConfigPlanning = await resp.json() 
                setServicesList(respConfigPlanning.services)
            } 
            catch (err) {console.log(err)}
            finally {updateFeed(false)}
        } 
        // Récupération des Users
        async function fetchUsers() {
            try {
                const resp = await fetch(`http://localhost:4000/api/auth/all/`)
                const respUser = await resp.json() 
                setUserList(respUser)
            } 
            catch (err) {console.log(err)}
            finally {updateFeed(false)}
            console.log({servicesList})
        } 
    },[updateFeed])
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

    // Fonction Jours Feriés 
    function JoursFeries (an){
        // Possiblement à gérer dans les paramètres, activer/désactiver selon sa région
        var JourAn = new Date(an, "00", "01")
        var FeteTravail = new Date(an, "04", "01")
        var Victoire1945 = new Date(an, "04", "08")
        var FeteNationale = new Date(an,"06", "14")
        var Assomption = new Date(an, "07", "15")
        var Toussaint = new Date(an, "10", "01")
        var Armistice = new Date(an, "10", "11")
        var Noel = new Date(an, "11", "25")
        // var SaintEtienne = new Date(an, "11", "26")
        
        var G = an%19
        var C = Math.floor(an/100)
        var H = (C - Math.floor(C/4) - Math.floor((8*C+13)/25) + 19*G + 15)%30
        var I = H - Math.floor(H/28)*(1 - Math.floor(H/28)*Math.floor(29/(H + 1))*Math.floor((21 - G)/11))
        var J = (an*1 + Math.floor(an/4) + I + 2 - C + Math.floor(C/4))%7
        var L = I - J
        var MoisPaques = 3 + Math.floor((L + 40)/44)
        var JourPaques = L + 28 - 31*Math.floor(MoisPaques/4)
        var Paques = new Date(an, MoisPaques-1, JourPaques)
        // var VendrediSaint = new Date(an, MoisPaques-1, JourPaques-2)
        var LundiPaques = new Date(an, MoisPaques-1, JourPaques+1)
        var Ascension = new Date(an, MoisPaques-1, JourPaques+39)
        var Pentecote = new Date(an, MoisPaques-1, JourPaques+49)
        var LundiPentecote = new Date(an, MoisPaques-1, JourPaques+50)
        
        return new Array(JourAn, Paques, LundiPaques, FeteTravail, Victoire1945, Ascension, Pentecote, LundiPentecote, FeteNationale, Assomption, Toussaint, Armistice, Noel)
    }

    // Fonction de Renvoi de classe pour type de jour (Sat/Sun/Fer)
    const numeroJour = (jour) => {
        const dateJour = new Date(anneeValue, monthValue, jour)
        const dateDay = dateJour.getDay()
        // Verifie si férié
        const estFerie = JoursFeries(anneeValue).find(
            date => date.toDateString() === dateJour.toDateString()
        )
        if (estFerie !== undefined ) {
            return 'leg-Fer'
        }
        else {
            // Verifie si Samedi/Dimanche
            switch (dateDay) {
                case 6 : return 'leg-Sat'
                case 0 : return 'leg-Sun' 
                default : return ''
            }
        }
    }

    const annee = [2019,2020,2021,2022,2023,2024,2025]
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
    {console.log('USERS', userList,'SERVICES', servicesList)}
{/* CHOIX DE PLANNING */}
<div className='block-titre'>
    <h3>Sélection de l'équipe</h3>
    {/* CHOIX DE SERVICE-POSTE-EQUIPE */}
    <div className='selection'>
        {/* CHOIX SERVICE */}
        <select id='services' onChange={(e) => {setEquipeValue('');setPosteValue('');setServiceValue(e.target.value)}}>
            <option selected value=''>-- Sélectionner un Service --</option>
            {servicesList.map((service) => (
            <option key={service.id} value={service.id}>{service.nom}</option>
            ))}
        </select>
        {/* CHOIX POSTE */}
        <select id='postes' onChange={(e) => {setEquipeValue('');setPosteValue(e.target.value)}}>
            <option selected value=''>-- Sélectionner un Poste --</option>
            {serviceValue 
            ? servicesList.filter(f => f.id == serviceValue)[0].ServicePostes.map((poste) =>
            <option key={poste.id} value={poste.id}>{poste.Postes.nom}</option>)
            : ''}
        </select>
        {/* CHOIX EQUIPE */}
        <select id='equipe'onChange={(e) => setEquipeValue(e.target.value)}>
            <option selected value=''>-- Sélectionner une Equipe --</option>
            {posteValue 
            ? servicesList
                .filter(f => f.id == serviceValue)[0].ServicePostes
                .filter(e => e.id == posteValue)[0].PosteEquipes.map((equipe) => (
                <option key={equipe.id} value={equipe.id}>{equipe.Equipes.nom}</option>))
            : ''}
        </select>
        {/* VALIDER LA SELECTION */}
        <div className='validation-selection'><i className="fa-solid fa-square-check"></i></div>
    </div>
    <h3>Sélection de la période</h3>
    {/* CHOIX DE PERIODE */}
    <div className='selection'>
        {/* CHOIX ANNEE */}
        <select id='annee' onChange={(e) => setAnneeValue(e.target.value)}>
            <option selected value=''>-- Sélectionner une Année --</option>
            {annee.map((annee, index) => (
            <option key={index} value={annee}>{annee}</option>
            ))}
        </select>
        {/* CHOIX MOIS */}
        <select id='mois'value={moisValue} onChange={(e) => (
                setMoisValue(e.target.value),
                setMonthValue(correspondance[e.target.value]))}>
            <option selected value=''>-- Sélectionner un Mois --</option>
            {Object.keys(correspondance).map((mois, index) => (
            <option key={index} value={mois} >{mois}</option>))}
        </select>
    </div>
    <h3>Affiner Affichage</h3>
    {/* FILTRES D'AFFICHAGE */}
    <div id='filtre-planning' className='gardes'>
        <input class="tgl tgl-skewed" id="cb3" type="checkbox" checked={showGardes} onChange={() => setShowGardes(!showGardes)}/>
        <label class="tgl-btn" data-tg-off="Gardes" data-tg-on="Gardes" for="cb3"></label>
        <input class="tgl tgl-skewed" id="cb5" type="checkbox" checked={showCongesDemandes} onChange={() => setShowCongesDemandes(!showCongesDemandes)}/>
        <label class="tgl-btn" data-tg-off="Congés demandés" data-tg-on="Congés demandés" for="cb5"></label>
        <input class="tgl tgl-skewed" id="cb4" type="checkbox" hecked={showHeuresSup} onChange={() => setShowHeuresSup(!showHeuresSup)}/>
        <label class="tgl-btn" data-tg-off="Heures sup" data-tg-on="Heures sup" for="cb4"></label>
    </div>
</div>
{/* AFFICHAGE DU PLANNING */}
<div className='block-list'>
    <h3>Planning</h3>
    <div className='mois-planning'>
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
                {agents
                .map((agent) => (
                    <>
                    {/* Affichage des Gardes */
                    showGardes && 
                    <tr className='nom-agent' key={agent.id}>
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
    </div>
</div>
{/* AFFICHAGE LEGENDE */}
<div className='block-list'>
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
</div>
{/* AFFICHAGE STATISTIQUES */}
<div className='block-list'>
    <h3>Statistiques</h3>
    <div id='statistiques'>
        <table>
            <thead>
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
                        {/* AFFICHAGE STATISTIQUES */}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>
</div>
)
}

export default ShowPlanning