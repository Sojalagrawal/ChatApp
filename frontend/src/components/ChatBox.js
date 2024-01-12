import React, { useEffect, useState } from 'react'
import "../css/ChatBox.css";
import { ChatState } from '../context/ChatProvider';
import { toast } from 'react-toastify';
import Picker,{ EmojiClickData } from 'emoji-picker-react';
import io from "socket.io-client";
import Lottie from 'react-lottie';
import animationData from "../animations/typing.json";


const ENDPOINT="http://localhost:5000";
var socket,selectedChatCompare;





const ChatBox = () => {
  const {toggleUpdateGroup,chatId,updateChatFlag,setUpdateChatFlag,chatdetail,setchatdetail,accessChatDetail,messages,setMessages,notification,setNotification,toggleLoad}=ChatState();
  const [messageContent,setMessageContent]=useState("");
  const [showPicker,setShowPicker]=useState(false);
  const [socketConnected,setsocketConnected]=useState(false);
  const [typing ,setTyping]=useState(false);
  const [isTyping ,setIsTyping]=useState(false);

  const user=JSON.parse(localStorage.getItem("userinfo"));


  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };


  //Toast functions
  const notifyA=(msg)=>toast.error(msg);
  const notifyB=(msg)=>toast.success(msg);


  useEffect(()=>{
    socket=io(ENDPOINT);
    socket.emit("setup",user);
    socket.on("connected",()=>{
      setsocketConnected(true);
    })
    socket.on('typing',()=>{setIsTyping(true)})
    socket.on('stop typing',()=>{setIsTyping(false)})

  },[]);

  useEffect(()=>{
    socket.on("message recieved",(newMessageRecieved)=>{
      if(!selectedChatCompare || selectedChatCompare !== newMessageRecieved.chat._id){
        if(!notification.includes(newMessageRecieved)){
          setNotification([...notification,newMessageRecieved]);
          toggleLoad();
        }
      }
      else{
        setMessages([...messages,newMessageRecieved]);
      }
    })
  })   //we are not adding dependency here bcoz we want that this will run continously


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
        // console.log(data);
        socket.emit('join chat',chatId);
      })

      selectedChatCompare=chatId;
      console.log(notification);
    }
  },[chatId]);




  const sendMessage=()=>{
     socket.emit('stop typing',chatId);
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
            // notifyB("Sent");
            socket.emit('new message',data);
            setMessages([...messages,data]);
            setShowPicker(false);
            toggleLoad();
            // console.log(data);
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
      (messages[i+1].sender._id !== m.sender._id || messages[i+1].sender._id === undefined)
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

  const onEmojiClick = (emojiData:EmojiClickData) => {
    setMessageContent((ip)=>ip+emojiData.emoji);
  };


  const typingHandler=(e)=>{
    setMessageContent(e.target.value);
    if(!socketConnected) return;
    if(!typing){
      setTyping(true);
      socket.emit("typing",chatId);
    }

    let lastTypingTime=new Date().getTime()
    var timerLength=5000;

    setTimeout(()=>{
      var timeNow=new Date().getTime();
      var timeDiff=timeNow-lastTypingTime;
      if(timeDiff>=timerLength && typing){
        socket.emit("stop typing",chatId);
        setTyping(false);
      }

    },timerLength);
  }
 
  

  return (
    <div className="ChatBox">
      <div className='ChatBoxheading'>
        <div className='headingChatBox'>{chatdetail && accessChatDetail(chatdetail)}</div>
        <div className="preview">
        {chatId && chatdetail.isGroupChat && <span class="material-symbols-outlined dots" onClick={()=>{toggleUpdateGroup()}}>
              more_vert
          </span>}
        </div>
      </div>
      <div className='display'>
        {messages && messages.map((message,i)=>{
          var flag=message.sender._id===user._id?true:false;
          var visibility=(isSameSender(messages,message,i,user._id) || isLastMessage(messages,i,user._id))?"visible":"hidden";

            return (
              <>
                {flag  && <div className='sentMessage' key={message._id}>
                  <div className='sentMessageContent'>{message.content}</div>
                </div>}
                {!flag  && <div className='recievedMessage' key={message._id}>
                  <img style={{"visibility":visibility}} id="message-img" src={message.sender.pic}></img>
                  <div className='recieveMessageContent'>{message.content}</div>
                </div>}
              </>
            )
        })
        }
        {isTyping?<div><Lottie options={defaultOptions} width={50} style={{marginBottom:15,marginLeft:5}}/></div>:(<></>)}
      </div>
      {showPicker && <div className="emoji-palette"><Picker height={350} width={350} onEmojiClick={onEmojiClick}/></div>}
      <div className='message'>
        <img className="emoji-icon"
          src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
          onClick={() =>{ setShowPicker(val => !val)}} />
        <input id="chatboxip" placeholder='Enter Message' value={messageContent} onChange={typingHandler} onKeyDown={handleKeyPress}></input>
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