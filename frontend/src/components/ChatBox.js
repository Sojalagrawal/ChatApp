import React from 'react'
import "../css/ChatBox.css";
import { ChatState } from '../context/ChatProvider';


const ChatBox = () => {
  const {user,name,setName}=ChatState();

  return (
    <div className="ChatBox">
      <div className='headingChatBox'>{name}</div>
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