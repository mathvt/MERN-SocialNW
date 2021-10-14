import React from 'react'
import './userForm.css'


export default function LoginForm(props){

    const [email, setEmail] = React.useState(null)
    const [pass, setPass] = React.useState(null)

    const [err, setErr] = React.useState(false)

    let info={email, pass}

    return(
        <div className='userForm flex-col'>
            <div>
                <label>Email</label>
                <input type='text' onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password</label>
                <input type='text' onChange={e => setPass(e.target.value)} />
            </div>
            <button className='submitButton' onClick={postLogin}>
                Log in
            </button>
            <div className='register__error'>
                    {typeof err === 'string' && err}
                </div>
        </div>
    )


    async function postLogin() {
        let options = { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        }

        let res = await fetch('/login', options)

        if(res.status !== 200){
            let error = await res.json()
            if(error.description === 'User not found' || error.description === 'Wrong password'){
                setErr('Wrong email or password')
                return                
            }
        }

        let message = await res.json()
        console.log(message)        
        props.setUser(message.username)

        return window.location.pathname = '/'
    }

}