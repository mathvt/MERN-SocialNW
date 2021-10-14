import React, { useEffect } from "react"

import Header from './header/header.js'
import LateralNav from './lateralNav/lateralNav.js'
import Main from './main/main.js'


export default function App() {
    let smallScreen = 550

    const [user, setUser] = React.useState(undefined)

    useEffect (() => isSessionExpired(),[])
    

    return (
        <>
            <Header smallScreen={smallScreen} user={user} setUser={setUser} />
            <div className='mainContent'>
                <LateralNav smallScreen={smallScreen} />
                <Main user={user} setUser={setUser} />
            </div>
        </>
    )


    async function isSessionExpired(){
        let res = await fetch('/checkauth', {method: 'PATCH'})
        res.status !== 200 ? setUser(null) : setUser(await res.text())
    }
}