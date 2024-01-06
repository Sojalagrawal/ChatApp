import React, { useEffect, useState } from 'react';
import "../css/Search.css";
import { ChatState } from '../context/ChatProvider';



const Search = () => {
  const {user,chats,setChats,searchspace,setSearchSpace}=ChatState();
  const [search,setSearch]=useState("");
  const [searchResult,setSearchResult]=useState([]);
  const [chat,setChat]=useState([]);

  var token=user.token;

  useEffect(()=>{
    if(!search){
      setSearchResult([]);
    }
    else{

        fetch(`http://localhost:5000/api/user?search=${search}`,{
          method:"get",
          headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+token,
          }
      }).then(res=>res.json())
      .then(data=>{
          setSearchResult(data);
          console.log(data);
      })
    }
  },[search]);

  useEffect(()=>{
    if(chat){
      if(!chats.includes(chat)){
        chats.push(chat);
        setChats(chats);
        console.log(chats);
      }
    }
  },[chat]);


  const accessChat=(userId)=>{
    fetch("http://localhost:5000/api/chat",{
          method:"post",
          headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+JSON.parse(localStorage.getItem("userinfo")).token,
          },
          body: JSON.stringify({
            userId:userId,
            
        }),
      }).then(res=>res.json())
      .then(data=>{
          setChat(data);
          console.log(data);
      })
  }

  return (
    <div className='search1'>
        <input type="text" placeholder='Enter user' id="ip" value={search} onChange={(e)=>{
          setSearch(e.target.value);
        }}></input>
        <div className="results">
            {searchResult.map((userdata)=>{
               return(
                 <div className='user-data' onClick={()=>{
                    accessChat(userdata._id);
                    setSearchSpace(false);
                  }}>
                  <div className='user-panel'>
                    <img src={userdata.pic} id="userDataPic"></img>
                    <div className='userdiv'>
                        <p className='parauser'>{userdata.name}</p>
                        <p className='parauser'>{userdata.email}</p>
                    </div>
                  </div>
                </div>
               )
            })}
        </div>
    </div>
  )
}

export default Search