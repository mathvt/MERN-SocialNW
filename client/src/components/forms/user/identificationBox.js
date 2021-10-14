import React from "react";

import LoginForm from './loginForm'
import RegisterForm from './registerForm'
import SwitchButtons from "./switchButtons";

export default function IdentificationBox(props) {
  const boxname = props.flex_col ? 'identificationBox flex-col' : 'identificationBox flex'

  const [buttonFocus, changeButtonFocus] = React.useState(true)

  return (
    <div className={boxname}>
      <SwitchButtons buttonFocus={buttonFocus} changeButtonFocus={changeButtonFocus} flex_col={props.flex_col}/>
        {buttonFocus ? <LoginForm setUser={props.setUser} /> : <RegisterForm />}
    </div>
  )
}