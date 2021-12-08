import React, { useEffect } from "react"
import Message from "./message"
import './discussion.css'


export default function Discussion(props) {

	const [discussion, updateDiscussion] = React.useState(null)

	useEffect(() => {
		if (props.messagesList.length === 0) return
		updateDiscussion(props.messagesList.map((message, index) => 
			<Message
				message={message}

				user={message.user}
				msg={message.message}
				img={message.image && Buffer.from(message.image.data)}
				comments={message.comments}
				date={goodDate(message.sort)}
				
				messageId={message._id}
				index={index}
				connectedUser={props.user}
				messagesList={props.messagesList}
				updateMessageList={props.updateMessageList}

				key={message._id}
			/>
		))
	}, [props])


	return (
		<div id='discussionBox'>
			{discussion}
		</div>
	)
}



function goodDate(date) {
	if (!date) return
	let theDate = new Date(date)
	return `${theDate.toDateString()} ${theDate.getHours()}:${theDate.getMinutes()}:${theDate.getSeconds()}`
}
