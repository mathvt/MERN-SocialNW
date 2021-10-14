import './home.css'

import IdentificationBox from '../../components/forms/user/identificationBox'
import MsgForm from '../../components/forms/msg/msgForm'


function Home(props){


    return (
        <div className='homeBox'>
            <div className='leftHomeBox flex-col'>
                {props.user === null && <IdentificationBox setUser={props.setUser} flex_col={true} />}
                {props.user && <MsgForm/>}
            </div>
            
            <div className='rightHomeBox'>
            </div>
            
        </div>
        
    )
}

export default Home