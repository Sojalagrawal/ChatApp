import React, { useEffect, useState } from 'react';
import "../../css/CreateGroupChat.css";
import { ChatState } from '../../context/ChatProvider';
import { toast } from 'react-toastify';

//TOAST FUNCTIONS
const notifyA=(msg)=>toast.error(msg);
const notifyB=(msg)=>toast.success(msg);





const CreateGroupChat = () => {
  const {user,toggleModal,setSearchSpace,userarr,setUserarr,chats,setChats,toggleLoad}=ChatState();
  const [GroupName,setGroupName]=useState("");
  
  const createGroup=()=>{
    if(!GroupName){
        notifyA("Enter GroupName");
        return;
    }
    else if(userarr.length==1){
        notifyA("At least two members should be selected");
        return;
    }
    else{
        fetch("http://localhost:5000/api/chat/group",{
            method:"post",
            headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+user.token,
            },
            body:JSON.stringify({
                name:GroupName,
                users:JSON.stringify(userarr),
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            notifyB("Group Created");
            setUserarr([]);
            toggleModal();
            toggleLoad();
            // window.location.reload();

        })
        return;
    }
    
  }
  return (
    
    <div className='CreateGroupChat'>
        <div className='Group-modal1'>
            <span class="material-symbols-outlined" id="closebtn" onClick={()=>{
                toggleModal();
                setUserarr([]);
            }}>
                close
            </span>
            <div>
                <p><b>Create Group</b></p>
                <div className='groupip'>
                    <input type="text" placeholder='GroupName' value={GroupName} onChange={(e)=>{setGroupName(e.target.value)}}></input>
                </div>
                <div  className='groupip'>
                    <button onClick={()=>{setSearchSpace(true)}}>Add Users</button>
                    {userarr.length}
                </div>
                <button  id="create" onClick={createGroup}>Create</button>
            </div>
        </div>   
    </div>
    
  )
}

export default CreateGroupChat