import React, { useState } from 'react';
import "../../css/SideDrawer.css"
import ChatBox from '../ChatBox';
import MyChats from '../MyChats';
import Search from '../Search';
import { ChatState } from '../../context/ChatProvider';



const SideDrawer = () => {
  const {user}=ChatState();
  const [searchspace,setSearchSpace]=useState(false);
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
            <img src={user.pic?user.pic:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"} id="img-p"></img>
          </div>
      </div>
      <div className='box'>
        {searchspace && <Search/>}
        <MyChats/>
        <ChatBox/>
      </div>
    </>
  )
}

export default SideDrawer;