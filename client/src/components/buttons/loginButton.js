import MenuItem from '@mui/material/MenuItem'
import LoginIcon from '@mui/icons-material/Login'

export default function LoginButton(props){
    return(
        <button className='no-prop-button' onClick={() => window.location.pathname='/profil'}>
            <MenuItem sx={{pl: 1, pr: 1}} >
                <LoginIcon/>
            </MenuItem>
        </button>
    )
}