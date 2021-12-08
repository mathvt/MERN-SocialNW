import React, { useEffect } from "react"
import Avatar from "./avatar"
import './message.css'

import { TextareaAutosize } from "@mui/material"
import { IconButton } from '@mui/material'


import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ModifyButton from "./buttons/modifyButton"
import DeleteButton from "./buttons/deleteButton"
import LikeButton from "./buttons/LikeButton"
import ShowCommentButton from "./buttons/showCommentButton"
import Comments from "./comments"



export default function Message(props) {

  const [modification, setModification] = React.useState(false)
  const [deleted, setDeleted] = React.useState(false)
  const [newMsg, setMsg] = React.useState(props.msg)
  const [SuccessfullyModified, setModifiedStatus] = React.useState(false)
  const [showComments, setShowComments] = React.useState(false)


  useEffect(() => setMsg(props.msg), [props.msg])


  return (
    <div className='messageBox flex' style={{ opacity: deleted ? 0.6 : 1 }}>
      <Avatar className='message__Avatar' size={1.6} />

      <div className='message__body flex-col'>
        <div className='message__body__header flex'>
          <div className='message__body__header-pseudo'>
            {props.user}
          </div>
          <div className='message__body__header-date'>
            {props.date || Date()}
          </div>
        </div>

        <div className='message__body__theMessage'>

          <TextareaAutosize
            className={modification ? 'textBeingModified' : ''}
            disabled={!modification}
            value={newMsg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button
            className='confirmMessageModif' style={{ display: !modification && 'none' }}
            onClick={editMsg}
          >
            Confirm modification
          </button>
          <br />
          {props.img && <img src={props.img} width='250px' alt='not found' />}
        </div>

        {SuccessfullyModified && <div className='messageModified'>Successfully modified</div>}
        {deleted && <div className='messageDeleted'>Successfully deleted</div>}

        {
          (props.connectedUser === props.user && !deleted) &&
          <div className='message__edit-modify'>
            <ModifyButton
              modification={modification}
              setModification={setModification}
              setModifiedStatus={setModifiedStatus}
            />
            <DeleteButton
              setDeleted={setDeleted}
              messageId={props.messageId}
              user={props.user}
            />
          </div>
        }

        {
          (props.connectedUser && !deleted) &&
          <div className='message__socialButton flex'>
            <ShowCommentButton
              comments={props.messagesList[props.index].comments}
              showComments={showComments}
              setShowComments={setShowComments}
            />

            <LikeButton
              messageId={props.message._id}
              connectedUser={props.user}
              updateMessageList={props.updateMessageList}
              messagesList={props.messagesList}
              index={props.index}
            />

            <IconButton style={{marginLeft: 'auto'}} className='buttonDefaultHover'>        {/* Share */}
              <ShareOutlinedIcon className='iconDefault' />
            </IconButton>
          </div>
        }
        {showComments &&
          <Comments
            connectedUser={props.connectedUser}
            updateMessageList={props.updateMessageList}
            messagesList={props.messagesList}
            index={props.index}
            messageId={props.messageId}
          />
        }
      </div>
    </div>
  )



  async function editMsg() {

    if (newMsg === props.message) return

    let formData = new FormData()
    formData.append('newMessage', newMsg)
    formData.append('oldMessage', props.messageId)
    formData.append('user', props.user)

    let options = {
      method: 'PUT',
      body: formData
    }

    let res = await fetch('/editMsg', options)

    if (res.status !== 200) {
      return console.log('nok')
    }

    setModification(false)
    setModifiedStatus(true)
  }





}
