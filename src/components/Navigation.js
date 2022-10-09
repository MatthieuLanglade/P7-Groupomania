import React from 'react';
import Logo from '../components/Logo';
import { Navigate, NavLink } from 'react-router-dom';

const Navigation = () => {
    const logOut = () => {
        localStorage.clear()
        Navigate('/', {replace: true})
    }
    let activeUser = localStorage.getItem('userId')
    let admin = localStorage.getItem('admin')
    const navContent = [
        {
            'ordre' : 1,
            'link': "/",
            'titre' : "Accueil",
            'ico' : "fa-solid fa-house"
        },
        {
            'ordre' : 2,
            'link': `/profile/?id=${activeUser}`,
            'titre' : "Profile",
            'ico' : "fa-solid fa-user"
        },
        {
            'ordre' : 3,
            'link': "/categories",
            'titre' : "Service",
            'ico' : "fa-solid fa-briefcase"
        },
        {
            'ordre' : 4,
            'link': "/trombinoscope",
            'titre' : "Trombinoscope",
            'ico' : "fa-solid fa-book-open-reader"
        }
    ]
    return (
        <nav>
        <Logo />
            <ul>
                {navContent
                    .sort((a, b) =>  a.ordre- b.ordre)
                    .map((nav) => (
                    <NavLink key={nav.ordre} to={nav.link} className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li><i className={nav.ico}></i><span>{nav.titre}</span></li>
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