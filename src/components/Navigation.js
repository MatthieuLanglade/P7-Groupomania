import React, { useState } from 'react';
import Logo from '../components/Logo';
import { Navigate, NavLink } from 'react-router-dom';

const Navigation = () => {
    const logOut = () => {
        localStorage.clear()
        Navigate('/', {replace: true})
    }
    
    const [hoverTitreUn, setHoverTitreUn] = useState(0)

    let activeUser = localStorage.getItem('userId')
    let admin = localStorage.getItem('admin')
    const navContent = [
        {
            'ordre' : 1,
            'link': "/",
            'titre' : "Accueil",
            'ico' : "fa-solid fa-house",
        },
        {
            'ordre' : 2,
            'link': `/profile/?id=${activeUser}`,
            'titre' : "Profile",
            'ico' : "fa-solid fa-user",
            'sousMenu' :[
            {
                'ordre' : 1,
                'link': `/profile/?id=${activeUser}`,
                'titre' : "Mon Profile",
                'ico' : "fa-solid fa-user",
                'action' : ''
            },
            {
                'ordre' : 2,
                'link': `/`,
                'titre' : "Déconnection",
                'ico' : "fa-solid fa-power-off",
                'action' : 'logOut'
            },
        ]
        },
        {
            'ordre' : 3,
            'link' : '/affichage',
            'titre': 'Affichage',
            'ico' : "fa-solid fa-briefcase",
            'sousMenu' :[
            {
                'ordre' : 3,
                'link': "/affichage/categories",
                'titre' : "Service",
                'ico' : "fa-solid fa-briefcase",
                'action' : ''
            },
            {
                'ordre' : 5,
                'link': "/affichage/trombinoscope",
                'titre' : "Trombinoscope",
                'ico' : "fa-solid fa-book-open-reader",
                'action' : ''
            },
            ]
        },
        {
            'ordre' : 4,
            'link': "/outils",
            'titre' : "Outils",
            'ico' : "fa-solid fa-book-open-reader",
            'sousMenu' : [
                {
                    'ordre' : 1,
                    'link': "/outils/todolist",
                    'titre' : "Todo List",
                    'ico' : "fa-solid fa-book-open-reader",
                    'action' : ''
                },
                {
                    'ordre' : 2,
                    'link': "/outils/pomodoro",
                    'titre' : "Pomodoro",
                    'ico' : "fa-solid fa-book-open-reader",
                    'action' : ''
                },
                {
                    'ordre' : 3,
                    'link': "/outils/planning",
                    'titre' : "Planning",
                    'ico' : "fa-solid fa-book-open-reader",
                    'action' : ''
                },
                {
                    'ordre' : 4,
                    'link': "/outils/remplacement",
                    'titre' : "Remplacement",
                    'ico' : "fa-solid fa-book-open-reader",
                    'action' : ''
                },
            ]
        },
    ]
    return (
        <nav>
        <Logo />
            <ul className='menuPrincipal'>
                {navContent
                    .sort((a, b) =>  a.ordre- b.ordre)
                    .map((nav) => (
                        // Menu de Niveau 1
                    <NavLink 
                        key={nav.ordre} 
                        to={nav.link} 
                        className={(nav) => (nav.isActive ? "nav-active" : "")}
                        onMouseEnter={()=>{setHoverTitreUn(nav.ordre)}}
                        onMouseLeave={()=>{setHoverTitreUn(0)}}>
                        <li className='navigationPrincipal'>
                            <i className={nav.ico}></i><span>{nav.titre}</span>{
                            // Menu de Niveau 2
                            hoverTitreUn == nav.ordre && 
                            nav.sousMenu  &&
                            (<ul className='sous-menu'>
                                {nav.sousMenu
                                    .map((navDeux) => (
                                        <NavLink
                                        key={navDeux.ordre}
                                        to={navDeux.link}
                                        onClick={() => navDeux.action == 'logOut' ? logOut() : undefined}
                                        >
                                            <li><i className={navDeux.ico}></i><span>{navDeux.titre}</span></li>
                                        </NavLink>
                                    ))}
                            </ul>)
                        }
                        </li>
                    </NavLink>
                    ))
                }
                {/* Pour intégration panneau administration */}
                {/* {admin === 'true' && <NavLink to='/admin' >
                <li ><i className='fa-solid fa-screwdriver-wrench'></i><span>Administration</span></li>
                </NavLink>} */}
                <NavLink to='/' className='logout' onClick={() => logOut()}>
                <li ><i className='fa-solid fa-power-off'></i><span>Déconnection</span></li>
                </NavLink>
            </ul>
        </nav>
    );
};

export default Navigation;