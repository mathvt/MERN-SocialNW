import { IconButton } from '@mui/material'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'



export default function DeleteButton(props) {
    return (
        <IconButton className='buttonDefaultHover backg-orange' onClick={deleteMsg} >
            <DeleteForeverOutlinedIcon className='iconDefault' />
        </IconButton>
    )


  async function deleteMsg() {

    let formData = new FormData()
    formData.append('messageToDelete', props.messageId)
    formData.append('user' , props.user)

    let options = {
      method: 'PUT',
      body: formData
    }

    let res = await fetch('/deleteMsg', options)

    if (res.status !== 200) {
      return console.log('nok')
    }

    props.setDeleted(true)
  }
}