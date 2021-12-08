import { Avatar } from "@mui/material"
import { TextareaAutosize } from "@mui/material"
import React from "react"




export default function Comments(props) {


   const [newComment, setNewComment] = React.useState('')


   return (
      <div>
         
         {props.messagesList[props.index].comments.map((e, i) => <DisplayComments comment={e} key={i} />)}
         
         <TextareaAutosize onChange={(e) => setNewComment(e.target.value)} value={newComment} />

         <button className='sendNewComment' onClick={sendComment}>
            Send
         </button>
      </div>
   )


   async function sendComment() {
      let options = {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ comment: newComment, user: props.connectedUser, messageId: props.messageId })
      }
   
      let res = await fetch('/postComment', options)
   
      if (res.status !== 200) {
         return console.log('nok')
      }

      let message = await res.json()

      let temp = props.messagesList
      temp[props.index] = message
      props.updateMessageList(() => temp)

      setNewComment('')
   }
}






function DisplayComments(props) {

   return (
      <div className='displayCommentsBox flex'>
         <Avatar size={1.2} user={props.comment.user} width='25px' />
         <div className='flex-col'>

            <div className='flex'>
               <div>
                  {props.comment.user}
               </div>
               <div>
                  {props.comment.date}
               </div>
            </div>

            <div>
               {props.comment.text}
            </div>
         </div>

      </div>

   )
}


