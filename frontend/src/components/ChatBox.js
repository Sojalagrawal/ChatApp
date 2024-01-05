import React from 'react'
import "../css/ChatBox.css"

const ChatBox = () => {
  return (
    <div className="ChatBox">
      <div className='headingChatBox'>Name</div>
      <div className='display'>DISPLAY</div>
      <div className='message'>
        <input type="text" id="chatboxip" placeholder='Enter Message'></input>
        <span class="material-symbols-outlined">
          send
        </span>
      </div>
      
    </div>
  )
}

export default ChatBox