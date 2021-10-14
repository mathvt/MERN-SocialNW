import React, { useEffect } from "react"


export default function SwitchButtons(props) {

    const boxname = props.flex_col ? 'switchButtonsBox flex' : 'switchButtonsBox flex-col'

    useEffect(() => {}, [props.buttonFocus])

    return (
        <div className={boxname}>
            <button
                onClick={() => props.changeButtonFocus(false)}
                className={!props.buttonFocus ? 'button-activated' : ''}>
                Register
            </button>
            <button
                onClick={() => props.changeButtonFocus(true)}
                className={props.buttonFocus ? 'button-activated' : ''}>
                Log in
            </button>
        </div>
    )
}