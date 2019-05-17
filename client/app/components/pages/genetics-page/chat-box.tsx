import React from 'react'

export const ChatBox = ({ myComment, handleMyComment, submitMyComment }) => {
  return (
    <div className="chat-box">
      <input
        type="text"
        id="InputTextArea"
        className="input-box"
        onChange={handleMyComment}
        onKeyPress={submitMyComment}
        placeholder="type a message..."
        value={myComment}
      />
      <button
        name="submit"
        id="SendButton"
        className="submit-button"
        onClick={submitMyComment}>
        Submit
      </button>
    </div>
  )
}

export default ChatBox
