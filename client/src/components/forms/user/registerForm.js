import React from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

import './userForm.css'


export default function RegisterForm() {

    const [email, setEmail] = React.useState(null)
    const [pseudo, setPseudo] = React.useState(null)
    const [pass, setPass] = React.useState(null)
    const [pass2, setPass2] = React.useState(null)
    const [condition, setConditon] = React.useState(false)

    const [err, setErr] = React.useState(false)

    let info={email, pseudo, pass, pass2, condition}

    return (
        <div className='userForm flex-col'>
            <div>
                <label>Pseudo</label>
                <input type='text' onChange={e => setPseudo(e.target.value)} />
                <div className='register__error'>
                    {Array.isArray(err) && err.includes('pseudo') && 'Invalid pseudo'}
                    {typeof err === 'string' && err}
                </div>
            </div>

            <div>
                <label>Email</label>
                <input type='text' onChange={e => setEmail(e.target.value)} />
                <div className='register__error'>
                    {Array.isArray(err) && err.includes('email') && 'Invalid Email'}
                </div>
            </div>

            <div>
                <label>Password</label>
                <input type='text' onChange={e => setPass(e.target.value)} />
                <div className='register__error'>
                    {Array.isArray(err) && err.includes('pass') && 'Invalid password'}
                </div>
            </div>

            <div>
                <label>Confirm password</label>
                <input type='text' onChange={e => setPass2(e.target.value)} />
                <div className='register__error'>
                    {Array.isArray(err) && err.includes('pass2') && 'Password does not match'}
                </div>
            </div>

            <FormControlLabel 
                control={<Checkbox checked={condition} onChange={() => setConditon(!condition)} />}
                label='Accept conditions' />
            <div className='register__error'>
                {Array.isArray(err) && err.includes('condition') && 'You must accept conditions to register'}
            </div>

            <button className='submitButton' onClick={postRegister}>
                Register
            </button>
        </div>
    )




    async function postRegister() {
        let options = { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        }

        let res = await fetch('/register', options)

        if(res.status !== 200){
            let error = await res.json()
            error.description === 'bad syntax' && setErr(error.syntax)
            error.description === 'username already taken' && setErr(error.description)
            return
        }

        return window.location.reload()
    }
}



