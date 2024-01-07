import React, { useEffect, useState } from 'react';
import "../css/Search.css";
import { ChatState } from '../context/ChatProvider';



const Search = () => {
  const {user,setSearchSpace,modalGroup,userarr,toggleLoad}=ChatState();
  const [search,setSearch]=useState("");
  const [searchResult,setSearchResult]=useState([]);



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
          console.log(data);
          toggleLoad();
      })
  }


  
  

  return (
    <div className='search1'>
        <span class="material-symbols-outlined" id="closebtn1" onClick={()=>{setSearchSpace(false)}}>
                  close
        </span>
        <input type="text" placeholder='Enter user' id="ip" value={search} onChange={(e)=>{
          setSearch(e.target.value);
        }}></input>
        <div className="results">
            {Array.isArray(searchResult) && searchResult.map((userdata)=>{
               return(
                 <div className='user-data' onClick={()=>{
                    if(!modalGroup){
                        accessChat(userdata._id); 
                        setSearchSpace(false);
                    }
                    else{
                      if(!userarr.includes(userdata._id)){
                        userarr.push(userdata._id);
                        setSearchSpace(false);
                      }
                      //  setUserarr(userarr);
                      //  console.log(userarr);
                    }
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