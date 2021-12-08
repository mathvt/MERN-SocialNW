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
            {props.user ? <img src={getAvatar()} width={props.width || '33px'} alt='not found' />
                              : <PersonIcon style={style} className='personIcon'/>}
        </div>
    )


    async function getAvatar(e) {
        let options = {
           method: 'PATCH',
           headers: {
              'Content-Type': 'application/json'
           },
           body: JSON.stringify({ user: e.user })
        }
     
        let res = await fetch('/avatar', options)
     
        if (res.status !== 200) {
           return console.log('nok')
        }
     
        return Buffer.from(await res.json().avatar) 
     }
}