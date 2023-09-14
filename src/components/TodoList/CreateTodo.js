import React, { useState, useRef, useEffect} from 'react'
import config from '../../config.json'

const CreateTodo = ({setTodoUpdate, todoUpdate, token, todoUpdateAllow, setTodoUpdateAllow, value}) => {
    // Déclaration pour gestion du form
    const textareaRef = useRef(null)
    const [updateTitleValue, setUpdateTitleValue ] = useState("")
    const [visibilytyValue, setVisibilityValue] = useState(config.visibility[0])
    
    // Initialise les valeurs en édition
    useEffect(() => {
        if (value) {
            setUpdateTitleValue(value.title)
            setVisibilityValue(value.visibility)
        }
    }, [])

    // Création d'une liste
    function handleTodoCreate() {
        const method = value ? 'PUT' : 'POST'
        let todoInfo = {
            "title": updateTitleValue,
            "visibility": visibilytyValue}
        let requestOptions = {
            method: method,
            body: JSON.stringify(todoInfo),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `token ${token}`}
            }
        fetch(`http://localhost:4000/api/todolist/${value ? value.id : ''}`, requestOptions)
            .then((res) => res.json())
            .catch((err) => err)
            .finally(() => {
                setTodoUpdate(true)
                setTodoUpdateAllow('')})
    }

    // Suppression d'une liste
    function handleTodoDelete() {
        let requestOptions = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `token ${token}`}
            }
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette liste ?")) {
            fetch(`http://localhost:4000/api/todolist/${value.id}`, requestOptions)
                .then((res) => res.json())
                .catch((err) => err)
                .finally(() => {
                    setTodoUpdate(true)
                    setTodoUpdateAllow('')})
        }
    }
    return (
    <div id='create-list'>
        <h2> {!value ? 'Créér' : 'Modifier'} une liste</h2>
        <div className='list-info'>
            <div className='list-title-zone'>
                <h3>Choisir nom de la liste :</h3>
                <textarea 
                    className='list-descriptif'
                    placeholder='Choisir le nom de la liste...' 
                    ref={textareaRef}
                    required
                    value={updateTitleValue}
                    onChange={(e) => setUpdateTitleValue(e.target.value)}        
                />
                <h3 className='list-share'>Visibilté:</h3>
                <label id='visibility'></label>
                <select 
                    name="todoVisibily" 
                    id="todoVisibily"
                    value={visibilytyValue}
                    onChange={(e) => setVisibilityValue(e.target.value)}>
                    {config.visibility.map((visibility, index) => (
                    <option key={index} value={visibility} >{visibility}</option>
                    ))}
                </select>
            </div>
        </div>
        {value && <button className="cancel-update" onClick={() => setTodoUpdateAllow('')}><i className="fa-solid fa-ban"></i> Annuler</button>}
        {value && <button className="cancel-update" onClick={() => handleTodoDelete()}><i className="fa-solid fa-trash-can"></i> Supprimer la liste</button>}
        <button className='validate-list'onClick={() => handleTodoCreate()}><i className="fa-solid fa-circle-check"></i>
            {!value ? 'Valider' : ' Modifier'} la liste
        </button>
    </div>
    )
}

export default CreateTodo