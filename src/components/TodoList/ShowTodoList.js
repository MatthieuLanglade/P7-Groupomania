import React, { useState, useEffect } from 'react'
import CreateTodo from './CreateTodo'
import CreateElement from './CreateElement'

function ShowTodoList() {
    // States 
    const [listVisibility, setListVisibility] = useState([]) // Affichage du détail des listes
    const [listTodoList, setListTodoList] = useState([]) // Stockage des listes utilisateur
    const [todoUpdate, setTodoUpdate] = useState(true) // MAJ de la liste 
    const [elementHover, setElementHover] = useState('') // Hover d'un élément de liste (par id)
    const [elementUpdateAllow, setElementUpdateAllow] = useState('') // Autorise la modification d'un élément (par id)

    // Constante identifications
    let token = localStorage.getItem('token') // Token utilisateur [req.auth]

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
    // Fetch : Récupération des listes TODO
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
    // Supprime un élément d'une liste
    function deleteElement(todoId, elementId) {
        let requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `token ${token}`}
        }
        fetch(`http://localhost:4000/api/todolist/${todoId}/element/${elementId}`,requestOptions)
        .then((res) => res.json())
        .catch((err) => err)
        .finally(setTodoUpdate(true))
    }
  return (
    <div id='todolist'>
        <CreateTodo
            todoUpdate={todoUpdate}
            setTodoUpdate={setTodoUpdate}
            token={token}
        />
        <div id='lists'>
            <h2 id='my-list'>Mes listes</h2> {/* ID a supprimer */}
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
                {listVisibility.includes(todo.id) && 
                <div className='list-elements'>
                    {todo.Element[0] && todo.Element.map((element) => (
                        elementUpdateAllow == element.id
                        ? <CreateElement 
                            todoUpdate={todoUpdate}
                            setTodoUpdate={setTodoUpdate}
                            todo={todo}
                            elementId={element.id}
                            elementDescription={element.description}
                            token={token}
                            setElementUpdateAllow={setElementUpdateAllow}
                            elementUpdateAllow={elementUpdateAllow}/> 
                        :<div 
                            key={element.id} 
                            className='list-element'
                            onMouseEnter={() => setElementHover(element.id)}
                            onMouseLeave={() => setElementHover('')}>
                            <div 
                                className={`checkbox ${ element.ElementStatut[0] && 'validate'}`}
                                onClick={() =>(validateElement(todo.id, element.id)) }>
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div 
                                className={`list-descriptif ${element.ElementStatut[0] && 'validate'}`}
                                onClick={() => setElementUpdateAllow(element.id)}> 
                                {element.description}
                                </div>
                            {elementHover === element.id &&
                            <div className='delete-element'onClick={() => deleteElement(todo.id, element.id)}>
                                <i className="fa-solid fa-trash-can"></i>
                            </div>}
                        </div>
                    ))}
                    <CreateElement 
                        todoUpdate={todoUpdate}
                        setTodoUpdate={setTodoUpdate}
                        todo={todo}
                        token={token}
                        elementId={''}
                    />
                </div>}
            </div>
                ))}
        </div>
    </div>
  )
}

export default ShowTodoList