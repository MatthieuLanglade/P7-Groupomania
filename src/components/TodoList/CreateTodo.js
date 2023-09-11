import React, { useState, useRef, useEffect } from 'react'
import listComplete from './structure.json'
import config from '../../config.json'

const CreateTodo = () => {
    // States 
    const [listVisibility, setListVisibility] = useState([])
    const [listTodoList, setListTodoList] = useState([])
    const [todoUpdate, setTodoUpdate] = useState(true)
    // Constante identifications
    let token = localStorage.getItem('token')
    // Déclaration pour gestion du form
    const textareaRef = useRef(null)
    const [updateTitleValue, setUpdateTitleValue ] = useState("")
    const [visibilytyValue, setVisibilityValue] = useState(config.visibility[0])
    const [updateElementValue, setUpdateElementValue ] = useState([{id: 0, value: ''}])
    const [myArray, setMyArray] = useState([])

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

    // useEffect : Récupération des listes TODO
    useEffect(() => {
        fetchTodoList()
        async function fetchTodoList() {
            let token = localStorage.getItem('token')
            try {
                const response = await fetch('http://localhost:4000/api/todolist', 
                {
                    method: "GET",
                    headers: {'Authorization': `token ${token}`}
                })
                const respTodoList = await response.json()
                setListTodoList(respTodoList)
            } catch (err){console.log(err)}
            finally{setTodoUpdate(false)}
        }
    }, [todoUpdate])

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
    // Gestion des input d'élément 
    function handleElementUpdate(e) {
        const {id, value} = e.target
        let ligneExiste = false
        for (let i in updateElementValue) {
            if (updateElementValue[i].id == id) {ligneExiste = true}
        }
        setUpdateElementValue(
            ligneExiste 
            ? searchIdElement(id, value)
            : [...updateElementValue, {id : id, value: value} ]
        )
    }
    // Création d'un élément
    // Gestion de la recherche de l'id dans l'useState
    function searchIdElement(todoId, value) {
        return updateElementValue.map(
            elementValue =>   
                elementValue.id == todoId 
                ? {...elementValue, value: value}
                : elementValue
                )
    }

    function handleElementCreate(todoId) {
        console.log(todoId)
        updateElementValue.map(
            elementValue => {
                if(elementValue.id == todoId){
                    let requestOptions = {
                        method: 'POST',
                        body: JSON.stringify({"description": elementValue.value}),
                        headers: {
                            'Content-Type' : 'application/json',
                            'Authorization': `token ${token}`}
                    }
                fetch(`http://localhost:4000/api/todolist/${todoId}/element`, requestOptions)
                .then((res) => {res.json()})
                .catch((err) => err)
                .finally(() => {
                    setUpdateElementValue(
                        searchIdElement(todoId, "")
                        )
                    setTodoUpdate(true)
                    })
                }}
            
        )
        
    }

    // Valide un élément d'une liste
    function validateElement(todoId, elementId) {
        let requestOptions = {
            method: 'POST',
            body: JSON.stringify({"validate": true}),
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `token ${token}`}
        }
        fetch(`http://localhost:4000/api/todolist/${todoId}/element/${elementId}/validate`, requestOptions)
        .then((res) => res.json())
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
        <div id='lists'>
            <h2 id='my-list'>Mes listes</h2> 
            {/* Version FETCH BACKEND */}
            {listTodoList.todo && listTodoList.todo.map((todo) => (
                <div key={todo.id} className='list'>
                    <div className='list-info'>
                        <div className='list-title-zone'>
                            <h3 className='list-title'>{todo.title}  <i className="fa-solid fa-pen-to-square"></i></h3>
                            <div className='list-info-complement'>
                                <div className='list-date'>Créé: {todo.createdAt}</div>
                                <div className='list-author'>Par: {todo.UserId}</div>
                                <div className='list-share'>Visibilté: {todo.visibility}</div>
                            </div> 
                        </div>
                        <div className='list-visibility'>
                            {!listVisibility.includes(todo.id) &&
                            <i className="fa-solid fa-arrow-down" onClick={() => showListDetails(todo.id)}></i>
                            }
                            {listVisibility.includes(todo.id) &&
                            <i className="fa-solid fa-arrow-up" onClick={() => hideListDetails(todo.id)}></i>
                            }
                        </div>
                    </div>
                    {listVisibility.includes(todo.id) && <div className='list-elements'>
                    {todo.Element[0] && todo.Element.map((element) => (
                        <div key={element.id} className='list-element'>
                            <div 
                            className={`checkbox ${ element.ElementStatut[0] && 'validate'}`}
                            onClick={() =>(validateElement(todo.id, element.id)) }
                            >
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className={`list-descriptif ${element.ElementStatut[0] && 'validate'}`}>{element.description}</div>
                        </div>
                    ))}
                    {/* Rajouter un  Element dans la liste */}
                <div className='list-element'>
                    <div className='checkbox'><i className="fa-solid fa-check"></i></div>
                    <textarea 
                        className='list-descriptif'
                        placeholder='Entrez une nouvelle tâche à faire...' 
                        id={todo.id}
                        ref={textareaRef}
                        required
                        // value={}
                        onChange={handleElementUpdate}
                    />
                    <div className='validate-element' onClick={() => handleElementCreate(todo.id)}>
                    <i className="fa-solid fa-circle-check" ></i>
                    </div>
                </div>
                </div>
                    }
                </div>
                ))}
        </div>
    </div>
    )
}

export default CreateTodo