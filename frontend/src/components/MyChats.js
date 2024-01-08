import React, { useEffect, useState } from 'react';
import "../css/MyChats.css";
import { ChatState } from '../context/ChatProvider';

const MyChats = () => {
  const {user,chats,setChats,setName,toggleModal,load,setisGroupChat,setChatId,groupchat,setGroupchat}=ChatState();


  useEffect(()=>{
    fetch("http://localhost:5000/api/chat",{
      method:"get",
      headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+JSON.parse(localStorage.getItem("userinfo")).token,
      }
    }).then(res=>res.json())
    .then(data=>{
        setChats(data);
        console.log(chats);
    })
  },[load]);



  const accessChatDetail=((mychat)=>{
    var name;
    if(mychat.users && mychat.users.length >= 2 && !(mychat.isGroupChat)){
        name=mychat.users[0].name===user.name?mychat.users[1].name:mychat.users[0].name;
    }
    else{
      name=mychat.chatName;
    }
    return name;
  });

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
                      setName(accessChatDetail(mychat));
                      setChatId(mychat._id);
                      if(mychat.isGroupChat){
                        setisGroupChat(true);
                        setGroupchat(mychat);
                        console.log(mychat);
                      }
                      else{
                        setisGroupChat(false);
                      }

                  }} key={mychat._id}>
                  <div className='chatdiv'>
                      {/* <p className='parauser'>{mychat.chatName}</p> */}
                      <p className='parauser'>{accessChatDetail(mychat)}</p>
                      {/* <p className='parauser'>{mychat.latestMessage.sender.name}</p> */}

                      {/* <p className='parauser'>{mychat.latestMessage.content}</p> */}

                      {/* <p className='parauser'>{mychat.users[0].name===user.name?mychat.users[1].name:mychat.users[0].name}</p> */}


                  </div>
              </div>
              )
            })}
      </div>
      

      
    </div>
  )
}

export default MyChats