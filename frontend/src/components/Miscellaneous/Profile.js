import React from 'react';
import "../../css/Profile.css"
import { ChatState } from '../../context/ChatProvider';



const Profile = () => {
  const {user}=ChatState();
  return (
    <div className='profileuser'>
        <img id="profilepic" src={user.pic}></img>
        <p className='para'><b>Name : </b>{user.name}</p>
        <p className='para'><b>Email : </b>{user.email}</p>

    </div>
  )
}

export default Profile;