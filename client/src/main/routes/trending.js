import React, { useEffect } from 'react'
import './trending.css'

import Discussion from '../../components/discussion.js'


export default function Trending(props){

    const [data, setData] = React.useState(null)

    useEffect(() =>{
        fetch('/trending', {method : 'PATCH'})
        .then((res) => res.json())
        .then((res) => setData(res))
        .catch((res) => setData(undefined))
    },[])

    return (
    <div>
        {data ? <Discussion messagesList={data} updateMessageList={setData} user={props.user} /> 
              : 'Error'}
    </div>
    )
}

