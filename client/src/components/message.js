import Avatar from "./avatar"
import './message.css'

import { TextareaAutosize } from "@mui/material"


export default function Message(props) {
  return (
    <div className='messageBox flex'>
      <Avatar className='message__Avatar' size={1.6} />

      <div className='message__body flex-col'>
        <div className='message__body__header flex'>
          <div className='message__body__header-pseudo'>
            Pseudo
          </div>
          <div  className='message__body__header-date'>
            The date
          </div>
        </div>

        <div className='message__body__theMessage'>
          <TextareaAutosize disabled={true} value={props.msg}/>
          <br/>
          {props.img && <img src={URL.createObjectURL(props.img)} width='250px' alt='not found'/>}
        </div>
      </div>
    </div>
  )
}