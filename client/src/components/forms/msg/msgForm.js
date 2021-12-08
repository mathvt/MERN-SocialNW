import React from 'react'
import './msgForm.css'
import Avatar from '../../avatar'
import Message from '../../message'

import { TextareaAutosize } from '@mui/material'
import CropOriginalIcon from '@mui/icons-material/CropOriginal'
import { IconButton } from '@mui/material'


export default function MsgForm(props) {
  const [msg, setMsg] = React.useState('')
  const [img, setImg] = React.useState('')

  return (
    <div className='msgFormBlock flex-col'>

      <div className='msgForm__header flex'>
        <Avatar className='msgForm__header-avatar flex' />
        <div className='msgForm__header-suscribeInfo flex-col'>
          SuscribeInfo
        </div>
      </div>

      <div className='msgForm__body flex-col'>
        <TextareaAutosize className='msgForm__body-textarea' value={msg} onChange={(e) => setMsg(e.target.value)} />
        <div className='msgForm__preview'>
          {(msg || img) && <Message msg={msg} img={img} user={props.user} />}
        </div>
      </div>
      
      <div className='msgForm__body-foot flex'>
        <input id='insertImg'
          type='file'
          onChange={(e) => readImg(e.target.files[0])}
        />
        <label htmlFor='insertImg' >
          <IconButton component="span" className='buttonDefaultHover'>
            <CropOriginalIcon  className='iconDefault' />
          </IconButton>
        </label>
        <div className='msgForm__body-foot-buttons'>
          {(msg || img) && <button onClick={() => { setMsg(''); setImg('') }}>Cancel</button>}
          <button onClick={sendMsg}>Send</button>
        </div>
      </div>
    </div>
  )

  async function readImg(img) {

        let reader = new FileReader()
        reader.readAsDataURL(img)
        reader.onloadend = () => setImg(reader.result)
  }


  async function sendMsg() {

    if(!img && !msg) return
    
    let formData = new FormData()
    formData.append('user', props.user)
    formData.append('message', msg)
    formData.append('image', img)

    let options = { 
      method: 'POST',
      body: formData
    }

    let res = await fetch('/newMessage', options)

    if (res.status !== 200){
      return console.log('nok')
    }

    setMsg('')
    setImg('')

    let newData = await res.json()

    props.updateMessageList([newData, ...props.messagesList])
  }
}