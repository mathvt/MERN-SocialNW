import './lateralNav.css'
import { useMediaQuery } from 'react-responsive'

import Nav from '../components/nav'


function LateralNav(props) {
    const big = useMediaQuery({minWidth: props.smallScreen})

    let [homeBorder, trendingBorder, profilBorder] = iconFocus()

    return big && <Nav 
            className='lateralNav'
            homeBorder={homeBorder}
            trendingBorder={trendingBorder}
            profilBorder={profilBorder}
        />
}

export default LateralNav


function iconFocus(){
    let path = window.location.pathname
    let pathvalue = ['/', '/trending', '/profil']
    return pathvalue.map((e) => e === path ? 3 : 0)
}

