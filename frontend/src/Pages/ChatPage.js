import React, { useEffect,useState} from 'react';

export default function ChatPage() {
  const [chats,setchats]=useState([]);
  const fetchChats=async()=>{
    fetch("http://localhost:5000/api/chat",{
         method:"get",
         headers:{
              "Content-Type":"application/json"
         }
    }).then(res=>res.json())
    .then((data)=>{
      setchats(data);
      console.log(chats);
    });
  }

  useEffect(()=>{
    fetchChats();
  },[])
  return (
    <div>
        {chats.map((c)=>(
          <div key={c._id}>{c.chatName}</div>
        ))}
    </div>
  )
}
