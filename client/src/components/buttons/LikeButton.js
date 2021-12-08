import { IconButton } from '@mui/material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'

import React from 'react'


export default function LikeButton(props) {

    const [like, setLike] = React.useState(props.messagesList[props.index].like)


    return (
        <div style={{margin: 'auto'}}>
            <IconButton
                className='buttonDefaultHover'
                onClick={() => {
                    updateLike()
                }}
            >
                {like.includes(props.connectedUser)
                ? <FavoriteBorderOutlinedIcon className='iconDefault' sx={{ color: 'red' }} />
                : <FavoriteBorderOutlinedIcon className='iconDefault' />
                }


            </IconButton>
            <span>{like.length}</span>
        </div>
    )



    async function updateLike() {

        let options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: props.messageId, user: props.connectedUser })
        }

        let res = await fetch('/likeMsg', options)

        if (res.status !== 200) {
            return console.log('nok')
        }

        let message = await res.json()


        let temp = props.messagesList
        temp[props.index].like = message
        props.updateMessageList(() => temp)
        setLike(message)
    }
}