import React, { useEffect } from 'react'
import './home.css'

import IdentificationBox from '../../components/forms/user/identificationBox'
import MsgForm from '../../components/forms/msg/msgForm'
import Discussion from '../../components/discussion'

import Trending from './trending.js'


function Home(props) {

    const [messagesList, updateMessageList] = React.useState([])
    const [isScrollToBottom, setIsScrollToBottom] = React.useState(false)
    const stopFetchingData = React.useRef(false)

    useEffect(() => {
        if (messagesList.length === 0) {
            getMsg()
            document.addEventListener('scroll', scrollFunction)
        }

        if (isScrollToBottom && !stopFetchingData.current) {
            getMsg()
        }


        function scrollFunction() {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !stopFetchingData.current) {
                setIsScrollToBottom(true)
            }
        }


        async function getMsg() {

            let options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ limit: messagesList.length })
            }
            let res = await fetch('/discussion', options)

            if (res.status !== 200) { } // Do smthg

            let message = await res.json()

            if (message.length === 0) {
                stopFetchingData.current = true
                document.removeEventListener('scroll', scrollFunction)
            }
            else{
                setIsScrollToBottom(false) // before updateMessageList
                updateMessageList([...messagesList, ...message])
            }
        }

    }, [messagesList, isScrollToBottom])



    return (
        <div className='homeBox'>
            <div className='leftHomeBox flex-col'>
                {!props.user && <IdentificationBox setUser={props.setUser} flex_col={true} />}
                {props.user && <MsgForm user={props.user} updateMessageList={updateMessageList} messagesList={messagesList} />}

                <Discussion messagesList={messagesList} updateMessageList={updateMessageList} user={props.user} />
            </div>

            <div className='rightHomeBox'>
                <Trending/>
            </div>

        </div>

    )
}



export default Home