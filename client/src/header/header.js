import React from 'react'
import './header.css'
import { useMediaQuery } from 'react-responsive'

import LoginButton from '../components/buttons/loginButton.js'
import LogoutButton from '../components/buttons/logoutButton.js'
import TheMenu from '../components/themenu.js'


function Header(props) {

    const big = useMediaQuery({minWidth: props.smallScreen})
    
    return (
        <header>
            <a href="/" className="header__homeLink">
                <img id='header_img' src='favicon.icon' alt='logo'></img>
                <h1>Racoont</h1>
            </a>
            <div className='header_right flex'>
                <div>{props.user && `Welcome ${props.user}`}</div>
                <div id='header_right-button'>
                    {big ?
                    props.user ? <LogoutButton/> : <LoginButton/>
                    : <TheMenu anchor='header_right-button' user={props.user} />}                    
                </div>

            </div>
        </header>
    )
}


export default Header


