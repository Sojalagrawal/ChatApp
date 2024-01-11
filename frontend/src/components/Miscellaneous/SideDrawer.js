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
  const {searchspace,setSearchSpace,modalGroup,UpdateGroupModal,profileuser,sojal1,setLogoutModal,logoutModal}=ChatState();
  const user=localStorage.getItem("userinfo")?JSON.parse(localStorage.getItem("userinfo")):"";
  const sojal=()=>{
    if(searchspace){
      setSearchSpace(false);
    }
    else{
      setSearchSpace(true);

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