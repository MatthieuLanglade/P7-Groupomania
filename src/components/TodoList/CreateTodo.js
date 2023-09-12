import React, { useState, useRef} from 'react'
import config from '../../config.json'

const CreateTodo = ({setTodoUpdate, todoUpdate, token}) => {
    // Déclaration pour gestion du form
    const textareaRef = useRef(null)
    const [updateTitleValue, setUpdateTitleValue ] = useState("")
    const [visibilytyValue, setVisibilityValue] = useState(config.visibility[0])

    // Création d'une liste
    function handleTodoCreate() {
        let todoInfo = {
            "title": updateTitleValue,
            "visibility": visibilytyValue}
        let requestOptions = {
            method: 'POST',
            body: JSON.stringify(todoInfo),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `token ${token}`}
            }
        console.log(requestOptions)
        fetch('http://localhost:4000/api/todolist', requestOptions)
            .then((res) => res.json())
            .then((data) => {
                console.log('TODOLIST Créé', data)})
            .catch((err) => err)
            .finally(setTodoUpdate(true))
    }

    return (
    <div id='todolist'>
        <div id='create-list'>
            <h2> Créer une liste</h2>
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
            <button 
            className='validate-list'
            onClick={() => handleTodoCreate()}>
                <i className="fa-solid fa-circle-check"></i>
                Valider la liste
            </button>
        </div>
    </div>
    )
}

export default CreateTodo