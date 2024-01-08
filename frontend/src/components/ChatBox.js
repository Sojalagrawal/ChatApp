import React from 'react'
import "../css/ChatBox.css";
import { ChatState } from '../context/ChatProvider';


const ChatBox = () => {
  const {name,isGroupChat,toggleUpdateGroup}=ChatState();

  return (
    <div className="ChatBox">
      <div className='ChatBoxheading'>
        <div className='headingChatBox'>{name}</div>
        <div className="preview">
        {isGroupChat && <span class="material-symbols-outlined dots" onClick={()=>{toggleUpdateGroup()}}>
              more_vert
          </span>}
        </div>
      </div>
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