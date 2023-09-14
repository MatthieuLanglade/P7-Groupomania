import React, { useState, useRef, useEffect} from 'react'


function CreateElement({todoUpdate, setTodoUpdate, todo, token, elementId, elementDescription, setElementUpdateAllow, elementUpdateAllow}) {
    // Déclaration pour gestion du form
    const textareaRef = useRef(null)
    // const [updateElementValue, setUpdateElementValue ] = useState({0: ''})
    const [updateElementValue, setUpdateElementValue ] = useState({0: ''})
    // Constante de modification 
    const modifValues = {target :{id : todo.id, value: elementDescription}}
    // Gestion des input d'élément 
    function handleElementUpdate(e) {
        const {id, value} = e.target
        setUpdateElementValue({...updateElementValue, [id]: value})
    }

    // Focus sur le textArea
    useEffect(() => {
        if (elementId) { 
            textareaRef.current.focus()
            handleElementUpdate(modifValues)}
    }, [])

    // Création d'un élément
    function handleElementCreate(todoId, update) {
        console.log(todoId)
        const method = update ? 'PUT' : 'POST'
        let requestOptions = {
            method: method,
            body: JSON.stringify({"description": updateElementValue[todoId]}),
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `token ${token}`}
        }
        fetch(`http://localhost:4000/api/todolist/${todoId}/element${elementId ? `/${elementId}` : ''}`, requestOptions)
        .then((res) => {res.json()})
        .catch((err) => err)
        .finally(() => {
            setUpdateElementValue({...updateElementValue, [todoId]: ''})
            setTodoUpdate(true)
            setElementUpdateAllow('')})
    }

  return (
<div className='list-element' key='0'>
    <div className='checkbox'><i className="fa-solid fa-check"></i></div>
    <textarea 
        className='list-descriptif create-element'
        placeholder='Entrez une nouvelle tâche à faire...' 
        id={todo.id}
        ref={textareaRef}
        required
        value={updateElementValue[todo.id] || updateElementValue[0]}
        onChange={handleElementUpdate}
        />
    <div className='validate-element' onClick={() => handleElementCreate(todo.id, elementId ? true : false)}>
        <i className="fa-solid fa-circle-check" ></i>
    </div>
</div>
  )
}

export default CreateElement