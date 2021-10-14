import React from 'react'
import './msgForm.css'
import Avatar from '../../avatar'
import Message from '../../message'

import { TextareaAutosize } from '@mui/material'


export default function MsgForm() {
  const [msg, setMsg] = React.useState('')
  const [img, setImg] = React.useState('')

  return(
    <div className='msgFormBlock flex-col'>
        <div className='msgForm__header flex'>
            <Avatar className='msgForm__header-avatar flex' />
            <div className='msgForm__header-suscribeInfo flex-col'>
                SuscribeInfo
            </div>
        </div>
        <div className='msgForm__body flex-col'>
            <TextareaAutosize className='msgForm__body-textarea' value={msg} onChange={(e) => setMsg(e.target.value)}/>
            <div className='msgForm__preview'>
                {(msg || img) && <Message msg={msg} img={img} />}
            </div>
            <div className='msgForm__body-foot flex'>
                <input type='file' onChange={(e) => {setImg(e.target.files[0]); console.log(e.target.files[0])}} />
                <div className='msgForm__body-foot-buttons'>
                    {(msg || img) && <button onClick={() => {setMsg(''); setImg('')}}>Cancel</button>}
                    <button>Send</button>                    
                </div>

            </div>
        </div>

    </div>
  )
}