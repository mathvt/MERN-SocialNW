import MenuItem from '@mui/material/MenuItem'
import LogoutIcon from '@mui/icons-material/Logout';

export default function LogoutButton(props){
    return <button className='no-prop-button' onClick={logout}><MenuItem sx={{pl: 1, pr: 1}} ><LogoutIcon/></MenuItem></button>


    async function logout(){
        let res = await fetch('/logout', {method: 'PATCH'})
        if(res.status === 200) window.location.pathname = '/'
    }
}
