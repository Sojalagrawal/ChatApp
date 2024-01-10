import React from 'react';
import "../../css/Profile.css"
import { ChatState } from '../../context/ChatProvider';



const Profile = () => {
  const {user,sojal1}=ChatState();
  return (
    <div className='profileuser'>
        <span class="material-symbols-outlined ab" id="profileCloseBtn" onClick={()=>{sojal1()}}>
           close
        </span>
        <img id="profilepic" src={user.pic}></img>
        <p className='para'><b>Name : </b>{user.name}</p>
        <p className='para'><b>Email : </b>{user.email}</p>

    </div>
  )
}

export default Profile;