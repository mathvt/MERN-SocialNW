import React from 'react'
import './msgForm.css'
import PersonIcon from '@mui/icons-material/Person';

export default function MsgForm() {
  const [msg, setMsg] = React.useState('')
  const [img, setImg] = React.useState('')

  return(
    <div className='msgFormBlock flex-col'>
        <div className='msgForm__header flex'>
            <div className='msgForm__header-avatar flex'>
                <PersonIcon className='personIcon'/>
            </div>
            <div className='msgForm__header-suscribeInfo flex-col'>
                SuscribeInfo
            </div>
        </div>
        <div className='msgForm__body flex-col'>
            <input type='text' value={msg} onChange={(e) => setMsg(e.target.value)} />
            <div className='msgForm__preview'>
                {msg}
                <br/>
                {img && <img src={URL.createObjectURL(img)} width='250px' alt='not found'/>}
            </div>
            <div className='msgForm__body-foot flex'>
                <input type='file' onChange={(e) => {setImg(e.target.files[0]); console.log(e.target.files[0])}} />
                {(msg || img) && <button onClick={() => {setMsg(''); setImg('')}}>Cancel</button>}
                <button>Send</button>
            </div>
        </div>

    </div>
  )
}