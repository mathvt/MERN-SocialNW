import PersonIcon from '@mui/icons-material/Person';




export default function Avatar(props){

    const style = {
        'transform': `scale(${props.size || 2})`,
        'borderRadius': '7px',
        'backgroundColor': 'rgb(197, 197, 197)',
        'color': 'rgb(129, 129, 129)'
    }

    return(
        <div className={props.className}>
            <PersonIcon style={style} className='personIcon'/>
        </div>
    )
}