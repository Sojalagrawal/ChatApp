import React, { useState } from 'react';
import "../../css/SideDrawer.css"
import ChatBox from '../ChatBox';
import MyChats from '../MyChats';
import Search from '../Search';
import { ChatState } from '../../context/ChatProvider';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';
import CreateGroupChat from './CreateGroupChat';
import UpdateGroup from './UpdateGroup';
import LogoutModal from './LogoutModal';





const SideDrawer = () => {
  const navigate=useNavigate();
  const {searchspace,setSearchSpace,modalGroup,UpdateGroupModal,profileuser,sojal1,setLogoutModal,logoutModal,notification,setNotification,accessChatDetail,setChatId,chatdetail}=ChatState();
  const [notificationModal,setNotificationModal]= useState(false);
  const user=localStorage.getItem("userinfo")?JSON.parse(localStorage.getItem("userinfo")):"";
  const sojal=()=>{
    if(searchspace){
      setSearchSpace(false);
    }
    else{
      setSearchSpace(true);

    }
  }

  const notify1=()=>{
    if(notificationModal){
      setNotificationModal(false);
    }
    else{
      setNotificationModal(true);
    }
  }


 

  
  return (
    <>
      <div className='SideDrawer'>
          <div className='search'>
            <div id="search" onClick={sojal}>Search User</div>
            <span class="material-symbols-outlined">
              search
            </span>
          </div>

          <div className='heading'>TALK-A-TIVE</div>

          <div className='profile'>

            <div onClick={notify1} style={{marginRight:"20px",cursor:"pointer"}}>
              <span class="material-symbols-outlined">
                  notifications
              </span>
              {notificationModal && <div className='notification-modal'>
                {!notification.length && "No new messages"}
                {notification.length>0 && notification.map((n)=>{
                  return (
                    <>
                      <div style={{borderTop:"1px solid black"}} onClick={()=>{setChatId(n.chat._id);setNotification(notification.filter((notif)=>notif!=n))}}>{`New Message from ${accessChatDetail(n.chat)}`}</div>
                    </>
                  )
                })}
              </div>}
              {notification.length>0 && <div className='notification-badge'>{notification.length}</div>}
            </div>

            <img src={user.pic?user.pic:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"} id="img-p" onClick={sojal1}></img>

            <div onClick={()=>{setLogoutModal(true)}}>
              <span class="material-symbols-outlined" id="logout">
                  logout
              </span>
            </div>

          </div>
      </div>

      <div className='box'>
        {searchspace && <Search/>}
        <MyChats/>
        <ChatBox/>
        {profileuser && <Profile/>}
      </div>
      
      {modalGroup && <CreateGroupChat />}
      {UpdateGroupModal && <UpdateGroup/>}
      {logoutModal && <LogoutModal/>}
    </>
  )
}

export default SideDrawer;