import { IconButton } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'


export default function ModifyButton(props) {

    return (
            <IconButton
                style={{marginRight: '10px'}}
                className='buttonDefaultHover backg-orange'
                onClick={() => {
                    props.setModification(!props.modification)
                    props?.setModifiedStatus(false)
                }}
            >
                <EditOutlinedIcon className='iconDefault' />
            </IconButton>
    )
}