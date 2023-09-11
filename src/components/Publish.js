import React, { useEffect, useRef, useState } from 'react';
import config from '../config.json'

const Publish = ({feed, updateFeed}) => {
    //Auth
    let token = localStorage.getItem('token')
    let activeUser = localStorage.getItem('userId')
    // Déclaration pour gestion du form
    const textareaRef = useRef(null)
    const [postValue, setPostValue ] = useState('')
    const [serviceValue, setServiceValue] = useState('Tout le monde')
    const [imagesValue, setImagesValue] = useState(null)
    // Autres states
    const [postPending, setPostPending] = useState('False')

    // Fonction submit
    async function handleSubmit(e) {
        e.preventDefault();
        let post = {
            'userId' : activeUser,
            "description" : postValue,
            "service": serviceValue,
            "image" : imagesValue
        }
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `token ${token}`}
        }
        fetch('http://localhost:4000/api/posts', requestOptions)
            .then((res) => res.json())
            .then((data) => {
                console.log('Post Créé', data);
                setPostPending('false')})
            .catch((err) => err)
            .finally(() => {
                //Remettre le formulaire à 0, prévenir l'utilisateur que le post est publié
                setPostValue('')
                setImagesValue(null)
                setServiceValue('')
                updateFeed(true)
            }
            )
        }

    // Gestion de l'augmentation de la taille du textarea
    useEffect(() => {
        textareaRef.current.style.height = "59px";
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = scrollHeight + "px";
    }, [postValue]);

    // DOM
    return (
        <div id='publish'>
            <div id="infos-publish">
                <label id='service'> Publiez dans :</label>
                <select 
                    name="Service" 
                    id="service"
                    value={serviceValue}
                    onChange={(e) => setServiceValue(e.target.value)}>
                    {config.services.map((service, index) => (
                    <option key={index} value={service} >{service}</option>
                    ))}
                </select>
            </div>
            <textarea 
                placeholder='Entrez votre message ici...' 
                ref={textareaRef}
                required
                value={postValue}
                onChange={(e) => setPostValue(e.target.value)}        
            />
            <div id="add-publish">
                <label htmlFor='image' >
                <input type='file' id='image' className='input-image' onChange={(e) => setImagesValue(e.target.files[0])}/>
                    <i className="fa-regular fa-image"></i>
                    Ajoutez une image</label>
                {postPending &&<button onClick={(e) => (
                    handleSubmit(e)
                    )}>Partagez votre publication</button>}
                {!postPending && <button disabled >Création de votre publication...</button>}
            </div>
            {imagesValue && (
                <div id='images-list'>
                <img alt="Image à publier" width={"250px"} src={URL.createObjectURL(imagesValue)} />
                <br />
                <button onClick={()=>setImagesValue(null)}>Supprimer</button>
                </div>
            )}
        </div>
    );
};

export default Publish