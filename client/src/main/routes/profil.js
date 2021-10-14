import './profil.css'
import React from 'react'

import IdentificationBox from '../../components/forms/user/identificationBox'

function Profil(props) {

    return (
        <div id='profilBox'>
            <div id='leftProfilBox'>
                {!props.user &&  <IdentificationBox setUser={props.setUser} flex_col={false} />}
            </div>
            <div id='rightProfilBox'>

            </div>
        </div>


    )
}

export default Profil