import React, { useEffect, useState } from 'react'
import "../css/ChatBox.css";
import { ChatState } from '../context/ChatProvider';


const ChatBox = () => {
  const {user,toggleUpdateGroup,chatId,updateChatFlag,setUpdateChatFlag,chatdetail,setchatdetail,accessChatDetail}=ChatState();



  useEffect(()=>{
    if(chatId || updateChatFlag){
      fetch("http://localhost:5000/api/chat/chats",{
        method:"post",
        headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+user.token,
        },
        body:JSON.stringify({
          chatId:chatId,
        })
      }).then(res=>res.json())
      .then((data)=>{
          setchatdetail(data);
          setUpdateChatFlag(false);
      })
    }
  },[chatId,updateChatFlag]);


  return (
    <div className="ChatBox">
      <div className='ChatBoxheading'>
        <div className='headingChatBox'>{chatdetail && accessChatDetail(chatdetail)}</div>
        <div className="preview">
        {chatdetail && chatdetail.isGroupChat && chatdetail.groupAdmin._id===user._id && <span class="material-symbols-outlined dots" onClick={()=>{toggleUpdateGroup()}}>
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