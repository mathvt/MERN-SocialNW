import MenuItem from '@mui/material/MenuItem'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'

export default function Nav(props) {
    let iconColor = '#662211'
    return (
        <div className={props.className}>
            <a href="/">
                <MenuItem sx={{pl: 1, pr: 1}}>
                    <HomeOutlinedIcon sx={{ color: iconColor, borderLeft: props?.homeBorder }} />
                </MenuItem>
            </a>
            <a href="/trending">
                <MenuItem sx={{pl: 1, pr: 1}}>
                    <WhatshotIcon sx={{ color: iconColor, borderLeft: props?.trendingBorder }} />
                </MenuItem>
            </a>
            <a href="/profil">
                <MenuItem sx={{pl: 1, pr: 1}}>
                    <PersonOutlineIcon sx={{ color: iconColor, borderLeft: props?.profilBorder }} />
                </MenuItem>
            </a>
            {props.addTo}
        </div>
    )
}