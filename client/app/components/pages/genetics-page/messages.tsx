import React, { useState, useEffect, useRef, SyntheticEvent } from 'react'

// component
export const Messages = ({ comments }) => {
  // create reference to empty div at bottom of chat to scroll into view
  const messageBottomRef = useRef<HTMLDivElement>()

  // after every re-render, scroll the bottom div into view
  useEffect(
    () =>
      // only attempt to scroll into view if a reference to a div exists
      messageBottomRef.current &&
      messageBottomRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      })
  )

  return (
    <div id="ChatroomChatBox" className="lobby">
      {comments.map(({ username, timestamp, message }, i) => (
        <div key={timestamp + i} className="user-block">
          <div className="user-image" />
          <div className="user-message">
            <p className="username">{username}</p>
            <p className="message">{message}</p>
            <div className="timestamp">{timestamp}</div>
          </div>
        </div>
      ))}
      <div ref={messageBottomRef} />
    </div>
  )
}

export default Messages
