import React, { useEffect, useState } from 'react';
import "../../css/UpdateGroup.css";
import { ChatState } from '../../context/ChatProvider';
import { toast } from 'react-toastify';

//TOAST FUNCTIONS
const notifyA=(msg)=>toast.error(msg);
const notifyB=(msg)=>toast.success(msg);





const UpdateGroup = () => {
  const {user,setSearchSpace,toggleUpdateGroup,setUpdateGroupModal,chatId,toggleLoad,updateuser,setUpdateuser,groupchat,toggleUpdateChat,chatdetail,setchatdetail}=ChatState();
  const [updatedGroupName,setupdatedGroupName]=useState("");


  useEffect(()=>{
    if(updateuser){
        fetch("http://localhost:5000/api/chat/groupadd",{
            method:"put",
            headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+user.token,
            },
            body:JSON.stringify({
                chatId:chatId,
                userId:updateuser

            })
        }).then(res=>res.json())
        .then(data=>{
            console.log("data is"+data);
            notifyB("User Added");
            setUpdateuser("");
            toggleLoad(); 
            toggleUpdateChat();
            setUpdateGroupModal(false);
        })
    }
  },[updateuser]);


  




  const updateGroupName=()=>{
    console.log("update");
    if(!updatedGroupName){
        notifyA("Enter GroupName");
        return;
    }
    else{
        fetch("http://localhost:5000/api/chat/rename",{
            method:"put",
            headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+user.token,
            },
            body:JSON.stringify({
                chatId:chatId,
                chatName:updatedGroupName

            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            notifyB("GroupName Updated");
            setUpdateGroupModal(false);
            toggleLoad();
            
           
        })
        return;
    }   
  }


  const removeUserFromGroup=(Id)=>{
    console.log("remove");
    fetch("http://localhost:5000/api/chat/groupremove",{
        method:"put",
        headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+user.token,
        },
        body:JSON.stringify({
            chatId:chatId,
            userId:Id,
        })
    }).then(res=>res.json())
    .then(data=>{
        notifyB("User Removed");
        setUpdateGroupModal(false);
        toggleLoad();
    })
  }





  return (
    
    <div className='UpdateGroup'>
        <div className='Update-modal'>
            <span class="material-symbols-outlined" id="closebtn" onClick={()=>{
                toggleUpdateGroup();
            }}>
                close
            </span>
            <div>
                <p><b>Update Group</b></p>
                <div className='group-users'>
                    {chatdetail.users.map((user)=>{
                        return(
                            <>
                                <div className='individual-user'>
                                    {user.name}
                                    <span class="material-symbols-outlined ab" id="updateCloseBtn" onClick={()=>{
                                        removeUserFromGroup(user._id);
                                        toggleUpdateChat();

                                    }}>
                                        close
                                    </span>
                                </div>
                            </>
                        )
                    })}
                </div>
                <div className='updateip'>
                    <input type="text" placeholder=' New GroupName' value={updatedGroupName} onChange={(e)=>{setupdatedGroupName(e.target.value)}}></input>
                    <button  id="update" onClick={()=>{
                        updateGroupName();
                        toggleUpdateChat();
                    }}>Update</button>
                </div>
                <div  className='updateip'>
                    <button onClick={()=>{setSearchSpace(true)}}>Add User To Group</button>
                </div>
                
            </div>
        </div>   
    </div>
    
  )
}

export default UpdateGroup