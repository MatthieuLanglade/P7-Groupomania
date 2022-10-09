import React from 'react';

const DeleteUser = () => {
    // Constance identifications
    let token = localStorage.getItem('token')
    const activeUser = localStorage.getItem('userId')
    
    const handleUserDelete = () => {
        let requestOptions = {
            method: 'DELETE',
            headers: {
                'Authorization': `token ${token}`}
        };
        fetch(`http://localhost:4000/api/auth/${activeUser}`, requestOptions)
            .then((res) => res.json())
            .catch((err) => err)
            .finally(() => {
                alert('Utilisateur supprimé')
                localStorage.clear()
            }
            )
    }
    return (
        <div id='delete-user'>
            <button onClick={() => { if (window.confirm('Êtes-vous sûr de vouloir supprimer votre profile ? Toutes vos publications et interactions seront également supprimées.')) handleUserDelete()}}>Supprimer profile</button>
        </div>
    );
};

export default DeleteUser;