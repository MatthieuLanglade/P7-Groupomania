import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import services from '../config.json'

const Posts = ({feed, updateFeed, activePostUpdate, setActivePostUpdate, serviceValue}) => {
    // Constante Params de page
    let urlP = new URL(window.location.href);
    let userId= urlP.searchParams.get("id") != null ? Number(urlP.searchParams.get("id")) : ''
    // Constance identifications
    let token = localStorage.getItem('token')
    const activeUser = localStorage.getItem('userId')
    const admin = localStorage.getItem('admin')
    // States
    const [postsList, setPostsList] = useState([])
    const [rangeValue, setRangeValue] = useState(10)
    const [hoverPostUpdate, setHoverPostUpdate] = useState(false)
    const [postIdUpdate, setPostIdUpdate] = useState('')
    // Déclaration pour gestion du form
    const textareaRef = useRef(null)
    const [updatePostValue, setUpdatePostValue ] = useState('')
    const [updateServiceValue, setUpdateServiceValue] = useState('')
    const [updateImagesValue, setUpdateImagesValue] = useState(null)

    // Fonction + useEffect récupérer Posts
    useEffect(() => {
        
        async function fetchPosts() {
        // setDataLoading(true)
        try {
            const response = await fetch(`http://localhost:4000/api/posts/`,{headers: {'Authorization': `token ${token}`}})
            if (response.status === 401) {
                localStorage.clear()
                window.location.reload(false)
                }
            const  respPostsList  = await response.json()
            
            setPostsList(respPostsList)
        } catch (err) {console.log(err)} 
        finally {
            updateFeed(false)
        }
        }
        fetchPosts()      
    }, [feed])
    
    // Fonction Vérifier si Like
    function likeCheck(paramUser, paramLike) {
        let classValue = 'like'
        for (let like in paramLike.Likes) {
            if (paramLike.Likes[like].UserId == paramUser){
                classValue = 'like like-active'
                break}} 
        return classValue}

    // Fonction Like un post
        function updateLike(e) {
        let likePost = {
            "PostId": e,
            "LikeDislike" : true
          } 
        let requestOptions = {
            method: 'POST',
            body: JSON.stringify(likePost),
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `token ${token}`}
        };
        fetch(`http://localhost:4000/api/posts/${likePost.PostId}/postLike`, requestOptions)
            .then((res) => res.json())
            .catch((err) => err)
            .finally(updateFeed(true))
        }
    

    // Fonction update post
    function handlePostUpdate(e) {
        e.preventDefault();
        let post = {
            "description" : updatePostValue,
            "service": updateServiceValue,
            "image" : updateImagesValue}
        const formData = new FormData();
        for (let i in post) {
            formData.append(i, post[i])
        }
        const requestOptions = {
            method: 'PUT',
            body: formData,
            headers: {
                'Authorization': `token ${token}`}
        };
        fetch(`http://localhost:4000/api/posts/${postIdUpdate}`, requestOptions)
            .then((res) => res.json())
            .then((data) => {console.log(data)})
            .catch((err) => err)
            .finally(() => {
                //Désactive l'update & MAJ du feed
                setActivePostUpdate(!activePostUpdate)
                updateFeed(true)
                setUpdatePostValue('')
                setUpdateImagesValue(null)})
        }

    // Fonction DELETE POST
    const handlePostDelete = () => {
        let requestOptions = {
            method: 'DELETE',
            headers: {
                'Authorization': `token ${token}`}
        };
        fetch(`http://localhost:4000/api/posts/${postIdUpdate}`, requestOptions)
            .then((res) => res.json())
            .catch((err) => err)
            .finally(updateFeed(true))
    }

    // Gestion de l'augmentation de la taille du textarea
    useEffect(() => {
        if(activePostUpdate) {
            textareaRef.current.style.height = "59px";
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = scrollHeight + "px";
        }
    }, [updatePostValue]);

    // Tri la liste de posts s'il y a un userId
    let postListToShow = userId ? ( postsList.filter((posts) => posts.UserId === userId)) : postsList
    
    // Gestion de la date de création du post
    const dateJour = Date.now()
    const newDate = (date) => {
    const dateFormat = new Date(date)
    const differenceMilli = (dateJour - dateFormat) / 1000
    let dateRendu = 0
    const dateValues = [
        {
            'dureeMax' : 60,
            'diviseur' : 1,
            'unite' : 's'
        },
        {
            'dureeMax' : 3600,
            'diviseur' : 60,
            'unite' : 'm'
        },
        {
            'dureeMax' : 86400,
            'diviseur' : 3600,
            'unite' : 'h'
        },
        {
            'dureeMax' : 259200000000,
            'diviseur' : 86400,
            'unite' : 'j'
        },
        ]
    for (date of dateValues) {
        if (differenceMilli < date.dureeMax) {
            dateRendu = ~~(differenceMilli/date.diviseur)
            return (`il y a ${dateRendu}${date.unite}`)
            break}
    }
    }
    // Filtre par service si State
    const listFilter = (array) => {
    if (serviceValue !== null) {
        return array.filter((post) => post.service.includes(serviceValue))
    } else {return array}
  } 
  // Array filtré
    const postListToShowFilter = listFilter(postListToShow)
    return (
        <div className='postsList'>            
            {postListToShowFilter
                .slice(0, rangeValue)
                .map((e) => (
                    <div key={e.id} className="post">
                        <div className="profil-pic">
                        <img src={e.User.profilPicture}  alt={"Photo de " + e.User.lastName} />
                        </div>
                        <div className="post-info">
                            <div className="post-header">
                            <h4 className="author" ><NavLink to={"/profile/?id="+e.UserId}> {e.User.firstName} {e.User.lastName}</NavLink></h4>
                            <div className='date'>- {newDate(e.createdAt)}</div>
                            <div className='category'> publié dans ▶ <span className='service'>{e.service}</span></div>
                            {((activeUser == e.UserId) || admin === 'true') && 
                            <i 
                                className="fa-solid fa-ellipsis-vertical"
                                onMouseEnter={() => {
                                    setHoverPostUpdate(true)
                                    setPostIdUpdate(e.id)}}
                                onMouseLeave={() => setHoverPostUpdate(false)}
                            >
                                    {hoverPostUpdate && e.id === postIdUpdate &&
                                    (<ul className="post-update">
                                        <li onClick={() => {
                                            setUpdatePostValue(e.description)
                                            setUpdateServiceValue(e.service)
                                            setActivePostUpdate(!activePostUpdate)
                                            }}>Modifier</li>    
                                        <li onClick={() => { if (window.confirm('Êtes-vous sûr de vouloir supprimer cette publication ?')) handlePostDelete() } }>Supprimer</li>    
                                    </ul>)}
                            </i>}
                            
                        </div>
                        <div className="post-content">
                            {(!activePostUpdate || e.id !== postIdUpdate) && <p>{e.description}</p>}
                            {activePostUpdate && e.id === postIdUpdate && 
                            <textarea 
                                placeholder='Entrez votre message ici...' 
                                ref={textareaRef}
                                required
                                value={updatePostValue}
                                onChange={(e) => setUpdatePostValue(e.target.value)}        
                            />}

                            {e.images && <img src={e.images} alt="" />}
                            {updateImagesValue && e.id === postIdUpdate && <img src={URL.createObjectURL(updateImagesValue)} alt="" />}
                            {e.images && activePostUpdate && e.id === postIdUpdate && 
                            <button onClick={()=>setUpdateImagesValue(null)}>Supprimer image</button>}
                        </div>
                        {activePostUpdate && e.id === postIdUpdate && 
                        <div className="update-options">
                            <label htmlFor='image' >
                                <input type='file' id='image' className='input-image' onChange={(e) => setUpdateImagesValue(e.target.files[0])}/>
                            <i className="fa-regular fa-image"></i>Ajoutez une image</label>
                            <button id='cancel-update' onClick={() => setActivePostUpdate(!activePostUpdate)}>Annuler</button>
                            <button onClick={(e) => handlePostUpdate(e)}>Mettre à jour votre publication</button>
                        </div>}
                        <div className="interaction">  
                            <span
                            className={likeCheck(activeUser, e)}
                            onClick={() => {updateLike(e.id)}}>
                                {likeCheck(activeUser, e) == 'like like-active' ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
                                {e.Likes.length} <span className='like-text'> Like</span>
                                <div className='likes-list'>
                                    {e.Likes.map((like, index) => (
                                        <span key={index}>{like.User.firstName + " " +like.User.lastName}</span>))}
                                </div>
                            </span>
                            {/* Pour intégration des commentaires */}
                            {/* <span className='comments-count'>
                                <i className="fa-solid fa-message"></i>
                                8
                                <span className='like-text'>commentaires</span></span>
                            <span className='add-comment'>Ajouter un commentaire</span> */}
                        </div>
                        </div>
                    </div>
                    ))}
            <button className='showMore' onClick={() => setRangeValue(rangeValue+10)}>Afficher plus</button>
        </div>
    );
};

export default Posts;