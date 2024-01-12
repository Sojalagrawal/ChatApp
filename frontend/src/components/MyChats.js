import React, { useEffect, useState } from 'react';
import "../css/MyChats.css";
import { ChatState } from '../context/ChatProvider';

const MyChats = () => {
  const {user,chats,setChats,toggleModal,load,setChatId,accessChatDetail}=ChatState();


  useEffect(()=>{
    fetch("/api/chat",{
      method:"get",
      headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+JSON.parse(localStorage.getItem("userinfo")).token,
      }
    }).then(res=>res.json())
    .then(data=>{
        setChats(data);
        // console.log(chats);
    })
  },[load]);




  return (
    <div className="MyChats">
      <div className='MyChatsheading'>
        <div className="MyChatstitle">MyChats</div>
        <div className='option' onClick={()=>{toggleModal()}}>New Group Chat</div>
      </div>
      <div className='AllChats'>
           {Array.isArray(chats) && chats.map((mychat)=>{
              return(
                <div className='chat-data' onClick={()=>{
                      console.log(mychat._id);
                      setChatId(mychat._id);
                  }} key={mychat._id}>
                  <div className='chatdiv'>
                      <p className='parauser' style={{"fontSize":"16px"}}><b>{accessChatDetail(mychat)}</b></p>
                      {/* <div className='parauser-div'>
                        <p className='parauser'><b>{mychat.latestMessage && mychat.latestMessage.sender?mychat.latestMessage.sender.name+":":""}</b></p>
                        <p className='parauser'>{mychat.latestMessage && mychat.latestMessage.content?mychat.latestMessage.content.substr(0,20):""}{mychat.latestMessage && mychat.latestMessage.content && mychat.latestMessage.content.length>=20?"...":""}</p>
                      </div> */}

                  </div>
              </div>
              )
            })}
      </div>
      

      
    </div>
  )
}

export default MyChats