import React from 'react';
import { useReducer } from 'react';
import formReducerConnect from '../../reducer/formReducerConnect';
import config from '../../config.json'


const Singup = ({isActive, setIsActive, updateUser, setUpdateUser, feed, updateFeed}) => {
    // Constance identifications
    let token = localStorage.getItem('token')
    // Iniatialisation du formulaire 
    const initialFormState = {
        form : {
            firstName: "",
            lastName: "",
            birthday: "",
            service: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        regex : {
            firstName: true,
            lastName: true,
            birthday: true,
            service: true,
            email: true,
            password: true,
            confirmPassword: true,
        },
        files : { 
            profilPicture: null
        },
        states : {
            checked: false,
            redirectToReferrer: false,
        }
    }
    const [formState, dispatch] = useReducer(formReducerConnect, initialFormState)

    // HandleChange du formulaire
    const handleTextChange = (e) => {
        dispatch({
            type: "HANDLE INPUT TEXT",
            field: e.target.name,
            payload: e.target.value ,
        })
        dispatch({
            type: "HANDLE REGEX",
            field: e.target.name,
            payload: listRegex[e.target.name].regexTest.test(e.target.value),
        })
    }
    // Gestion Fichiers 'files'
    const handleNewFile = (e) => {
        dispatch({
            type: "NEW FILE",
            field: e.target.name,
            payload: e.target.files[0],
        })
    }

// Gestion du Submit du formulaire
async function handleSubmit(e) {
    e.preventDefault()
    // Type de Fetch PUT/POST
    const fetchMethod = updateUser ? 'PUT' : 'POST'
    const fetchAdress = updateUser ? updateUser : 'signup'
    // Informations à push
    let user = {...formState.form, ...formState.files}
    let body = new FormData();
    for (let i in user) {
        user[i] && body.append(i, user[i])
    }
    // Options Fetch
    const requestOptions = {
        method: fetchMethod,
        body: body,
        headers: {
            'Authorization': `token ${token}`
        }
    }
    // Test Regex
    let isRegexValid = true
    for (const testR in formState.regex) {
        if (!formState.regex[testR]) {
            isRegexValid = false
            }}
    // Fetch
    if (isRegexValid) {
        fetch(`http://localhost:4000/api/auth/${fetchAdress}`, requestOptions)
            .then((res) => res.json())
            .finally((res) => {
                updateUser ? setUpdateUser(null) : setIsActive('login')
                updateFeed(true)
            })
            .catch((err) => err)
    } else {console.log('Formulaire incomplet')}
}
    
let listRegex = {
    firstName:
        {'label': "firstName",
        'regexTest' : /^[a-z ,.'-]+$/i,
        'text' : "Merci d'utiliser uniquement des lettres ou ' - ."
        },
    lastName:
        {'label': "lastName",
        'regexTest' : /^[a-z ,.'-]+$/i,
        'text' : "Merci d'utiliser uniquement des lettres ou ' - ."
        },
    service:
        {'label': "service",
        'regexTest' : /^(?!\s*$).+/,
        'text' : "Merci de choisir un service dans la liste"
        },
    email:
        {'label': "email",
        'regexTest' : /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        'text' : "Merci d'utiliser une adresse correct avec [nom]@[domaine].[extension]"
        },
    password:
        {'label': "password",
        'regexTest' : /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        'text' : "Merci de choisir un mot de passe avec minimum: 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère sépcial"
        },
    confirmPassword:
        {'label': "confirmPassword",
        'regexTest' : /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        'text' : "Vos mots de passe ne correspondent pas"
        },
    birthday:
        {'label': "birthday",
        'regexTest' : /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/,
        'text' : "Merci d'utiliser une format de date correcte JJ/MM/AAAA"
        },
    }
    return (
        <div>
            <form>
            {updateUser && <span id='update-info'>🚨 Renseignez uniquement les informations à mettre à jour</span>}
                <h2>Mon compte :</h2>
                <div className={`input-group ${!formState.regex.email ? "errorInput" :""}`}>
                    <input 
                        type="email" 
                        name='email' 
                        id='email' 
                        placeholder='Rentrez votre email' 
                        onChange={(e) => handleTextChange(e)}/>
                    <div className="input-icon"><i className="fa fa-envelope"></i></div>
                </div>
                {!formState.regex.email && <div className='error'>{listRegex.email.text}</div> }
                
                <div className={`input-group ${!formState.regex.password ? "errorInput" :""}`}>
                    <input 
                        type="password" 
                        name='password' 
                        id='password' 
                        placeholder='Rentrez votre mot de passe' 
                        onChange={(e) => handleTextChange(e)}/>
                    <div className="input-icon"><i className="fa fa-key"></i></div>
                </div>
                {!formState.regex.password && <div className='error'>{listRegex.password.text}</div> }

                <div className={`input-group ${(!formState.regex.password || formState.form.confirmPassword != formState.form.password) ? "errorInput" :""}`}>
                    <input 
                    type="password" 
                    name='confirmPassword' 
                    id='confirmPassword' 
                    placeholder='Confirmez votre mot de passe' 
                    onChange={(e) => handleTextChange(e)}/>
                    <div className="input-icon"><i className="fa fa-key"></i></div>
                </div>
                {(!formState.regex.confirmPassword || formState.form.confirmPassword != formState.form.password)&& <div className='error'>{listRegex.confirmPassword.text}</div> }
                
                <h2>Mes informations :</h2>
                <div className={`input-group ${!formState.regex.firstName ? "errorInput" :""}`}>
                    <input 
                        type="text" 
                        name='firstName' 
                        id='prenom' 
                        placeholder='Rentrez votre prénom:' 
                        onChange={(e) => handleTextChange(e)} />
                    <div className="input-icon"><i className="fa fa-user"></i></div>
                </div>
                {!formState.regex.firstName && <div className='error'>{listRegex.firstName.text}</div> }
                
                <div className={`input-group ${!formState.regex.lastName ? "errorInput" :""}`}>
                    <input type="text" 
                        name='lastName' 
                        id='nom' 
                        placeholder='Rentrez votre Nom:' 
                        onChange={(e) => handleTextChange(e)}/>
                    <div className="input-icon"><i className="fa fa-user"></i></div>
                </div>
                {!formState.regex.lastName && <div className='error'>{listRegex.lastName.text}</div> }
                
                <div className={`input-group ${!formState.regex.service ? "errorInput" :""}`}>
                    <select 
                        name="service" 
                        id="service" 
                        value={formState.form.service} 
                        onChange={(e) => handleTextChange(e)}>
                        <option value=""></option>
                        {config.services.slice(1).map((service, index) => 
                        (<option key={index} value={service} >{service}</option>))}
                    </select>
                    <div className="input-icon"><i className="fa fa-briefcase"></i></div>
                    {!formState.form.service && <label className='service' htmlFor="service">Votre service :</label>}
                </div>
                {!formState.regex.service && <div className='error'>{listRegex.service.text}</div> }
                
                <div className="input-group">
                    <fieldset>
                    <label htmlFor='date'>
                        <input 
                            type='checkbox' 
                            name='checked'
                            id='date'
                            onChange={(e) => dispatch({type: "TOGGLE CHECKED"})}/>
                        Je ne souhaite pas rentrer ma date de naissance
                    </label>
                    </fieldset>
                </div>

                {!formState.states.checked && (
                <div className={`input-group ${!formState.regex.birthday ? "errorInput" :""}`}>
                    <input 
                        type="date" 
                        name="birthday"
                        className='date' 
                        onChange={(e) => handleTextChange(e)}/>
                    <div className="input-icon"><i className="fa fa-cake-candles"></i></div>
                </div>)}
                {!formState.regex.birthday && <div className='error'>{listRegex.birthday.text}</div> }
                
                <div className="input-group">
                    <label htmlFor='image' className='label-image'>Choisir une photo de profil</label>
                    <div className="input-icon"><i className="fa fa-image"></i></div>
                    <input 
                        type='file' 
                        id='image' 
                        name='profilPicture'
                        className='input-image' 
                        onChange={(e) => handleNewFile(e)}/>
                </div>

                {formState.files.profilPicture && (
                <div className="profil-sum">
                
                    <div id='image'>
                        <img alt="not fount" width={"150px"} src={URL.createObjectURL(formState.files.profilPicture)} />
                        <br />
                        <button 
                            name='profilPicture'
                            onClick={()=>dispatch({type: "DELETE FILE"})}>Supprimer</button>
                    </div>
                    <div id="infos">
                    {(formState.form.firstName || formState.form.lastName )&& <div id="name"><i className="fa fa-user"></i> {formState.form.firstName} {formState.form.lastName}</div>}
                        {formState.form.service && <div id="service"><i className="fa fa-briefcase"></i> {formState.form.service}</div>}
                        {formState.form.date && <div id="birthdate"><i className="fa-solid fa-cake-candles"></i> {formState.form.date}</div>}
                    </div>
                </div>
                )}
                <div className='Submit'>
                    {updateUser && <button id='cancel-update' onClick={() => setUpdateUser(null)}>Annuler</button>}
                    <button onClick={(e) => handleSubmit(e)}>{updateUser ? 'Modifier mes infos' : 'Créer un compte'}</button>
                </div>
            </form>
        </div>
    );
};

export default Singup;