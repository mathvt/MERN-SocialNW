import React from 'react'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Menu from '@mui/material/Menu'

import Nav from './nav'
import LogoutButton from './buttons/logoutButton'
import LoginButton from './buttons/loginButton'


export default function TheMenu(props) {

    const [status, setStatus] = React.useState(false);
    const anchor = document.getElementById(props.anchor)


    const handleClose = () => {
      setStatus(false);
    };

    return(
        <div className={props.className}>
            <IconButton color="inherit" edge="end" onClick={() => setStatus(!status)}>
                <MenuIcon/>
                <Menu anchorEl={anchor} open={status} onClose={handleClose}  sx={{border: 0}} >
                    <OptionList/>
                </Menu>
            </IconButton>
        </div>
    )


    function OptionList() {
        return(
            <Nav addTo={ props.user ? <LogoutButton/> : <LoginButton/>} />
        )
    }
}



