import React, { useEffect, useReducer } from 'react';
import formReducerConnect from '../../reducer/formReducerConnect';

const Login = ({loading, setloading}) => {

    // Iniatialisation du formulaire 
    const initialFormState = {
        form : {
            email: "",
            password: "",
        },
        regex : {
            email: true,
            password: true,
        },
        states : {
            redirectToReferrer: false,
        }
    }
    const [formState, dispatch] = useReducer(formReducerConnect, initialFormState)

    // HandleChange du formulaire
    const handleTextChange = (e) => {
        dispatch({
            type: "HANDLE INPUT TEXT",
            field: e.target.name,
            payload: e.target.value,
        })
        dispatch({
            type: "HANDLE REGEX",
            field: e.target.name,
            payload: listRegex[e.target.name].regexTest.test(e.target.value),
        })
    }

    // Fonction de Connection    
    function handleSubmit(e) {
        e.preventDefault();
        // Options Fetch
        const requestOptions = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formState.form)
        };
        // Test Regex
        let isRegexValid = true
        for (const testR in formState.regex) {
            if (!formState.regex[testR]) {
                isRegexValid = false
                }}
        // Fetch
        if (isRegexValid) {
        fetch('http://localhost:4000/api/auth/login', requestOptions)
            .then((res) => res.json())
            .then((data) => {
                localStorage.clear()
                localStorage.setItem('token', data.token)
                localStorage.setItem('userId', data.userId)
                localStorage.setItem('admin', data.admin)
                console.log('=== Connecté ===')
                dispatch("TOGGLE REDIRECT")
                setloading(true)
            })
            .catch((err) => console.log(err))
        } else {console.log('Formulaire incomplet')}
    }
    useEffect(() => {
        
    }, [loading])
    
/* Contrôle des entrées */
/* Tableau des règles Regex*/
let listRegex = {
    email:
        {'label': "email",
        'regexTest' : /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        'text' : "Merci d'utiliser une adresse correct avec [nom]@[domaine].[extension]"
        },
    password:
        {'label': "password",
        'regexTest' : /^(?!\s*$).+/,
        'text' : "Merci de rentrer votre mot de passe"
        },
    }

    return (
        <div>
            <form>
                <div className={`input-group ${!formState.regex.email ? "errorInput" :""}`}>
                    <input 
                        type="email" 
                        name='email' 
                        id='email' 
                        placeholder='Rentrez votre email'
                        value={formState.form.email} 
                        onChange={(e) => handleTextChange(e)}/>
                    <div className="icon icon--input"><i className="fa fa-user"></i></div>
                </div>
                {!formState.regex.email && <div className='error'>{listRegex.email.text}</div> }
                <div className="input-group">
                    <input 
                        type="password" 
                        name='password' 
                        id='password' 
                        placeholder='Rentrez votre mot de passe' 
                        value={formState.form.password}
                        onChange={(e) => handleTextChange(e)}/>
                    <div className="icon icon--input"><i className="fa fa-key"></i></div>
                </div>
                {!formState.regex.password && <div className='error'>{listRegex.password.text}</div> }
                <button 
                    onClick={(e) =>{handleSubmit(e)}}
                    >Connectez vous</button>
            </form>
        </div>
    );
};

export default Login;