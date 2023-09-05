import React, { useState, useRef } from 'react'
import listComplete from './structure.json'

const CreateTodo = () => {
    // States 
    const [listVisibility, setListVisibility] = useState([])
    
    // Fonction Afficher/Masquer les listes
    const showListDetails = (listID) => {
        setListVisibility([...listVisibility, listID ])
    }
    const hideListDetails = (listID) => {
        listVisibility.pop(listID)
        setListVisibility([...listVisibility])
    }
    // Déclaration pour gestion du form
    const textareaRef = useRef(null)
    const [updatePostValue, setUpdatePostValue ] = useState('')
    const [updateServiceValue, setUpdateServiceValue] = useState('')
    const [updateImagesValue, setUpdateImagesValue] = useState(null)

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
                        value={updatePostValue}
                        onChange={(e) => setUpdatePostValue(e.target.value)}        
                    />
                <div className='list-info-complement'>
                    {/* <div className='list-date'>Créé: il y a 2j</div> */}
                    {/* <div className='list-author'>Par: {e.author}</div> */}
                    <h3 className='list-share'>Visibilté:</h3>
                </div> 
            </div>
        </div>
        <div className='list-elements'> 
            <div className='list-element'>
                <div className='checkbox'><i className="fa-solid fa-check"></i></div>
                <textarea 
                    className='list-descriptif'
                    placeholder='Entrez votre première chose à faire...' 
                    ref={textareaRef}
                    required
                    value={updatePostValue}
                    onChange={(e) => setUpdatePostValue(e.target.value)}        
                />
            </div>
            <button className='validate-list'>
                <i className="fa-solid fa-circle-check"></i>
                Valider la liste
            </button>
        </div>
      </div>
      <div id='lists'>
        <h2 id='my-list'>Mes listes</h2> 

        {listComplete.map((e, eIndex) => (
            <div key={eIndex} className='list'>
                <div className='list-info'>
                    <div className='list-title-zone'>
                        <h3 className='list-title'>{e['titre de la liste']}  <i className="fa-solid fa-pen-to-square"></i></h3>
                        <div className='list-info-complement'>
                            <div className='list-date'>Créé: il y a 2j</div>
                            <div className='list-author'>Par: {e.author}</div>
                            <div className='list-share'>Visibilté: {e.visibility}</div>
                        </div> 
                    </div>
                    <div className='list-visibility'>
                        {!listVisibility.includes(e.listID) &&
                           <i className="fa-solid fa-arrow-down" onClick={() => showListDetails(e.listID)}></i>
                        }
                        {listVisibility.includes(e.listID) &&
                           <i className="fa-solid fa-arrow-up" onClick={(e) => hideListDetails(e.listID)}></i>
                        }
                    </div>
                </div>
                {listVisibility.includes(e.listID) && <div className='list-elements'>
                {e.elements.map((f, fIndex) => (
                    <div key={fIndex} className='list-element'>
                        <div 
                        className={`checkbox ${ f.fait ? 'validate' : ''}`}
                        onClick={() =>(console.log(eIndex, fIndex)) }
                        >
                            <i className="fa-solid fa-check"></i>
                        </div>
                        <div className={`list-descriptif ${f.fait ? 'validate': ''}`}>{f.titre}</div>
                    </div>
                ))}
                </div>
                }
            </div>
        ))}
      </div>
    </div>
    )
}

export default CreateTodo