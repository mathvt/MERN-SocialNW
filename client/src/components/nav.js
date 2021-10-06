import MenuItem from '@mui/material/MenuItem'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'

export default function Nav(props) {
    let iconColor = '#662211'
    return (
        <div className={props.className}>
            <MenuItem onClick={props?.handleClose}>
                <a href="/">
                    <HomeOutlinedIcon sx={{color: iconColor, borderLeft: props?.homeBorder}} />
                </a>
            </MenuItem>
            <MenuItem onClick={props?.handleClose} >
                <a href="/trending">
                <WhatshotIcon sx={{color: iconColor, borderLeft: props?.trendingBorder}} />
                </a>
            </MenuItem>
            <MenuItem onClick={props?.handleClose}>
                <a href="/profil">
                <PersonOutlineIcon sx={{color: iconColor, borderLeft: props?.profilBorder}} />
                </a>
            </MenuItem>
            {props.addTo}
        </div>
    )
}