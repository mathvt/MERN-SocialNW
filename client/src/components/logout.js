import MenuItem from '@mui/material/MenuItem'
import LogoutIcon from '@mui/icons-material/Logout';

export default function Logout(props){
    return <MenuItem onClick={props?.handleClose}><a href="/logout"><LogoutIcon/></a></MenuItem>
}