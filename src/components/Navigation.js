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
        },
        {
            'ordre' : 3,
            'link' : 'categories',
            'titre': 'Affichage',
            'ico' : "fa-solid fa-briefcase",
            'sousMenu' :[
            {
                'ordre' : 3,
                'link': "/categories",
                'titre' : "Service",
                'ico' : "fa-solid fa-briefcase",
            },
            {
                'ordre' : 5,
                'link': "/trombinoscope",
                'titre' : "Trombinoscope",
                'ico' : "fa-solid fa-book-open-reader"
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
                    'link': "/todolist",
                    'titre' : "Todo List",
                    'ico' : "fa-solid fa-book-open-reader",
                },
                {
                    'ordre' : 2,
                    'link': "/Pomodoro",
                    'titre' : "Pomodoro",
                    'ico' : "fa-solid fa-book-open-reader",
                }
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
                                        to={navDeux.link}>
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