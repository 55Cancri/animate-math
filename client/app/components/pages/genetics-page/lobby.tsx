import React, { SyntheticEvent, useState, useEffect } from 'react'
import moment from 'moment'
import Messages from './messages'
import ChatBox from './chat-box'
import Chance from 'chance'
import { usernames } from '@seeds'

const chance = new Chance()

export const Lobby = () => {
  const [comments, updateComments] = useState([])
  const [myComment, updateMyComment] = useState('')

  const addComment = myComment => {
    const username = usernames[Math.floor(Math.random() * usernames.length)]

    const message = myComment ? myComment.value : chance.sentence()

    const timestamp = moment(new Date()).format('LLL')
    const newComment = { username, message, timestamp }

    return updateComments(comments => [...comments, newComment])
  }

  useEffect(() => {
    // componentDidMount add comment every second
    const timer = setInterval(addComment, 1000)

    // componentWillUnmount operation
    return () => clearInterval(timer)
  }, [])

  // update my comment
  const handleMyComment = (e: SyntheticEvent) => {
    const { value } = e.currentTarget as HTMLInputElement
    return updateMyComment(value)
  }

  const submitMyComment = e => {
    const { name } = e.target
    if ((e.key === 'Enter' || name === 'submit') && myComment.length > 0) {
      const message = myComment
      const username = 'code_1'
      const timestamp = moment(new Date()).format('LLL')
      const newComment = { username, message, timestamp }

      // add my comment to the list of comments
      updateComments(comments => [...comments, newComment])

      // reset text in chatbox
      return updateMyComment('')
    }
  }

  return (
    <main className="main">
      <Messages comments={comments} />
      <ChatBox
        myComment={myComment}
        handleMyComment={handleMyComment}
        submitMyComment={submitMyComment}
      />
    </main>
  )
}

export default Lobby
