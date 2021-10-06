import React from 'react'
import './header.css'
import { useMediaQuery } from 'react-responsive'

import Logout from '../components/logout.js'
import TheMenu from '../components/themenu.js'


function Header(props) {
    const big = useMediaQuery({minWidth: props.smallScreen})
    

    return (
        <header>
            <a href="/" className="header__homeLink">
                <img id='header_img' src='favicon.icon' alt='logo'></img>
                <h1>mern</h1>
            </a>
            <div id='header_right_button'>
                {big ? <Logout/> : 
                <TheMenu anchor='header_right_button'/>}
            </div>
        </header>
    )
}


export default Header


