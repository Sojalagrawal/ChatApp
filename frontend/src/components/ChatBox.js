import React, { useEffect, useState } from 'react'
import "../css/ChatBox.css";
import { ChatState } from '../context/ChatProvider';
import { toast } from 'react-toastify';








const ChatBox = () => {
  const {user,toggleUpdateGroup,chatId,updateChatFlag,setUpdateChatFlag,chatdetail,setchatdetail,accessChatDetail,messages,setMessages}=ChatState();
  const [messageContent,setMessageContent]=useState("");
  
  //Toast functions
  const notifyA=(msg)=>toast.error(msg);
  const notifyB=(msg)=>toast.success(msg);


  useEffect(()=>{
    if(chatId){
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
    else{
      setchatdetail("")
    }
  },[chatId,updateChatFlag]);


  useEffect(()=>{
    if(chatId){
      fetch(`http://localhost:5000/api/message/${chatId}`,{
        method:"get",
        headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+user.token,
        },
      }).then(res=>res.json())
      .then((data)=>{
          setMessages(data);
          console.log(data);
      })
    }
  },[chatId]);




  const sendMessage=()=>{
     if(messageContent){
        setMessageContent("");
        fetch("http://localhost:5000/api/message",{
          method:"post",
          headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+JSON.parse(localStorage.getItem("userinfo")).token,
          },
          body:JSON.stringify({
            content:messageContent,
            chatId:chatId
          })
        }).then(res=>res.json())
        .then((data)=>{
            notifyB("Sent");
            setMessages([...messages,data]);
            console.log(data);
        })
        .catch((err)=>{
           console.log(err);
        }) 
     }
     else{
        notifyA("Enter Some Content");
     }
  }

  

  const isSameSender=(messages,m,i,userId)=>{
    // m is current message
    // i index of current message
    // logged in user id
    return(
      i<messages.length-1 && 
      (messages[i+1].sender._id !== m.sender.id || messages[i+1].sender._id === undefined)
      && (messages[i].sender._id !== userId)
    )
  }


  
  const isLastMessage=(messages,i,userId)=>{
    return(
      i === messages.length-1 && 
      (messages[messages.length-1].sender._id && messages[messages.length-1].sender._id !== userId)
    )
  }


  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };


  

  return (
    <div className="ChatBox">
      <div className='ChatBoxheading'>
        <div className='headingChatBox'>{chatdetail && accessChatDetail(chatdetail)}</div>
        <div className="preview">
        {chatId && chatdetail && <span class="material-symbols-outlined dots" onClick={()=>{toggleUpdateGroup()}}>
              more_vert
          </span>}
        </div>
      </div>
      <div className='display'>
        {messages && messages.map((message,i)=>{
          var flag=message.sender._id===user._id?true:false;
            return (
              <>
                {flag  && <div className='sentMessage' key={message._id}>
                  <div className='sentMessageContent'>{message.content}</div>
                </div>}
                {!flag  && <div className='recievedMessage' key={message._id}>
                  {(isSameSender(messages,message,i,user._id) || isLastMessage(messages,i,user._id)) && <img id="message-img" src={message.sender.pic}></img>}
                  <div className='recieveMessageContent'>{message.content}</div>
                </div>}
              </>
            )
        })
        }
      </div>
      <div className='message'>
        <input type="text" id="chatboxip" placeholder='Enter Message' value={messageContent} onChange={(e)=>{setMessageContent(e.target.value)}} onKeyDown={handleKeyPress}></input>
        <span class="material-symbols-outlined" id="send" onClick={()=>{
            sendMessage()
          }}>
          send
        </span>
      </div>
      
    </div>
  )
}

export default ChatBox;