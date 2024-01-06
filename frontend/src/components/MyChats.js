import React, { useEffect } from 'react';
import "../css/MyChats.css";
import { ChatState } from '../context/ChatProvider';


const MyChats = () => {
  const {user,chats,setChats,setName}=ChatState();
  useEffect(()=>{
    fetch("http://localhost:5000/api/chat",{
      method:"get",
      headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+user.token,
      }
    }).then(res=>res.json())
    .then(data=>{
        setChats(data);
        console.log(chats);
    })
  },[]);

  const accessChatDetail=((mychat)=>{
    console.log("abc");
    var name;
    if(!mychat.isGroupChat){
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
        <div className='option'>New Group Chat</div>
      </div>
      <div className='AllChats'>
           {chats.map((mychat)=>{
              
              return(
                <div className='chat-data' onClick={()=>{setName(accessChatDetail(mychat))}}>
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