import { IconButton } from '@mui/material'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'




export default function ShowCommentButton(props) {


    return(
        <div style={{marginRight: 'auto'}}>
        <IconButton className='buttonDefaultHover' onClick={() => props.setShowComments(!props.showComments)}>
            <ChatOutlinedIcon className='iconDefault' />
        </IconButton>
        <span>{props.comments.length}</span>
        </div>
    )
}